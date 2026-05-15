import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import QuickViewModal from '../components/QuickViewModal';

const CDN = 'https://themesflat.co/html/ecomus/images';

const womenProducts = [
  {
    id: 'w1', name: 'Ribbed Tank Top', price: 16.95,
    desc: "Button-up shirt sleeves and a relaxed silhouette. It's tailored with drapey, crinkle-texture fabric that's made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces...",
    image: `${CDN}/products/orange-1.jpg`, hoverImage: `${CDN}/products/white-1.jpg`,
    colors: [{ hex: '#e8651a', name: 'Orange' }, { hex: '#1a1a1a', name: 'Black' }, { hex: '#ffffff', name: 'White' }],
    sizes: ['S', 'M', 'L', 'XL'], badge: null,
  },
  {
    id: 'w2', name: 'Ribbed modal T-shirt', price: 12.95,
    desc: 'A soft ribbed T-shirt in modal fabric. Features a classic crew neck and relaxed fit perfect for everyday wear.',
    image: `${CDN}/products/brown.jpg`, hoverImage: `${CDN}/products/purple.jpg`,
    colors: [{ hex: '#c4a882', name: 'Brown' }, { hex: '#8b5cf6', name: 'Purple' }, { hex: '#22c55e', name: 'Green' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'], badge: '-33%',
  },
  {
    id: 'w3', name: 'Oversized Printed T-shirt', price: 22.95,
    desc: 'Drop-shoulder oversized tee with a bold graphic print. Made from 100% organic cotton for all-day comfort.',
    image: `${CDN}/products/white-3.jpg`, hoverImage: `${CDN}/products/white-4.jpg`,
    colors: [{ hex: '#ffffff', name: 'White' }],
    sizes: ['S', 'M', 'L', 'XL'], badge: null,
  },
  {
    id: 'w4', name: 'Oversized Printed T-shirt', price: 22.95,
    desc: 'Drop-shoulder oversized tee with a bold graphic print. Made from 100% organic cotton for all-day comfort.',
    image: `${CDN}/products/white-2.jpg`, hoverImage: `${CDN}/products/pink-1.jpg`,
    colors: [{ hex: '#ffffff', name: 'White' }, { hex: '#f8c8d4', name: 'Pink' }, { hex: '#1a1a1a', name: 'Black' }],
    sizes: ['S', 'M', 'L', 'XL'], badge: null,
  },
  {
    id: 'w5', name: 'V-neck linen T-shirt', price: 114.95,
    desc: 'A lightweight V-neck T-shirt crafted from breathable linen. Easy, breezy and perfect for warm days.',
    image: `${CDN}/products/brown-2.jpg`, hoverImage: `${CDN}/products/brown-3.jpg`,
    colors: [{ hex: '#c4854a', name: 'Brown' }, { hex: '#ffffff', name: 'White' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'], badge: null,
  },
  {
    id: 'w6', name: 'Loose Fit Sweatshirt', price: 10.00,
    desc: 'A relaxed fit sweatshirt in soft fleece fabric. Features a crew neck and dropped shoulders for an effortless look.',
    image: `${CDN}/products/light-green-1.jpg`, hoverImage: `${CDN}/products/light-green-2.jpg`,
    colors: [{ hex: '#b2d8b2', name: 'Light Green' }, { hex: '#1a1a1a', name: 'Black' }, { hex: '#2c5f8a', name: 'Blue' }, { hex: '#d0d8e4', name: 'Light Grey' }],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: null,
  },
  {
    id: 'w7', name: 'Relaxed Fit Knit Top', price: 18.95,
    desc: 'A relaxed knit top in a soft, breathable fabric. Features a round neck and relaxed silhouette.',
    image: `${CDN}/products/grey-2.jpg`, hoverImage: `${CDN}/products/grey.jpg`,
    colors: [{ hex: '#999', name: 'Grey' }, { hex: '#f8c8d4', name: 'Pink' }, { hex: '#fadadd', name: 'Light Pink' }],
    sizes: ['S', 'M', 'L'], badge: null,
  },
  {
    id: 'w8', name: 'Classic Crew Neck Sweater', price: 24.95,
    desc: 'A classic crew neck sweater in a soft knit fabric. Timeless and versatile for any occasion.',
    image: `${CDN}/products/black-11.jpg`, hoverImage: `${CDN}/products/black-12.jpg`,
    colors: [{ hex: '#1a1a1a', name: 'Black' }],
    sizes: ['XS', 'S', 'M', 'L'], badge: null,
  },
];

const PAGE_SIZE = 8;

// Grid view configs: [mode, icon, cols]
const VIEW_MODES = [
  { mode: 'list', icon: 'bi-view-list',        cols: 1 },
  { mode: 2,      icon: 'bi-grid',              cols: 2 },
  { mode: 3,      icon: 'bi-grid-3x2',          cols: 3 },
  { mode: 4,      icon: 'bi-grid-3x3-gap-fill', cols: 4 },
  { mode: 5,      icon: 'bi-grid-fill',         cols: 5 },
  { mode: 6,      icon: 'bi-grid-3x3',          cols: 6 },
];

/* ── LIST ROW — image left, details right ── */
const ListRow = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const inWish = isInWishlist(product.id);

  return (
    <div style={{
      display: 'flex', gap: 28,
      padding: '24px 0',
      borderBottom: '1px solid #f0f0f0',
    }}>
      {/* Image */}
      <Link to={`/product/${product.id}`}
        style={{ flexShrink: 0, textDecoration: 'none', display: 'block', width: 240 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, background: '#f5f5f5', aspectRatio: '3/4' }}>
          {product.badge && (
            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 5, background: '#db4444', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '3px 10px' }}>{product.badge}</div>
          )}
          <img src={product.image} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: hovered && product.hoverImage ? 0 : 1, transition: 'opacity 0.4s' }} />
          {product.hoverImage && (
            <img src={product.hoverImage} alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />
          )}
        </div>
      </Link>

      {/* Details */}
      <div style={{ flex: 1, paddingTop: 8 }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{product.name}</div>
        </Link>
        <div style={{ fontSize: 16, color: '#1a1a1a', fontWeight: 600, marginBottom: 12 }}>
          ${product.price.toFixed(2)}
        </div>
        {product.desc && (
          <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7, marginBottom: 16, maxWidth: 560 }}>
            {product.desc}
          </p>
        )}

        {/* Color swatches */}
        {product.colors?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 14 }}>
            {product.colors.map((c, i) => (
              <div key={i} title={c.name} style={{
                width: 20, height: 20, borderRadius: '50%',
                background: c.hex,
                border: (c.hex === '#ffffff' || c.hex === '#fff') ? '1.5px solid #ccc' : 'none',
                outline: i === 0 ? '2px solid #1a1a1a' : 'none',
                outlineOffset: 2, cursor: 'pointer',
              }} />
            ))}
          </div>
        )}

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {product.sizes.map(sz => (
              <button key={sz} onClick={() => setSelectedSize(sz)} style={{
                minWidth: 36, height: 34, borderRadius: 4, padding: '0 8px',
                border: selectedSize === sz ? '1.5px solid #1a1a1a' : '1px solid #ddd',
                background: selectedSize === sz ? '#1a1a1a' : '#fff',
                color: selectedSize === sz ? '#fff' : '#1a1a1a',
                fontSize: 13, fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.15s',
              }}>{sz}</button>
            ))}
          </div>
        )}

        {/* Action icons */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { icon: added ? 'bi-check-lg' : 'bi-bag', title: 'Add to Cart', fn: () => { addToCart({ ...product, size: selectedSize }); setAdded(true); setTimeout(() => setAdded(false), 1500); }, active: added },
            { icon: inWish ? 'bi-heart-fill' : 'bi-heart', title: 'Wishlist', fn: () => toggleWishlist(product), active: inWish },
            { icon: 'bi-arrow-left-right', title: 'Compare', fn: () => {} },
            { icon: 'bi-eye', title: 'Quick View', fn: () => onQuickView?.(product) },
          ].map(({ icon, title, fn, active }) => (
            <button key={title} onClick={fn} title={title} style={{
              width: 40, height: 40, borderRadius: 4,
              border: '1.5px solid #e0e0e0', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, cursor: 'pointer',
              color: active ? '#db4444' : '#1a1a1a',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = active ? '#db4444' : '#1a1a1a'; }}
            >
              <i className={`bi ${icon}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── GRID CARD ── */
const GridCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const inWish = isInWishlist(product.id);
  const hasSizes = product.sizes?.length > 0;

  const handleCart  = e => { e.preventDefault(); addToCart({ ...product, size: selectedSize }); setAdded(true); setTimeout(() => setAdded(false), 1500); };
  const handleWish  = e => { e.preventDefault(); toggleWishlist(product); };
  const handleQuick = e => { e.preventDefault(); onQuickView?.(product); };

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setTooltip(null); }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, background: '#f5f5f5', aspectRatio: '3/4', marginBottom: 12 }}>
        {product.badge && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 5, background: '#db4444', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '3px 10px' }}>{product.badge}</div>
        )}
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: hovered && product.hoverImage ? 0 : 1, transition: 'opacity 0.4s' }} />
        {product.hoverImage && (
          <img src={product.hoverImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />
        )}
        {/* Icon pill */}
        <div style={{ position: 'absolute', bottom: hovered ? (hasSizes ? 48 : 12) : 18, left: '50%', transform: 'translateX(-50%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s, bottom 0.3s', display: 'flex', background: '#fff', borderRadius: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 10, whiteSpace: 'nowrap', pointerEvents: hovered ? 'auto' : 'none' }}>
          {[{ icon: added ? 'bi-check-lg' : 'bi-bag-plus', fn: handleCart, active: added }, { icon: inWish ? 'bi-heart-fill' : 'bi-heart', fn: handleWish, active: inWish }, { icon: 'bi-arrow-left-right', fn: e => e.preventDefault() }, { icon: 'bi-eye', fn: handleQuick }].map(({ icon, fn, active }, i) => (
            <button key={i} onClick={fn} style={{ width: 40, height: 40, background: 'transparent', border: 'none', borderLeft: i > 0 ? '1px solid #f0f0f0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer', color: active ? '#db4444' : '#1a1a1a' }}>
              <i className={`bi ${icon}`} />
            </button>
          ))}
        </div>
        {/* Size strip */}
        {hasSizes && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '8px 12px', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s', zIndex: 9 }}>
            {product.sizes.map(sz => (
              <button key={sz} onClick={e => { e.preventDefault(); setSelectedSize(sz); }} style={{ minWidth: 32, height: 30, borderRadius: 4, border: selectedSize === sz ? '1.5px solid #1a1a1a' : '1px solid #ddd', background: selectedSize === sz ? '#1a1a1a' : '#fff', color: selectedSize === sz ? '#fff' : '#1a1a1a', fontSize: 12, fontWeight: 500, cursor: 'pointer', padding: '0 6px' }}>{sz}</button>
            ))}
          </div>
        )}
      </div>
      <div>
        <div style={{ fontSize: 14, color: '#1a1a1a', marginBottom: 3, lineHeight: 1.45 }}>{product.name}</div>
        <div style={{ fontSize: 14, color: '#1a1a1a', marginBottom: 7 }}>${product.price.toFixed(2)}</div>
        {product.colors?.length > 0 && (
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {product.colors.map((c, i) => (
              <div key={i} style={{ position: 'relative' }} onMouseEnter={() => setTooltip(i)} onMouseLeave={() => setTooltip(null)}>
                <div onClick={e => e.preventDefault()} style={{ width: 16, height: 16, borderRadius: '50%', background: c.hex, border: (c.hex === '#ffffff' || c.hex === '#fff') ? '1.5px solid #ccc' : 'none', outline: i === 0 ? '1.5px solid #1a1a1a' : 'none', outlineOffset: 2, cursor: 'pointer' }} />
                {tooltip === i && (<div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', background: '#1a1a1a', color: '#fff', fontSize: 11, padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap', zIndex: 20, pointerEvents: 'none' }}>{c.name}</div>)}
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

/* ═══ MAIN PAGE ═══ */
const ShopWomen = () => {
  const [quickView, setQuickView] = useState(null);
  const [sort, setSort]           = useState('featured');
  const [page, setPage]           = useState(1);
  const [viewMode, setViewMode]   = useState(4); // 'list' | 2 | 3 | 4 | 5 | 6

  const sorted = useMemo(() => {
    const list = [...womenProducts];
    if (sort === 'price-low')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    return list;
  }, [sort]);

  const paginated  = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  const handleViewChange = (mode) => { setViewMode(mode); setPage(1); };

  return (
    <div>
      {/* Hero */}
      <div style={{ background: '#fdf6f0', textAlign: 'center', padding: '50px 20px 60px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#1a1a1a', marginBottom: 10 }}>Women</h1>
        <p style={{ fontSize: 14, margin: 0 }}>
          Shop through{' '}<span style={{ color: '#3b8fa3' }}>our</span>{' '}latest selection of Women
        </p>
      </div>

      {/* Toolbar */}
      <div style={{ borderBottom: '1px solid #e8e8e8', padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1280, margin: '0 auto' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>
          <i className="bi bi-sliders" /> FILTER
        </button>

        {/* Grid toggles */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {VIEW_MODES.map(({ mode, icon }) => (
            <button key={mode} onClick={() => handleViewChange(mode)} title={mode === 'list' ? 'List' : `${mode} columns`}
              style={{
                width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer',
                color: viewMode === mode ? '#1a1a1a' : '#bbb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, borderRadius: 4,
                transition: 'color 0.2s',
              }}>
              <i className={`bi ${icon}`} />
            </button>
          ))}
        </div>

        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, color: '#1a1a1a', background: '#fff', cursor: 'pointer', outline: 'none', minWidth: 160 }}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Products */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 40px 60px' }}>
        {viewMode === 'list' ? (
          /* LIST VIEW */
          <div style={{ marginBottom: 40 }}>
            {paginated.map(p => <ListRow key={p.id} product={p} onQuickView={setQuickView} />)}
          </div>
        ) : (
          /* GRID VIEW */
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${viewMode}, 1fr)`,
            gap: viewMode >= 5 ? 12 : 20,
            marginBottom: 40,
          }}>
            {paginated.map(p => <GridCard key={p.id} product={p} onQuickView={setQuickView} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} style={{ width: 38, height: 38, borderRadius: 4, border: '1.5px solid', borderColor: page === n ? '#1a1a1a' : '#e0e0e0', background: page === n ? '#1a1a1a' : '#fff', color: page === n ? '#fff' : '#1a1a1a', fontSize: 14, fontWeight: page === n ? 700 : 400, cursor: 'pointer' }}>{n}</button>
            ))}
            {page < totalPages && (
              <button onClick={() => setPage(p => p + 1)} style={{ width: 38, height: 38, borderRadius: 4, border: '1.5px solid #e0e0e0', background: '#fff', color: '#1a1a1a', fontSize: 14, cursor: 'pointer' }}>›</button>
            )}
          </div>
        )}
      </div>

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
};

export default ShopWomen;
