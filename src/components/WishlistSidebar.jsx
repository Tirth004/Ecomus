import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const WishlistSidebar = () => {
  const { wishlistItems, removeFromWishlist, wishlistCount, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <div className={`overlay${isWishlistOpen ? ' active' : ''}`} onClick={() => setIsWishlistOpen(false)} style={{zIndex:1044}} />
      <div className={`sidebar-drawer${isWishlistOpen ? ' open' : ''}`} style={{zIndex:1045}}>
        <div className="sidebar-drawer-header">
          <h3>Wishlist <span style={{fontSize:14,color:'var(--text-secondary)',fontWeight:400}}>({wishlistCount})</span></h3>
          <button className="sidebar-close-btn" onClick={() => setIsWishlistOpen(false)}>×</button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-state" style={{padding:'60px 24px'}}>
            <i className="bi bi-heart"></i>
            <h4>Your wishlist is empty</h4>
            <p>Save items you love for later.</p>
            <button className="btn-primary-custom" onClick={() => setIsWishlistOpen(false)}>Discover Products</button>
          </div>
        ) : (
          <div>
            {wishlistItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  <Link to={`/product/${item.id}`} onClick={() => setIsWishlistOpen(false)}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  <button
                    className="btn-primary-custom mt-2"
                    style={{padding:'6px 14px', fontSize:12}}
                    onClick={() => { addToCart(item); removeFromWishlist(item.id); }}
                  >
                    Move to Cart
                  </button>
                </div>
                <button className="cart-remove-btn" onClick={() => removeFromWishlist(item.id)}>
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistSidebar;
