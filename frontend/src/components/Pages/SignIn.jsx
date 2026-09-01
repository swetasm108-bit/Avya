import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./Signup.css"; // reuse the same styling

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, stayLoggedIn });
  };

  return (
    <div className="signup-container">
      <h1>Login to Your Account</h1>

      <form onSubmit={handleSubmit}>
        <div className="signup-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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