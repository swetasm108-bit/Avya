import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Account from "./components/Pages/Account";

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<h2>Jai Shree Ganesha</h2>} />
          <Route path="/shop" element={<h2>Shop page — coming soon we are launching it soon</h2>} />
          <Route path="/wishlist" element={<h2>Wishlist page — coming soon we are launching it soon</h2>} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </>
  );
}

export default App;