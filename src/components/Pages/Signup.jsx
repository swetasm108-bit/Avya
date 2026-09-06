import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [name, setName] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const navigate = useNavigate();

  // OTP step state
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

useEffect(() => {
  if (resendCooldown <= 0) return;
  const timer = setInterval(() => {
    setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
  }, 1000);
  return () => clearInterval(timer);
}, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors((p) => ({ ...p, confirmPassword: "Passwords do not match." }));
      return;
    }

    if (!agreedToTerms) {
      alert("Please agree to the privacy policy and terms of use.");
      return;
    }

    try {
      const endpoint = role === "seller" ? "sellers" : "buyers";

      const response = await fetch(`${API_URL}/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Something went wrong. Please try again.");
        return;
      }

      // If backend sent an OTP (buyer signup has MFA), show OTP step
      if (data.message && data.message.toLowerCase().includes("otp")) {
        setOtpEmail(data.email);
        setOtpStep(true);
        setResendCooldown(30);
        return;
      }

      // Otherwise (e.g. seller, no MFA yet) — log in directly as before
      completeSignup(data);
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Could not connect to the server. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/buyers/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Invalid OTP. Please try again.");
        return;
      }

      alert("Email verified! Account created successfully.");
      completeSignup(data);
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Could not connect to the server. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    try {
      const response = await fetch(`${API_URL}/api/buyers/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Could not resend OTP.");
        return;
      }

      alert("A new OTP has been sent to your email.");
      setResendCooldown(30);
    } catch (error) {
      console.error("Resend OTP failed:", error);
      alert("Could not connect to the server. Please try again.");
    }
  };

  const completeSignup = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.removeItem("savedCredentials");
    navigate("/");
  };

  // ===== OTP SCREEN =====
  if (otpStep) {
    return (
      <div className="signup-container">
        <h1>Verify Your Email</h1>
        <p style={{ fontSize: 14, marginBottom: 16 }}>
          We sent a 6-digit code to <b>{otpEmail}</b>
        </p>

        <form onSubmit={handleVerifyOtp} autoComplete="off">
          <div className="signup-field">
            <label>OTP Code</label>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              required
            />
          </div>

          <button type="submit" className="signup-submit">
            Verify & Continue
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          {resendCooldown > 0 ? (
            <span style={{ fontSize: 13, color: "#999" }}>
              Resend available in {resendCooldown}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              style={{
                background: "none",
                border: "none",
                color: "#c2410c",
                fontSize: 13,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    );
  }

  // ===== SIGNUP FORM (unchanged) =====
  return (
    <div className="signup-container">
      <h1>Create Your Account</h1>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="signup-field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <div className="signup-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
        </div>

        <div className="signup-field">
          <label>Password</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\s/g, "");
                setPassword(cleaned);
                setErrors((p) => ({ ...p, password: "" }));
              }}
              style={{ paddingRight: 32, width: "100%" }}
              autoComplete="off"
              required
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="text-gray-400 hover:text-gray-600"
              style={{ position: "absolute", right: 8, background: "none", border: "none", cursor: "pointer" }}
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p style={{ color: "red", fontSize: 12 }}>{errors.password}</p>
          )}
        </div>

        <div className="signup-field">
          <label>Confirm Password</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showConfirmPw ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\s/g, "");
                setConfirmPassword(cleaned);
                setErrors((p) => ({ ...p, confirmPassword: "" }));
              }}
              style={{ paddingRight: 32, width: "100%" }}
              autoComplete="off"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPw((s) => !s)}
              className="text-gray-400 hover:text-gray-600"
              style={{ position: "absolute", right: 8, background: "none", border: "none", cursor: "pointer" }}
            >
              {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p style={{ color: "red", fontSize: 12 }}>{errors.confirmPassword}</p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
          />
          <label style={{ fontSize: 14 }}>
            I agree to the{" "}
            <a href="/privacy-policy" style={{ color: "#c2410c" }}>privacy policy</a>
            {" "}and{" "}
            <a href="/terms-of-use" style={{ color: "#c2410c" }}>terms of use</a>
          </label>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, marginBottom: 12 }}>
          <input
            type="checkbox"
            checked={stayLoggedIn}
            onChange={(e) => setStayLoggedIn(e.target.checked)}
          />
          <label style={{ fontSize: 14, fontWeight: 600 }}>Stay Signed In</label>
        </div>
        <p className="signup-role-label">I want to join as</p>

        <div className="signup-role-options">
          <button
            type="button"
            className={`signup-role-btn ${role === "buyer" ? "active" : ""}`}
            onClick={() => setRole("buyer")}
          >
            🛍️ Buyer
          </button>

          <button
            type="button"
            className={`signup-role-btn ${role === "seller" ? "active" : ""}`}
            onClick={() => setRole("seller")}
          >
            🏪 Seller
          </button>
        </div>

        <p className="signup-selected">Selected role: {role || "None"}</p>

        <button type="submit" className="signup-submit">
          Continue
        </button>
      </form>
    </div>
  );
}

export default Signup;