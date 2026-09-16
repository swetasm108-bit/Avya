import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Signup.css"; // reuse the same styling

const API_URL = import.meta.env.VITE_API_URL;

function VerifyMfa() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // If someone lands here directly without an email in state, send them back.
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // Countdown timer for the resend cooldown.
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/buyers/verify-mfa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Verification failed. Please try again.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.error("MFA verification failed:", err);
      setError("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResendMessage("");
    setResendLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/buyers/resend-mfa-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Could not resend OTP. Please try again.");
        return;
      }

      setResendMessage(
        `A new OTP has been sent to your email. Resends left: ${data.resendsRemaining}`
      );
      setCooldown(60);
    } catch (err) {
      console.error("Resend failed:", err);
      setError("Could not connect to the server. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Verify Your Identity</h1>
      <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
        We've sent a 6-digit code to <strong>{email}</strong>. Enter it below to continue.
      </p>

      <form onSubmit={handleVerify} autoComplete="off">
        <div className="signup-field">
          <label>OTP Code</label>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            autoComplete="one-time-code"
            required
          />
        </div>

        {error && (
          <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{error}</p>
        )}
        {resendMessage && (
          <p style={{ color: "#16a34a", fontSize: 13, marginBottom: 12 }}>{resendMessage}</p>
        )}

        <button type="submit" className="signup-submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button
          type="button"
          onClick={handleResend}
          disabled={resendLoading || cooldown > 0}
          style={{
            background: "none",
            border: "none",
            color: cooldown > 0 ? "#999" : "#c2410c",
            cursor: cooldown > 0 ? "not-allowed" : "pointer",
            fontSize: 13,
          }}
        >
          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}

export default VerifyMfa;