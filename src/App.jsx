import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Account from "./components/Pages/Account";
import Home from "./components/Pages/Home";
import Signup from "./components/Pages/Signup";
import SignIn from "./components/Pages/SignIn";
import VerifyMfa from "./VerifyMfa";
function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<h2>Shop page — coming soon</h2>} />
          <Route path="/wishlist" element={<h2>Wishlist page — coming soon</h2>} />
          <Route path="/account" element={<Account />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/verify-mfa" element={<VerifyMfa />} />
        </Routes>
      </main>
    </>
  );
}

export default App;