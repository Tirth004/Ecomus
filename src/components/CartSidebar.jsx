import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      <div className={`overlay${isCartOpen ? ' active' : ''}`} onClick={() => setIsCartOpen(false)} />
      <div className={`sidebar-drawer${isCartOpen ? ' open' : ''}`}>
        <div className="sidebar-drawer-header" style={{ borderBottom: 'none', paddingBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 500, color: '#1a1a1a', letterSpacing: '-0.2px' }}>Shopping cart</h3>
          <button className="sidebar-close-btn" onClick={() => setIsCartOpen(false)} style={{ fontSize: 28, color: '#1a1a1a' }}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-state" style={{padding:'60px 24px'}}>
            <i className="bi bi-bag"></i>
            <h4>Your cart is empty</h4>
            <p>Looks like you haven't added anything yet.</p>
            <button className="btn-primary-custom" onClick={() => setIsCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Free Shipping Bar */}
            <div style={{ padding: '0 24px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 400 }}>
                  Buy <strong style={{ fontWeight: 600 }}>$75.00</strong> more to enjoy <strong style={{ fontWeight: 600 }}>Free Shipping</strong>
                </span>
              </div>
              <div style={{ height: 3, background: '#f0f0f0', borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '30%', background: '#db4444', borderRadius: 2 }} />
                <div style={{ 
                  position: 'absolute', left: '30%', top: '50%', transform: 'translate(-50%, -50%)', 
                  background: '#fff', color: '#db4444', width: 26, height: 18, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2
                }}>
                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.1666 7.63636V11.2727C19.1666 11.6344 19.0229 11.9812 18.7671 12.237C18.5114 12.4927 18.1645 12.6364 17.8029 12.6364H16.8938C16.8938 13.0883 16.7142 13.5218 16.3946 13.8413C16.0751 14.1609 15.6416 14.3404 15.1897 14.3404C14.7378 14.3404 14.3043 14.1609 13.9847 13.8413C13.6651 13.5218 13.4856 13.0883 13.4856 12.6364H7.34921C7.34921 13.0883 7.16966 13.5218 6.85011 13.8413C6.53055 14.1609 6.09709 14.3404 5.64516 14.3404C5.19322 14.3404 4.75977 14.1609 4.44021 13.8413C4.12065 13.5218 3.94111 13.0883 3.94111 12.6364H2.80475C2.44309 12.6364 2.09627 12.4927 1.84052 12.237C1.58477 11.9812 1.44111 11.6344 1.44111 11.2727V3.54545C1.44111 3.18379 1.58477 2.83695 1.84052 2.5812C2.09627 2.32545 2.44309 2.18182 2.80475 2.18182H13.0311V5.59091H15.0766L18.4856 6.95455C18.7303 7.05141 18.9405 7.21852 19.0881 7.43391C19.1415 7.49842 19.1666 7.56627 19.1666 7.63636ZM5.64516 13.204C5.7956 13.204 5.93988 13.1442 6.04625 13.0378C6.15263 12.9315 6.21243 12.7872 6.21243 12.6364C6.21243 12.4855 6.15263 12.3412 6.04625 12.2349C5.93988 12.1285 5.7956 12.0687 5.64516 12.0687C5.49471 12.0687 5.35043 12.1285 5.24406 12.2349C5.13768 12.3412 5.07788 12.4855 5.07788 12.6364C5.07788 12.7872 5.13768 12.9315 5.24406 13.0378C5.35043 13.1442 5.49471 13.204 5.64516 13.204ZM15.1897 13.204C15.3401 13.204 15.4844 13.1442 15.5908 13.0378C15.6972 12.9315 15.757 12.7872 15.757 12.6364C15.757 12.4855 15.6972 12.3412 15.5908 12.2349C15.4844 12.1285 15.3401 12.0687 15.1897 12.0687C15.0392 12.0687 14.895 12.1285 14.7886 12.2349C14.6822 12.3412 14.6224 12.4855 14.6224 12.6364C14.6224 12.7872 14.6822 12.9315 14.7886 13.0378C14.895 13.1442 15.0392 13.204 15.1897 13.204ZM18.0302 8.31818H14.1675V3.31818H2.80475C2.50369 3.31818 2.21495 3.43782 2.00206 3.65072C1.78917 3.86362 1.66953 4.15236 1.66953 4.45342V11.2727C1.66953 11.5738 1.78917 11.8625 2.00206 12.0754C2.21495 12.2883 2.50369 12.408 2.80475 12.408H3.84457C3.9056 12.0461 4.07255 11.7136 4.32174 11.4589C4.57094 11.2042 4.88939 11.0402 5.23071 10.9902H5.64516C5.98648 10.9902 6.30493 11.1542 6.55412 11.4089C6.80332 11.6636 6.97027 11.9961 7.0313 12.358H13.3891C13.4501 11.9961 13.6171 11.6636 13.8663 11.4089C14.1155 11.1542 14.4339 10.9902 14.7753 10.9902H15.1897C15.531 10.9902 15.8495 11.1542 16.0987 11.4089C16.3479 11.6636 16.5148 11.9961 16.5759 12.358H17.8029C18.104 12.358 18.3927 12.2383 18.6056 12.0255C18.8185 11.8126 18.9382 11.5238 18.9382 11.2227V8.58386L18.0302 8.31818Z" fill="#db4444"/>
                    <rect x="5" y="6" width="3" height="3" rx="1.5" fill="#db4444" fillOpacity="0.1"/>
                  </svg>
                </div>
              </div>
            </div>

            <div style={{flex:1, overflowY:'auto'}}>
              {cartItems.map((item, i) => (
                <div key={i} className="cart-item" style={{ padding: '0 24px 24px', borderBottom: 'none' }}>
                  <div className="cart-item-img" style={{ width: 80, height: 105, borderRadius: 0 }}>
                    <img src={item.image} alt={item.name} style={{ borderRadius: 6 }} />
                  </div>
                  <div className="cart-item-info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: '#1a1a1a', marginBottom: 6 }}>
                      {item.color || 'Light gray'}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>
                      ${item.price.toFixed(2)}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div className="qty-input" style={{ width: 90, height: 36, background: '#f5f5f5', border: 'none', borderRadius: 4 }}>
                        <button className="qty-btn" style={{ fontSize: 16, border: 'none' }} onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>−</button>
                        <input className="qty-value" style={{ border: 'none', background: 'transparent' }} value={item.quantity} readOnly />
                        <button className="qty-btn" style={{ fontSize: 16, border: 'none' }} onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size, item.color)} style={{ background: 'none', border: 'none', color: '#1a1a1a', fontSize: 13, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* You may also like placeholder (static) */}
              <div style={{ padding: '24px', borderTop: '1px solid #f0f0f0' }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>You may also like</h4>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img src="https://themesflat.co/html/ecomus/images/products/white-2.jpg" alt="Loose Fit Hoodie" style={{ width: 60, height: 80, borderRadius: 4, objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>Loose Fit Hoodie</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>$35.00</div>
                  </div>
                  <button style={{ marginLeft: 'auto', width: 36, height: 36, borderRadius: '50%', background: '#1a1a1a', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-bag"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="cart-footer" style={{ background: '#f9f9f9', padding: '0 24px 24px', borderTop: 'none', position: 'relative' }}>
              {/* Floating Icons block */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, transform: 'translateY(-16px)' }}>
                {[
                  { icon: 'bi-pencil-square' },
                  { icon: 'bi-box-seam' },
                  { icon: 'bi-truck' }
                ].map((btn, idx) => (
                  <button key={idx} style={{ 
                    width: 44, height: 44, borderRadius: 4, background: '#fff', 
                    border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: '#1a1a1a', cursor: 'pointer'
                  }}>
                    <i className={btn.icon}></i>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a' }}>Subtotal</span>
                <span style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>${cartTotal.toFixed(2)} USD</span>
              </div>
              <p style={{ fontSize: 12, color: '#555', marginBottom: 16 }}>
                Taxes and <span style={{ textDecoration: 'underline' }}>shipping</span> calculated at checkout
              </p>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#1a1a1a', marginBottom: 20, cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: 16, height: 16, accentColor: '#1a1a1a', cursor: 'pointer' }} />
                <span>I agree with the <span style={{ textDecoration: 'underline' }}>terms and conditions</span></span>
              </label>

              <div style={{ display: 'flex', gap: 12 }}>
                <Link
                  to="/cart"
                  className="btn-outline-custom text-center"
                  style={{ flex: 1, padding: '12px 0', fontSize: 14, fontWeight: 600, borderRadius: 4 }}
                  onClick={() => setIsCartOpen(false)}
                >
                  View cart
                </Link>
                <Link
                  to="/checkout"
                  className="btn-primary-custom text-center"
                  style={{ flex: 1, padding: '12px 0', fontSize: 14, fontWeight: 600, borderRadius: 4 }}
                  onClick={() => setIsCartOpen(false)}
                >
                  Check out
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
