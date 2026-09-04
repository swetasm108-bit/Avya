import { useState } from "react";
import logo from "../assets/logo.png";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header() {
  const [wishlistCount] = useState(2);
  const [bagCount] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Avya" className="header-logo-img" />
      </div>

      <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>
        <NavLink to="/shop" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Shop
        </NavLink>
        <NavLink to="/wishlist" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Wishlist
        </NavLink>
        <NavLink to="/account" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Account
        </NavLink>
      </nav>

      <div className="header-actions">
        <button className="icon-btn" aria-label="Search">
          🔍
        </button>

        <button className="icon-btn" aria-label="Wishlist">
          ♡
          {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
        </button>

        <button className="icon-btn" aria-label="Bag">
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
    </header>
  );
}

export default Header;