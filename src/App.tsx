import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Spritz from "./pages/Spritz";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Merchandise from "./pages/Merchandise";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spritz" element={<Spritz />} />
        <Route path="/merchandise" element={<Merchandise/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/* <-- Dynamic Product Route */}
      </Routes>
    </Router>
  );
}

export default App;