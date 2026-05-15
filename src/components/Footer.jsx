import { Link } from 'react-router-dom';
import { useState } from 'react';

const CDN = 'https://themesflat.co/html/ecomus/images';

/* ── Policy / Feature Bar ── */
const PolicyBar = () => {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="8" width="28" height="18" rx="2" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
          <path d="M2 13h28" stroke="#1a1a1a" strokeWidth="1.5"/>
          <path d="M8 4l4 4-4 4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M2 8l8-4h12l8 4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      title: 'Free Shipping',
      desc: 'Free shipping over order $120',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="7" width="28" height="18" rx="3" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
          <path d="M2 13h28" stroke="#1a1a1a" strokeWidth="1.5"/>
          <rect x="6" y="17" width="8" height="3" rx="1" stroke="#1a1a1a" strokeWidth="1.2" fill="none"/>
        </svg>
      ),
      title: 'Flexible Payment',
      desc: 'Pay with Multiple Credit Cards',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M28 16H4" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 16l6-6M4 16l6 6" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 8h8a8 8 0 010 16h-8" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      title: '14 Day Returns',
      desc: 'Within 30 days for an exchange',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="#1a1a1a" strokeWidth="1.5" fill="none"/>
          <path d="M16 10v6l4 2" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="5" fill="white" stroke="#1a1a1a" strokeWidth="1.5"/>
          <path d="M22 24l1.5 1.5L26 22" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Premium Support',
      desc: 'Outstanding premium support',
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      borderBottom: '1px solid #e8e8e8',
    }}>
      {features.map((f, i) => (
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '36px 24px',
          borderLeft: i > 0 ? '1px solid #e8e8e8' : 'none',
        }}>
          <div style={{ marginBottom: 14 }}>{f.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 5 }}>
            {f.title}
          </div>
          <div style={{ fontSize: 13, color: '#777', lineHeight: 1.5 }}>
            {f.desc}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Main Footer ── */
const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); setTimeout(() => setSubmitted(false), 3000); }
  };

  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #e8e8e8' }}>

      {/* Policy Bar */}
      <PolicyBar />

      {/* Main footer columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1.6fr',
        gap: 40,
        padding: '52px 60px 40px',
        maxWidth: 1280, margin: '0 auto',
      }}>

        {/* Col 1 — Brand & Contact */}
        <div>
          {/* Logo */}
          <div style={{
            fontSize: 28, fontWeight: 800, color: '#1a1a1a',
            letterSpacing: '-1px', marginBottom: 20,
            fontFamily: 'inherit',
          }}>
            <span style={{ color: '#1a1a1a' }}>eco</span><span style={{ color: '#1a1a1a' }}>mus</span>
          </div>

          {/* Address */}
          <div style={{ fontSize: 13, color: '#555', lineHeight: 1.9, marginBottom: 16 }}>
            <div>Address: 1234 Fashion Street, Suite 567,</div>
            <div>New York, NY 10001</div>
            <div style={{ marginTop: 4 }}>Email: info@fashionshop.com</div>
            <div>Phone: (212) 555-1234</div>
          </div>

          {/* Get direction link */}
          <a
            href="#"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 13, fontWeight: 600, color: '#1a1a1a',
              textDecoration: 'none', marginBottom: 20,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#555'}
            onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}
          >
            Get direction
            <i className="bi bi-arrow-up-right" style={{ fontSize: 12 }} />
          </a>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {[
              ['https://facebook.com',  'bi-facebook'],
              ['https://twitter.com',   'bi-twitter-x'],
              ['https://instagram.com', 'bi-instagram'],
              ['https://tiktok.com',    'bi-tiktok'],
              ['https://pinterest.com', 'bi-pinterest'],
            ].map(([href, icon]) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  border: '1.5px solid #ddd',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#1a1a1a', textDecoration: 'none',
                  fontSize: 14, transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.borderColor = '#1a1a1a';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.color = '#1a1a1a';
                }}
              >
                <i className={`bi ${icon}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Help */}
        <div>
          <h6 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 18 }}>
            Help
          </h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {[
              ['Privacy Policy', '/'],
              ['Returns + Exchanges', '/'],
              ['Shipping', '/'],
              ['Terms & Conditions', '/'],
              ["FAQ's", '/'],
              ['Compare', '/'],
              ['My Wishlist', '/wishlist'],
            ].map(([label, to]) => (
              <Link
                key={label}
                to={to}
                style={{ fontSize: 13, color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 — About us */}
        <div>
          <h6 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 18 }}>
            About us
          </h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {[
              ['Our Story', '/'],
              ['Visit Our Store', '/'],
              ['Contact Us', '/'],
              ['Account', '/'],
            ].map(([label, to]) => (
              <Link
                key={label}
                to={to}
                style={{ fontSize: 13, color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4 — Email Signup */}
        <div>
          <h6 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 14 }}>
            Sign Up for Email
          </h6>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 18 }}>
            Sign up to get first dibs on new arrivals, sales, exclusive content,{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>events</span>{' '}
            and more!
          </p>

          {submitted ? (
            <div style={{
              background: '#f0faf4', border: '1px solid #3b7a57',
              color: '#3b7a57', padding: '12px 16px',
              borderRadius: 6, fontSize: 13, fontWeight: 600,
            }}>
              🎉 Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: 18 }}>
              <input
                type="email"
                placeholder="Enter your email...."
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '11px 14px',
                  border: '1.5px solid #e0e0e0',
                  borderRight: 'none',
                  borderRadius: '6px 0 0 6px',
                  fontSize: 13, color: '#1a1a1a',
                  outline: 'none', background: '#fff',
                }}
                onFocus={e => e.target.style.borderColor = '#1a1a1a'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
              <button
                type="submit"
                style={{
                  padding: '11px 20px',
                  background: '#1a1a1a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0 6px 6px 0',
                  fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#333'}
                onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
              >
                Subscribe <i className="bi bi-arrow-up-right" style={{ fontSize: 12 }} />
              </button>
            </form>
          )}

          {/* Currency & Language selectors */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <select style={{
              padding: '7px 10px', border: '1.5px solid #e0e0e0',
              borderRadius: 6, fontSize: 12, color: '#555',
              cursor: 'pointer', background: '#fff', outline: 'none',
            }}>
              <option>🇺🇸 USD</option>
              <option>🇪🇺 EUR</option>
              <option>🇬🇧 GBP</option>
            </select>
            <select style={{
              padding: '7px 10px', border: '1.5px solid #e0e0e0',
              borderRadius: 6, fontSize: 12, color: '#555',
              cursor: 'pointer', background: '#fff', outline: 'none',
            }}>
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid #e8e8e8',
        padding: '16px 60px',
        maxWidth: 1280, margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ fontSize: 13, color: '#888' }}>
          © 2025 Ecomus Store. All Rights Reserved
        </div>

        {/* Payment method icons */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {[
            { label: 'VISA',       bg: '#1a1f71', color: '#fff',     text: 'VISA',       font: '700 13px sans-serif' },
            { label: 'PayPal',     bg: '#003087', color: '#009cde',  text: 'P',          font: '800 16px sans-serif' },
            { label: 'Mastercard', bg: '#fff',    color: '#eb001b',  text: '●●',         font: '700 14px sans-serif' },
            { label: 'Amex',       bg: '#2e77bc', color: '#fff',     text: 'AMEX',       font: '700 10px sans-serif' },
            { label: 'Diners',     bg: '#fff',    color: '#004b87',  text: 'DC',         font: '700 11px sans-serif' },
          ].map(p => (
            <div
              key={p.label}
              title={p.label}
              style={{
                height: 28, minWidth: 44,
                background: p.bg,
                borderRadius: 4,
                border: '1px solid #e0e0e0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 8px',
                color: p.color,
                font: p.font,
                letterSpacing: 0.5,
              }}
            >
              {p.text}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
