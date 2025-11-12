import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Login from './components/Login';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import Videos from './pages/Videos';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import Reviews from './pages/Reviews';
import Addresses from './pages/Addresses';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ShopkeeperDashboard from './pages/ShopkeeperDashboard';
import ShopkeeperLogin from './pages/ShopkeeperLogin';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const { showLoginModal } = useAuth();
  const location = useLocation();
  
  // Hide Navbar and BottomNav for shopkeeper routes
  const isShopkeeperRoute = location.pathname === '/shopkeeper' || location.pathname === '/shopkeeper-login';

  return (
    <div className="App">
      {!isShopkeeperRoute && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/shopkeeper-login" element={<ShopkeeperLogin />} />
          <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
        </Routes>
      </div>
      {!isShopkeeperRoute && <BottomNav />}
      {showLoginModal && <Login />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
