import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quickView, setQuickView] = useState(null);

  const moveAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item));
    clearWishlist && clearWishlist();
  };

  return (
    <div>
      {/* ── Page Title Banner ── */}
      <div style={{
        background: '#fdf8f4', // very soft warm cream color matching Ecomus screenshot
        padding: '110px 0',
        textAlign: 'center',
        marginBottom: 60,
      }}>
        <h1 style={{
          fontSize: 46,
          fontWeight: 400,
          color: '#1a1a1a',
          margin: 0,
          letterSpacing: '-0.5px',
          fontFamily: "'DM Sans', Inter, sans-serif"
        }}>
          Your wishlist
        </h1>
      </div>

      <div className="wishlist-page container" style={{ paddingBottom: 100 }}>

        {wishlistItems.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-heart"></i>
            <h4>Your wishlist is empty</h4>
            <p>Save your favorite items here to buy them later.</p>
            <Link to="/shop" className="btn-primary-custom">Explore Products</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map(p => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </div>
        )}
      </div>
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
};

export default Wishlist;
