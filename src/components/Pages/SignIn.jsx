import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./Signup.css"; // reuse the same styling
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [role, setRole] = useState("buyer");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedCredentials") || "null");
    if (saved) {
      setEmail(saved.email);
      setPassword(saved.password);
      setStayLoggedIn(true);
    }
  }, []);
  const navigate = useNavigate();
  

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const endpoint = role === "seller" ? "sellers" : "buyers";

    const response = await fetch(`${API_URL}/api/${endpoint}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Login failed. Please try again.");
      return;
    }

    if (stayLoggedIn) {
      localStorage.setItem("savedCredentials", JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem("savedCredentials");
    }

    // Buyers now go through MFA — no token yet, redirect to OTP screen.
    if (role === "buyer" && data.mfaRequired) {
      navigate("/verify-mfa", { state: { email: data.email } });
      return;
    }

    // Sellers (or any non-MFA response) log in immediately, same as before.
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Could not connect to the server. Please try again.");
  }
};

  return (
    
    <div className="signup-container">
      <h1>Login to Your Account</h1>

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

      <form onSubmit={handleSubmit} autoComplete="off">
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

        {/* PASSWORD */}
        <div className="signup-field">
          <label>Password</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              style={{ paddingRight: 32, width: "100%" }}
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
        </div>

        {/* FORGOT PASSWORD */}
        <div style={{ textAlign: "right", marginTop: 4, marginBottom: 12 }}>
          <a href="/forgot-password" style={{ fontSize: 13, color: "#c2410c" }}>
            Forgot password?
          </a>
        </div>

        {/* STAY SIGNED IN */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <input
            type="checkbox"
            checked={stayLoggedIn}
            onChange={(e) => setStayLoggedIn(e.target.checked)}
          />
          <label style={{ fontSize: 14, fontWeight: 600 }}>Stay Signed In</label>
        </div>

        <button type="submit" className="signup-submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;