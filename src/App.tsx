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

// --- NEW ADMIN IMPORTS ---
import AdminDashboard from "./pages/admin/Dashboard"; // Adjust this path if you saved it somewhere else!
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Customers from "./pages/admin/Customers";
import Content from "./pages/admin/Content";
import Settings from "./pages/admin/Settings";
import Promotions from "./pages/admin/Promotions";

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
        <Route path="/product/:id" element={<ProductDetail />} /> 
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<Orders/>} />
          <Route path="products" element={<Products/>} />
          <Route path="customers" element={<Customers/>} />
          <Route path="content" element={<Content/>} />
          <Route path="promotions" element={<Promotions/>} />
          <Route path="settings" element={<Settings/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;