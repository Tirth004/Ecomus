import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const freeShippingThreshold = 120;
  const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - cartTotal, 0);

  if (cartItems.length === 0) return (
    <div>
      <div className="breadcrumb-custom"><div className="container"><Link to="/">Home</Link><span className="separator">›</span><span className="current">Cart</span></div></div>
      <div className="empty-state"><i className="bi bi-bag"></i><h4>Your cart is empty</h4><p>Looks like you haven't added anything yet.</p><Link to="/shop" className="btn-primary-custom">Continue Shopping</Link></div>
    </div>
  );

  return (
    <div>
      {/* ── Page Title Banner ── */}
      <div style={{
        background: '#fdf8f4',
        padding: '110px 0',
        textAlign: 'center',
        marginBottom: 40,
      }}>
        <h1 style={{
          fontSize: 46,
          fontWeight: 400,
          color: '#1a1a1a',
          margin: 0,
          letterSpacing: '-0.5px',
          fontFamily: "'DM Sans', Inter, sans-serif"
        }}>
          Shopping Cart
        </h1>
      </div>

      <div className="cart-page container">
        {/* Timer Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: '#1a1a1a' }}>
            🔥 These products are limited, checkout within 
            <span style={{ background: '#db4444', color: '#fff', padding: '6px 16px', borderRadius: 20, fontWeight: 600, fontSize: 14 }}>
              09m:46s
            </span>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px dashed #f0f0f0' }}>
                    <td>
                      <div className="cart-product-cell">
                        <div className="cart-product-img">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div>
                          <Link to={`/product/${item.id}`} style={{fontSize:14,fontWeight:500,color:'#1a1a1a'}}>{item.name}</Link>
                          <p style={{fontSize:13,color:'#555',margin:'4px 0 6px'}}>
                            {item.color || 'White'} / {item.size || 'M'}
                          </p>
                          <button onClick={() => removeFromCart(item.id, item.size, item.color)} style={{background:'none',border:'none',cursor:'pointer',color:'#1a1a1a',fontSize:13,textDecoration:'underline',padding:0}}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td style={{fontSize:14,fontWeight:600}}>${item.price.toFixed(2)}</td>
                    <td>
                      <div className="qty-input" style={{ width: 90, height: 36, background: '#f5f5f5', border: 'none', borderRadius: 4 }}>
                        <button className="qty-btn" style={{ fontSize: 16, border: 'none' }} onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>−</button>
                        <input className="qty-value" style={{ border: 'none', background: 'transparent' }} value={item.quantity} readOnly />
                        <button className="qty-btn" style={{ fontSize: 16, border: 'none' }} onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td style={{fontSize:14,fontWeight:600,color:'#1a1a1a'}}>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Order Note */}
            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Add Order Note</div>
              <textarea 
                placeholder="How can we help you?" 
                style={{ width: '100%', height: 120, padding: 16, border: '1px solid #f0f0f0', borderRadius: 4, outline: 'none', resize: 'none', fontSize: 14, color: '#555' }}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <div style={{ padding: '0 0 24px', borderBottom: '1px solid #f0f0f0', marginBottom: 24 }}>
              {/* Free Shipping Bar */}
              <div style={{ height: 3, background: '#f0f0f0', borderRadius: 2, position: 'relative', marginBottom: 16, marginTop: 10 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress}%`, background: '#db4444', borderRadius: 2, transition: 'width 0.4s ease' }} />
                <div style={{ 
                  position: 'absolute', left: `${progress}%`, top: '50%', transform: 'translate(-50%, -50%)', 
                  background: '#fff', color: '#db4444', width: 26, height: 18, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
                  transition: 'left 0.4s ease'
                }}>
                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.1666 7.63636V11.2727C19.1666 11.6344 19.0229 11.9812 18.7671 12.237C18.5114 12.4927 18.1645 12.6364 17.8029 12.6364H16.8938C16.8938 13.0883 16.7142 13.5218 16.3946 13.8413C16.0751 14.1609 15.6416 14.3404 15.1897 14.3404C14.7378 14.3404 14.3043 14.1609 13.9847 13.8413C13.6651 13.5218 13.4856 13.0883 13.4856 12.6364H7.34921C7.34921 13.0883 7.16966 13.5218 6.85011 13.8413C6.53055 14.1609 6.09709 14.3404 5.64516 14.3404C5.19322 14.3404 4.75977 14.1609 4.44021 13.8413C4.12065 13.5218 3.94111 13.0883 3.94111 12.6364H2.80475C2.44309 12.6364 2.09627 12.4927 1.84052 12.237C1.58477 11.9812 1.44111 11.6344 1.44111 11.2727V3.54545C1.44111 3.18379 1.58477 2.83695 1.84052 2.5812C2.09627 2.32545 2.44309 2.18182 2.80475 2.18182H13.0311V5.59091H15.0766L18.4856 6.95455C18.7303 7.05141 18.9405 7.21852 19.0881 7.43391C19.1415 7.49842 19.1666 7.56627 19.1666 7.63636ZM5.64516 13.204C5.7956 13.204 5.93988 13.1442 6.04625 13.0378C6.15263 12.9315 6.21243 12.7872 6.21243 12.6364C6.21243 12.4855 6.15263 12.3412 6.04625 12.2349C5.93988 12.1285 5.7956 12.0687 5.64516 12.0687C5.49471 12.0687 5.35043 12.1285 5.24406 12.2349C5.13768 12.3412 5.07788 12.4855 5.07788 12.6364C5.07788 12.7872 5.13768 12.9315 5.24406 13.0378C5.35043 13.1442 5.49471 13.204 5.64516 13.204ZM15.1897 13.204C15.3401 13.204 15.4844 13.1442 15.5908 13.0378C15.6972 12.9315 15.757 12.7872 15.757 12.6364C15.757 12.4855 15.6972 12.3412 15.5908 12.2349C15.4844 12.1285 15.3401 12.0687 15.1897 12.0687C15.0392 12.0687 14.895 12.1285 14.7886 12.2349C14.6822 12.3412 14.6224 12.4855 14.6224 12.6364C14.6224 12.7872 14.6822 12.9315 14.7886 13.0378C14.895 13.1442 15.0392 13.204 15.1897 13.204ZM18.0302 8.31818H14.1675V3.31818H2.80475C2.50369 3.31818 2.21495 3.43782 2.00206 3.65072C1.78917 3.86362 1.66953 4.15236 1.66953 4.45342V11.2727C1.66953 11.5738 1.78917 11.8625 2.00206 12.0754C2.21495 12.2883 2.50369 12.408 2.80475 12.408H3.84457C3.9056 12.0461 4.07255 11.7136 4.32174 11.4589C4.57094 11.2042 4.88939 11.0402 5.23071 10.9902H5.64516C5.98648 10.9902 6.30493 11.1542 6.55412 11.4089C6.80332 11.6636 6.97027 11.9961 7.0313 12.358H13.3891C13.4501 11.9961 13.6171 11.6636 13.8663 11.4089C14.1155 11.1542 14.4339 10.9902 14.7753 10.9902H15.1897C15.531 10.9902 15.8495 11.1542 16.0987 11.4089C16.3479 11.6636 16.5148 11.9961 16.5759 12.358H17.8029C18.104 12.358 18.3927 12.2383 18.6056 12.0255C18.8185 11.8126 18.9382 11.5238 18.9382 11.2227V8.58386L18.0302 8.31818Z" fill="#db4444"/>
                    <rect x="5" y="6" width="3" height="3" rx="1.5" fill="#db4444" fillOpacity="0.1"/>
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 400 }}>
                {remaining > 0 ? (
                  <>Buy <strong style={{ fontWeight: 600 }}>${remaining.toFixed(2)}</strong> more to enjoy <strong style={{ fontWeight: 600 }}>Free Shipping</strong></>
                ) : (
                  <>You have got <strong style={{ fontWeight: 600 }}>Free Shipping!</strong></>
                )}
              </div>
            </div>

            <div style={{ background: '#f9f9f9', padding: '32px 28px', borderRadius: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, cursor: 'pointer' }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>Estimate Shipping</span>
                <i className="bi bi-plus" style={{ fontSize: 20 }}></i>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555', marginBottom: 24, cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: 16, height: 16, accentColor: '#1a1a1a', cursor: 'pointer' }} />
                <span>Do you want a gift wrap? Only $5.00</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: '#1a1a1a' }}>Subtotal</span>
                <span style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>${cartTotal.toFixed(2)} USD</span>
              </div>
              
              <p style={{ fontSize: 13, color: '#555', marginBottom: 20 }}>
                Taxes and <span style={{ textDecoration: 'underline' }}>shipping</span> calculated at checkout
              </p>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#1a1a1a', marginBottom: 24, cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: 16, height: 16, accentColor: '#1a1a1a', cursor: 'pointer' }} />
                <span>I agree with the <span style={{ textDecoration: 'underline' }}>terms and conditions</span></span>
              </label>

              <Link to="/checkout" className="btn-primary-custom d-block text-center mb-4" style={{ padding: '16px 0', fontSize: 15, fontWeight: 600 }}>
                Check out
              </Link>
              
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>Guarantee Safe Checkout</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                  <img src="https://themesflat.co/html/ecomus/images/payments/visa.png" alt="Visa" style={{ height: 20 }} />
                  <img src="https://themesflat.co/html/ecomus/images/payments/paypal.png" alt="PayPal" style={{ height: 20 }} />
                  <img src="https://themesflat.co/html/ecomus/images/payments/mastercard.png" alt="Mastercard" style={{ height: 20 }} />
                  <img src="https://themesflat.co/html/ecomus/images/payments/amex.png" alt="Amex" style={{ height: 20 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Happy Clients static section */}
        <div style={{ marginTop: 100, textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 400, marginBottom: 40 }}>Happy Clients</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, textAlign: 'left' }}>
            {[
              { title: "Best Online Fashion Site", quote: "“ I always find something stylish and affordable on this web fashion site ”", author: "Robert smith", loc: "Customer from USA", img: "orange-1.jpg", pName: "Jersey thong body", pPrice: "$105.95" },
              { title: "Great Selection and Quality", quote: "“ I love the variety of styles and the high-quality clothing on this web fashion site. ”", author: "Allen Lyn", loc: "Customer from France", img: "white-1.jpg", pName: "Cotton jersey top", pPrice: "$7.95" },
              { title: "Best Customer Service", quote: "“ I finally found a web fashion site with stylish and flattering options in my size. ”", author: "Peter Rope", loc: "Customer from USA", img: "black-1.jpg", pName: "Ribbed modal T-shirt", pPrice: "From $18.95" }
            ].map((t, i) => (
              <div key={i} style={{ border: '1px solid #f0f0f0', borderRadius: 8, padding: 32 }}>
                <div style={{ color: '#ffc107', fontSize: 16, marginBottom: 12 }}>★★★★★</div>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.title}</h4>
                <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6, marginBottom: 24 }}>{t.quote}</p>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.author}</div>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>{t.loc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
                  <img src={`https://themesflat.co/html/ecomus/images/products/${t.img}`} alt={t.pName} style={{ width: 50, height: 65, objectFit: 'cover', borderRadius: 4 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{t.pName}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{t.pPrice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* You may also like static section */}
        <div style={{ marginTop: 100, textAlign: 'center', paddingBottom: 80 }}>
          <h2 style={{ fontSize: 32, fontWeight: 400, marginBottom: 40 }}>You may also like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'left' }}>
            {[
              { img: "orange-1.jpg", name: "Ribbed Tank Top", price: "$16.95", colors: ["#e8651a", "#1a1a1a", "#fff"] },
              { img: "white-1.jpg", name: "Ribbed modal T-shirt", price: "From $18.95", colors: ["#d9b99b", "#d98be2", "#b1e8c7"], badge: "-33%" },
              { img: "white-2.jpg", name: "Oversized Printed T-shirt", price: "$10.00", colors: [] },
              { img: "white-3.jpg", name: "Oversized Printed T-shirt", price: "$16.95", colors: ["#fff", "#d98be2", "#1a1a1a"] }
            ].map((p, i) => (
              <div key={i} style={{ borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '3/4', background: '#f5f5f5', marginBottom: 12 }}>
                  <img src={`https://themesflat.co/html/ecomus/images/products/${p.img}`} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {p.badge && (
                    <span style={{ position: 'absolute', top: 12, left: 12, background: '#db4444', color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4 }}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>{p.price}</div>
                {p.colors.length > 0 && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    {p.colors.map((c, j) => (
                      <div key={j} style={{ width: 14, height: 14, borderRadius: '50%', background: c, border: c === '#fff' ? '1px solid #ddd' : 'none', outline: j === 0 ? '1px solid #1a1a1a' : 'none', outlineOffset: 2 }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
