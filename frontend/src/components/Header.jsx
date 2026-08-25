import { useState } from "react";
import logo from "../assets/logo.png";
import "./Header.css";

function Header() {
  const [wishlistCount] = useState(2);
  const [bagCount] = useState(2);

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Avya" className="header-logo-img" />
      </div>

      <nav className="header-nav">
        <a href="/" className="nav-link active">Home</a>
        <a href="/shop" className="nav-link">Shop</a>
        <a href="/wishlist" className="nav-link">Wishlist</a>
        <a href="/account" className="nav-link">Account</a>
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

        <button className="admin-btn">Admin</button>
      </div>
    </header>
  );
}

export default Header;