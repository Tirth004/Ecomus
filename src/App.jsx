import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';


import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import SearchOverlay from './components/SearchOverlay';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ShopMen from './pages/ShopMen';
import ShopWomen from './pages/ShopWomen';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/responsive.css';

const AppContent = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top on route change
  return (
    <>

      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartSidebar />
      <WishlistSidebar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/men" element={<ShopMen />} />
          <Route path="/shop/women" element={<ShopWomen />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="*" element={
            <div className="empty-state" style={{ padding: '100px 20px' }}>
              <i className="bi bi-exclamation-circle"></i>
              <h4>Page Not Found</h4>
              <p>The page you're looking for doesn't exist.</p>
              <a href="/" className="btn-primary-custom">Go Home</a>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
};

const App = () => (
  <Router>
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  </Router>
);

export default App;
