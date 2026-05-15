import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ firstName:'', lastName:'', country:'', city:'', email:'', phone:'', payment:'card' });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  if (cartItems.length === 0 && !success) return (
    <div>
      <div className="empty-state" style={{padding:'100px 0', textAlign:'center'}}>
        <i className="bi bi-bag" style={{fontSize:48,color:'#ccc',marginBottom:20,display:'block'}}></i>
        <h4>Your cart is empty</h4>
        <p>Add items to your cart before checkout.</p>
        <Link to="/shop" className="btn-primary-custom mt-4">Shop Now</Link>
      </div>
    </div>
  );

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.country.trim()) e.country = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSuccess(true);
    clearCart();
  };

  const update = (field, val) => { setForm(f => ({...f, [field]:val})); setErrors(er => ({...er, [field]:undefined})); };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #e5e5e5',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none',
    color: '#1a1a1a'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '8px'
  };

  const asteriskStyle = { color: '#db4444' };

  return (
    <div>
      {/* ── Page Title Banner ── */}
      <div style={{
        background: '#fdf8f4',
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
          Check Out
        </h1>
      </div>

      <div className="checkout-page container" style={{ marginBottom: 100 }}>
        <form onSubmit={handleSubmit}>
          <div className="row g-5">
            {/* ── Left Column: Billing Details ── */}
            <div className="col-lg-7">
              <h2 style={{ fontSize: 24, fontWeight: 400, marginBottom: 32 }}>Billing details</h2>
              
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <label style={labelStyle}>First Name<span style={asteriskStyle}>*</span></label>
                  <input type="text" style={inputStyle} value={form.firstName} onChange={e=>update('firstName',e.target.value)} placeholder="Themesflat" />
                  {errors.firstName && <span style={{color:'#db4444',fontSize:12,marginTop:4,display:'block'}}>{errors.firstName}</span>}
                </div>
                <div className="col-md-6">
                  <label style={labelStyle}>Last Name<span style={asteriskStyle}>*</span></label>
                  <input type="text" style={inputStyle} value={form.lastName} onChange={e=>update('lastName',e.target.value)} />
                  {errors.lastName && <span style={{color:'#db4444',fontSize:12,marginTop:4,display:'block'}}>{errors.lastName}</span>}
                </div>
              </div>

              <div className="mb-4">
                <label style={labelStyle}>Country/Region<span style={asteriskStyle}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <select style={{...inputStyle, appearance:'none', cursor:'pointer', color: form.country ? '#1a1a1a' : '#777'}} value={form.country} onChange={e=>update('country',e.target.value)}>
                    <option value="">---</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                  </select>
                  <i className="bi bi-chevron-down" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#555' }}></i>
                </div>
                {errors.country && <span style={{color:'#db4444',fontSize:12,marginTop:4,display:'block'}}>{errors.country}</span>}
              </div>

              <div className="mb-4">
                <label style={labelStyle}>Town/City<span style={asteriskStyle}>*</span></label>
                <input type="text" style={inputStyle} value={form.city} onChange={e=>update('city',e.target.value)} />
                {errors.city && <span style={{color:'#db4444',fontSize:12,marginTop:4,display:'block'}}>{errors.city}</span>}
              </div>

              {/* Extra default fields to make form functional but matching layout flow */}
              <div className="mb-4">
                <label style={labelStyle}>Phone</label>
                <input type="tel" style={inputStyle} value={form.phone} onChange={e=>update('phone',e.target.value)} />
              </div>
              
              <div className="mb-4">
                <label style={labelStyle}>Email address<span style={asteriskStyle}>*</span></label>
                <input type="email" style={inputStyle} value={form.email} onChange={e=>update('email',e.target.value)} />
              </div>

            </div>

            {/* ── Right Column: Your Order ── */}
            <div className="col-lg-5">
              <h2 style={{ fontSize: 24, fontWeight: 400, marginBottom: 32 }}>Your order</h2>
              
              <div style={{ background: '#f9f9f9', padding: '32px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
                  {cartItems.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ position: 'relative', width: 64, height: 84, flexShrink: 0 }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                        <span style={{ 
                          position: 'absolute', top: -8, right: -8, 
                          background: '#777', color: '#fff', fontSize: 11, fontWeight: 600, 
                          width: 20, height: 20, borderRadius: '50%', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center' 
                        }}>
                          {item.quantity}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontSize: 13, color: '#555' }}>
                          {item.color || 'Vanilla White'} {item.size && `/ ${item.size}`}
                        </div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: 24, marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span style={{ fontSize: 14, color: '#1a1a1a' }}>Subtotal</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                    <span style={{ fontSize: 14, color: '#1a1a1a' }}>Shipping</span>
                    <span style={{ fontSize: 14, color: '#1a1a1a' }}>Free shipping</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e5e5', paddingTop: 24 }}>
                    <span style={{ fontSize: 18, fontWeight: 500, color: '#1a1a1a' }}>Total</span>
                    <span style={{ fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="payment-method" style={{ marginBottom: 24 }}>
                  {[{id:'card',label:'Credit Card'},{id:'paypal',label:'PayPal'}].map(pm => (
                    <label key={pm.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#fff', border: form.payment===pm.id ? '1px solid #1a1a1a' : '1px solid #e5e5e5', borderRadius: 4, cursor: 'pointer', marginBottom: 12 }}>
                      <input type="radio" name="payment" checked={form.payment === pm.id} onChange={() => update('payment', pm.id)} style={{ accentColor: '#1a1a1a', width: 16, height: 16 }} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>{pm.label}</span>
                    </label>
                  ))}
                </div>
                
                <p style={{ fontSize: 13, color: '#555', marginBottom: 24, lineHeight: 1.6 }}>
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </p>

                <button type="submit" className="btn-primary-custom w-100" style={{ padding: '16px', fontSize: 15, fontWeight: 600, borderRadius: 4 }}>
                  Place order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {success && (
        <div className="success-modal">
          <div className="success-modal-backdrop" />
          <div className="success-modal-content">
            <div className="success-icon"><i className="bi bi-check-circle-fill"></i></div>
            <h3>Order Placed Successfully!</h3>
            <p>Thank you for your order! This is a demo checkout — no real payment was processed.</p>
            <Link to="/" className="btn-primary-custom mt-3" onClick={() => setSuccess(false)}>Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
