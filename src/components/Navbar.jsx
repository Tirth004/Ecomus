import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const CDN = 'https://themesflat.co/html/ecomus/images';

/* ─── Shop mega-menu data (exact Ecomus reference) ─── */
const shopMegaData = {
  columns: [
    {
      heading: 'SHOP LAYOUTS',
      links: [
        'Default', 'Left sidebar', 'Right sidebar',
        'Fullwidth', 'Sub collection', 'Collections list',
      ],
    },
    {
      heading: 'FEATURES',
      links: [
        'Pagination links', 'Pagination loadmore',
        'Pagination infinite scrolling', 'Filter sidebar', 'Filter hidden',
      ],
    },
    {
      heading: 'PRODUCT STYLES',
      links: [
        'Product style 01', 'Product style 02', 'Product style 03',
        'Product style 04', 'Product style 05', 'Product style 06',
        'Product style 07',
      ],
    },
  ],
  images: [
    { label: 'Men',   img: `${CDN}/collections/collection-1.jpg`, to: '/shop/men' },
    { label: 'Women', img: `${CDN}/collections/collection-2.jpg`, to: '/shop/women' },
  ],
};

const Navbar = ({ onSearchOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);  // which nav item is hovered
  const [scrolled, setScrolled]    = useState(false);
  const [hidden, setHidden]        = useState(false);
  const [mobileOpen, setMobileOpen]    = useState(false);
  const [mobileSub, setMobileSub]      = useState(null);
  const lastScroll = useRef(0);
  const closeTimer = useRef(null);

  const { cartCount, setIsCartOpen }         = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); setMobileSub(null); setActiveMenu(null); }, [location]);

  /* scroll hide/show */
  useEffect(() => {
    const fn = () => {
      const cur = window.scrollY;
      setScrolled(cur > 10);
      setHidden(cur > 100 && cur > lastScroll.current);
      lastScroll.current = cur;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* helpers to open/close with a small delay so the dropdown doesn't flicker */
  const openMenu  = (name) => { clearTimeout(closeTimer.current); setActiveMenu(name); };
  const closeMenu = ()     => { closeTimer.current = setTimeout(() => setActiveMenu(null), 120); };

  /* simple dropdown items */
  const simpleMenus = {
    Products: [['All Products', '/shop'], ['New Arrivals', '/shop'], ['Best Sellers', '/shop'], ['Sale', '/shop']],
    Pages:    [['About Us', '/contact'], ['Contact', '/contact'], ['FAQ', '/contact']],
    Blog:     [['Latest News', '/blog'], ['Style Guide', '/blog']],
  };

  return (
    <>
      {/* ═══ STICKY WRAPPER (topbar + nav together) ═══ */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 1000,
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.32s ease',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.07)' : 'none',
        marginBottom: location.pathname === '/' ? '-60px' : '0', // Pulls hero banner underneath main nav
      }}>

        {/* ── TOP ANNOUNCEMENT BAR ── */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #e8e8e8',
          height: 40,
          display: 'flex', alignItems: 'center',
          padding: '0 40px',
          maxWidth: '100%',
        }}>
          <div style={{
            maxWidth: 1280, margin: '0 auto', width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            {/* Left — Social icons */}
            <div className="topbar-social" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {[
                { icon: 'bi-facebook',  href: '#' },
                { icon: 'bi-twitter-x', href: '#' },
                { icon: 'bi-instagram', href: '#' },
                { icon: 'bi-tiktok',    href: '#' },
                { icon: 'bi-pinterest', href: '#' },
              ].map(({ icon, href }) => (
                <a key={icon} href={href} style={{ color: '#555', fontSize: 14, lineHeight: 1, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                  onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                  <i className={`bi ${icon}`} />
                </a>
              ))}
            </div>

            {/* Center — Announcement */}
            <div className="topbar-center" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#1a1a1a' }}>
              <Link to="/shop" style={{ color: '#db4444', fontWeight: 600, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                Buy now <i className="bi bi-arrow-up-right" style={{ fontSize: 10 }} />
              </Link>
              <span style={{ color: '#ccc' }}>|</span>
              <span>Summer sale discount off</span>
            </div>

            {/* Right — Currency + Language */}
            <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#1a1a1a' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#1a1a1a', padding: 0 }}>
                <span style={{ fontSize: 14 }}>🇺🇸</span>
                <span>USD</span>
                <i className="bi bi-chevron-down" style={{ fontSize: 9 }} />
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#1a1a1a', padding: 0 }}>
                <span>English</span>
                <i className="bi bi-chevron-down" style={{ fontSize: 9 }} />
              </button>
            </div>
          </div>
        </div>

        {/* ═══ MAIN NAV ═══ */}
        <nav style={{
          background: location.pathname === '/' && !scrolled ? 'transparent' : '#fff',
          borderBottom: location.pathname === '/' && !scrolled ? 'none' : '1px solid #e8e8e8',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          height: 60,
        }}>

          {/* ── Logo (left) ── */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span style={{
              fontSize: 24, fontWeight: 800,
              letterSpacing: '-1.5px', color: '#1a1a1a',
              fontFamily: "'DM Sans', Inter, sans-serif",
            }}>ecomus</span>
          </Link>

          {/* ── Desktop links (center) ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="nav-links-desktop">

            {/* HOME */}
            <Link to="/" style={navLinkStyle}>Home</Link>

            {/* SHOP — with mega dropdown */}
            <div
              style={{ position: 'relative', height: 60, display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => openMenu('shop')}
              onMouseLeave={closeMenu}
            >
              <Link to="/shop" style={{
                ...navLinkStyle,
                color: activeMenu === 'shop' ? '#555' : '#1a1a1a',
                borderBottom: activeMenu === 'shop' ? '2px solid #1a1a1a' : '2px solid transparent',
              }}>
                Shop <i className="bi bi-chevron-down" style={{ fontSize: 9 }} />
              </Link>

              {/* MEGA MENU */}
              {activeMenu === 'shop' && (
                <div
                  onMouseEnter={() => openMenu('shop')}
                  onMouseLeave={closeMenu}
                  style={{
                    position: 'absolute', top: 60, left: '50%',
                    transform: 'translateX(-45%)',
                    background: '#fff',
                    border: '1px solid #e8e8e8',
                    borderTop: 'none',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                    display: 'flex', gap: 0,
                    zIndex: 500,
                    minWidth: 760,
                    animation: 'fadeDown 0.18s ease',
                  }}
                >
                  {/* 3 link columns */}
                  <div style={{ display: 'flex', padding: '28px 28px', gap: 40, flex: 1 }}>
                    {shopMegaData.columns.map(col => (
                      <div key={col.heading} style={{ minWidth: 140 }}>
                        <div style={{
                          fontSize: 11, fontWeight: 700,
                          letterSpacing: 1.2, color: '#1a1a1a',
                          textTransform: 'uppercase', marginBottom: 16,
                          borderBottom: '1px solid #f0f0f0', paddingBottom: 8,
                        }}>
                          {col.heading}
                        </div>
                        {col.links.map(label => (
                          <Link
                            key={label}
                            to="/shop"
                            style={{
                              display: 'block', fontSize: 13, color: '#555',
                              textDecoration: 'none', marginBottom: 10, lineHeight: 1.4,
                              transition: 'color 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                            onMouseLeave={e => e.currentTarget.style.color = '#555'}
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* 2 editorial images */}
                  <div style={{ display: 'flex', gap: 15, padding: '20px 20px 20px 0', flexShrink: 0, width: 560 }}>
                    {shopMegaData.images.map(ed => (
                      <Link
                        key={ed.label}
                        to={ed.to}
                        style={{ position: 'relative', display: 'block', flex: 1, textDecoration: 'none', overflow: 'hidden', borderRadius: 6 }}
                      >
                        <img
                          src={ed.img}
                          alt={ed.label}
                          style={{
                            width: '100%', height: '100%',
                            minHeight: 340,
                            objectFit: 'cover', objectPosition: 'top center',
                            display: 'block',
                            transition: 'transform 0.4s ease',
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          onError={e => { e.target.style.background = '#f5f5f5'; }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 20, left: '50%', transform: 'translateX(-50%)',
                          background: '#fff',
                          padding: '10px 0',
                          width: '75%', // button width
                          textAlign: 'center',
                          fontSize: 14, fontWeight: 600, color: '#1a1a1a',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          transition: 'background 0.3s, color 0.3s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1a1a1a'; }}
                        >
                          {ed.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PRODUCTS */}
            <div
              style={{ position: 'relative', height: 60, display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => openMenu('products')}
              onMouseLeave={closeMenu}
            >
              <span style={{ ...navLinkStyle, cursor: 'pointer', color: activeMenu === 'products' ? '#555' : '#1a1a1a' }}>
                Products <i className="bi bi-chevron-down" style={{ fontSize: 9 }} />
              </span>
              {activeMenu === 'products' && (
                <SimpleDropdown
                  items={simpleMenus.Products}
                  onEnter={() => openMenu('products')}
                  onLeave={closeMenu}
                />
              )}
            </div>

            {/* PAGES */}
            <div
              style={{ position: 'relative', height: 60, display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => openMenu('pages')}
              onMouseLeave={closeMenu}
            >
              <span style={{ ...navLinkStyle, cursor: 'pointer', color: activeMenu === 'pages' ? '#555' : '#1a1a1a' }}>
                Pages <i className="bi bi-chevron-down" style={{ fontSize: 9 }} />
              </span>
              {activeMenu === 'pages' && (
                <SimpleDropdown
                  items={simpleMenus.Pages}
                  onEnter={() => openMenu('pages')}
                  onLeave={closeMenu}
                />
              )}
            </div>

            {/* BLOG */}
            <div
              style={{ position: 'relative', height: 60, display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => openMenu('blog')}
              onMouseLeave={closeMenu}
            >
              <Link to="/blog" style={{ ...navLinkStyle, color: activeMenu === 'blog' ? '#555' : '#1a1a1a' }}>
                Blog <i className="bi bi-chevron-down" style={{ fontSize: 9 }} />
              </Link>
              {activeMenu === 'blog' && (
                <SimpleDropdown
                  items={simpleMenus.Blog}
                  onEnter={() => openMenu('blog')}
                  onLeave={closeMenu}
                />
              )}
            </div>

            {/* BUY NOW */}
            <Link to="/shop" style={{ ...navLinkStyle, color: '#db4444', fontWeight: 600 }}>
              Buy now
            </Link>
          </div>

          {/* ── Right icons ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            <IconBtn onClick={onSearchOpen} title="Search">
              <i className="bi bi-search" style={{ fontSize: 17 }} />
            </IconBtn>
            <IconBtn as={Link} to="/account" title="Account">
              <i className="bi bi-person" style={{ fontSize: 18 }} />
            </IconBtn>
            <IconBtn as={Link} to="/wishlist" title="Wishlist" badge={wishlistCount}>
              <i className="bi bi-heart" style={{ fontSize: 17 }} />
            </IconBtn>
            <IconBtn onClick={() => setIsCartOpen(true)} title="Cart" badge={cartCount} badgeColor="#db4444">
              <i className="bi bi-bag" style={{ fontSize: 17 }} />
            </IconBtn>

            {/* Hamburger — mobile only */}
            <button
              className="hamburger-mobile"
              onClick={() => setMobileOpen(o => !o)}
              style={{ display: 'none', ...iconBtnBase, marginLeft: 4 }}
            >
              <i className={`bi bi-${mobileOpen ? 'x' : 'list'}`} style={{ fontSize: 22 }} />
            </button>
          </div>
        </div>
      </nav>
      </div>{/* end sticky wrapper */}

      {/* ═══ MOBILE MENU ═══ */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1098 }}
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 300,
        background: '#fff', zIndex: 1099,
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        overflowY: 'auto',
        boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-1px' }}>ecomus</span>
          <button onClick={() => setMobileOpen(false)} style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        </div>
        {[
          { label: 'Home', to: '/' },
          { label: 'Shop', to: '/shop', sub: [['Men', '/shop/men'], ['Women', '/shop/women']] },
          { label: 'Products', to: '/shop', sub: simpleMenus.Products },
          { label: 'Pages', to: '/contact', sub: simpleMenus.Pages },
          { label: 'Blog', to: '/blog', sub: simpleMenus.Blog },
          { label: 'Buy now', to: '/shop' },
        ].map(item => (
          <div key={item.label}>
            <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
              <Link to={item.to} onClick={() => setMobileOpen(false)}
                style={{ flex: 1, padding: '14px 20px', fontSize: 14, color: '#1a1a1a', textDecoration: 'none', fontWeight: 500 }}>
                {item.label}
              </Link>
              {item.sub && (
                <button onClick={() => setMobileSub(s => s === item.label ? null : item.label)}
                  style={{ padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <i className={`bi bi-chevron-${mobileSub === item.label ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
                </button>
              )}
            </div>
            {mobileSub === item.label && item.sub && (
              <div style={{ background: '#f9f9f9' }}>
                {item.sub.map(([label, href]) => (
                  <Link key={label} to={href} onClick={() => setMobileOpen(false)}
                    style={{ display: 'block', padding: '10px 32px', fontSize: 13, color: '#555', borderBottom: '1px solid #f0f0f0', textDecoration: 'none' }}>
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateX(-45%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-45%) translateY(0); }
        }
        @media (max-width: 991px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
};

/* ── Shared icon button ── */
const iconBtnBase = {
  width: 38, height: 38, background: 'transparent', border: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#1a1a1a', borderRadius: 4,
  textDecoration: 'none', position: 'relative',
};
const IconBtn = ({ children, onClick, title, badge, badgeColor = '#db4444', as: Tag = 'button', to }) => {
  const props = Tag === Link ? { to } : { onClick };
  return (
    <Tag {...props} title={title} style={iconBtnBase}>
      {children}
      {badge > 0 && (
        <span style={{
          position: 'absolute', top: 4, right: 4,
          width: 16, height: 16, borderRadius: '50%',
          background: badgeColor, color: '#fff',
          fontSize: 9, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{badge}</span>
      )}
    </Tag>
  );
};

/* ── Simple dropdown ── */
const SimpleDropdown = ({ items, onEnter, onLeave }) => (
  <div
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    style={{
      position: 'absolute', top: 60, left: 0,
      background: '#fff',
      border: '1px solid #e8e8e8',
      borderTop: 'none',
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      minWidth: 200, zIndex: 500,
      animation: 'fadeDown 0.18s ease',
      padding: '6px 0',
    }}
  >
    {items.map(([label, href]) => (
      <Link key={label} to={href}
        style={{ display: 'block', padding: '10px 20px', fontSize: 13, color: '#555', textDecoration: 'none', transition: 'color 0.15s, background 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.background = '#f8f8f8'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.background = 'transparent'; }}
      >
        {label}
      </Link>
    ))}
  </div>
);

const navLinkStyle = {
  display: 'flex', alignItems: 'center', gap: 4,
  padding: '0 14px', height: 60,
  fontSize: 14, fontWeight: 500, color: '#1a1a1a',
  textDecoration: 'none',
  borderBottom: '2px solid transparent',
  whiteSpace: 'nowrap', transition: 'color 0.2s',
};

export default Navbar;
