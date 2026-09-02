import { useState } from "react";
import logo from "../assets/logo.png";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header() {
  const [wishlistCount] = useState(2);
  const [bagCount] = useState(2);

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Avya" className="header-logo-img" />
      </div>

     <nav className="header-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Shop
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Wishlist
        </NavLink>
        <NavLink to="/account" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
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

        {/* <button className="admin-btn">Admin</button> */}
      </div>
    </header>
  );
}

export default Header;