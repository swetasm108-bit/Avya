import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Wallet, Lock, LogOut, Package, Heart } from "lucide-react";
import Signup from "./Signup";
import SignIn from "./SignIn";
import "./Account.css";

function Account() {
  const [mode, setMode] = useState("signin"); // "signup" | "signin"
  const navigate = useNavigate();
const user = JSON.parse(
  localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
);

 const handleLogout = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  navigate("/account");
};

    const menuItems = [
    { icon: <User size={20} />, label: "Edit Profile", path: "/account/edit-profile" },
    { icon: <Package size={20} />, label: "My Orders", path: "/account/orders" },
    { icon: <Heart size={20} />, label: "Wishlist", path: "/wishlist" },
    { icon: <MapPin size={20} />, label: "Address", path: "/account/address" },
    { icon: <Wallet size={20} />, label: "Wallet", path: "/account/wallet" },
    { icon: <Lock size={20} />, label: "Login & Security", path: "/account/security" },
     { icon: <Lock size={20} />, label: "Settings", path: "/account/settings" },
  ];

  // Logged-in view
  if (user) {
    return (
      <div className="account-container">
        <h1>My Account</h1>
        <p className="account-greeting">Hi, {user.name || "there"} 👋</p>

        <div className="account-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="account-menu-item"
              onClick={() => navigate(item.path)}
            >
              <span className="account-menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <button className="account-menu-item account-logout" onClick={handleLogout}>
            <span className="account-menu-icon"><LogOut size={20} /></span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  // Logged-out view (existing tabs)
  return (
    <div>
      <div className="account-tabs">
        <button
          className={`account-tab ${mode === "signin" ? "active" : ""}`}
          onClick={() => setMode("signin")}
        >
          Sign In
        </button>

        <button
          className={`account-tab ${mode === "signup" ? "active" : ""}`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>

      {mode === "signin" ? <SignIn /> : <Signup />}
    </div>
  );
}

export default Account;