import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
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

    const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name,email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Something went wrong. Please try again.");
      return;
    }

    console.log("Account created:", data);
    alert("Account created successfully!");
    // Log the new buyer in immediately
    localStorage.setItem("user", JSON.stringify(data));

    // Clear any old saved sign-in credentials from a previous account
    localStorage.removeItem("savedCredentials");
    navigate("/");
  } catch (error) {
    console.error("Signup failed:", error);
    alert("Could not connect to the server. Please try again.");
  }
};

  return (
    
    <div className="signup-container">
      <h1>Create Your Account</h1>

     <form onSubmit={handleSubmit}>
        <div className="signup-field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            required
          />
        </div>

                {/* PASSWORD */}
        <div className="signup-field">
          <label>Password</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            {/* <Lock className="w-2 h-2" style={{ position: "absolute", left: 8, color: "#9ca3af" }} /> */}
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
                {/* CONFIRM PASSWORD */}
        <div className="signup-field">
          <label>Confirm Password</label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            {/* <Lock className="w-4 h-4" style={{ position: "absolute", left: 8, color: "#9ca3af" }} /> */}
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

        {/* AGREE TO TERMS */}
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

        {/* STAY SIGNED IN */}
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