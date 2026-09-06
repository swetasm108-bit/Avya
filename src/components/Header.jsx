import { useState } from "react";
import logo from "../assets/logo.png";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [wishlistCount] = useState(2);
  const [bagCount] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);

  const isLoggedIn = () => !!localStorage.getItem("user");

  // Used for anything that needs login: Shop, Wishlist, Cart.
  // Logged in  -> let the normal navigation happen.
  // Logged out -> block navigation, show the popup instead.
  const guardClick = (e) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      closeMenu();
      setShowLoginPopup(true);
    } else {
      closeMenu();
    }
  };

  const goToAccountFromPopup = () => {
    setShowLoginPopup(false);
    navigate("/account");
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Avya" className="header-logo-img" />
      </div>

      <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          end
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          onClick={guardClick}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Shop
        </NavLink>
        <NavLink
          to="/wishlist"
          onClick={guardClick}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Wishlist
        </NavLink>
        <NavLink
          to="/account"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Account
        </NavLink>
      </nav>

      <div className="header-actions">
        <button className="icon-btn" aria-label="Search">
          🔍
        </button>

        <button
          className="icon-btn"
          aria-label="Wishlist"
          onClick={() => {
            if (!isLoggedIn()) {
              setShowLoginPopup(true);
            } else {
              navigate("/wishlist");
            }
          }}
        >
          ♡
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </button>

        <button
          className="icon-btn"
          aria-label="Bag"
          onClick={() => {
            if (!isLoggedIn()) {
              setShowLoginPopup(true);
            } else {
              navigate("/cart");
            }
          }}
        >
          👜
          {bagCount > 0 && <span className="badge">{bagCount}</span>}
        </button>

        <button
          className="hamburger-btn"
          aria-label="Menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* <button className="admin-btn">Admin</button> */}
      </div>

      {menuOpen && <div className="nav-overlay" onClick={closeMenu} />}

      {showLoginPopup && (
        <div className="login-popup-overlay" onClick={() => setShowLoginPopup(false)}>
          <div className="login-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="login-popup-close"
              aria-label="Close"
              onClick={() => setShowLoginPopup(false)}
            >
              ✕
            </button>
            <h3>Please log in to continue</h3>
            <p>You need an account to view this page.</p>
            <div className="login-popup-actions">
              <button className="login-popup-btn primary" onClick={goToAccountFromPopup}>
                Log In
              </button>
              <button className="login-popup-btn" onClick={goToAccountFromPopup}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;