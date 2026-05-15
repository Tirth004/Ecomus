import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import QuickViewModal from '../components/QuickViewModal';

const CDN = 'https://themesflat.co/html/ecomus/images';

const menProducts = [
  { id: 'm1', name: 'V-neck linen T-shirt', price: 114.95, desc: 'A lightweight V-neck T-shirt crafted from breathable linen. Easy, breezy and perfect for warm days.', image: `${CDN}/products/brown-2.jpg`, hoverImage: `${CDN}/products/brown-3.jpg`, colors: [{ hex: '#c4854a', name: 'Brown' }, { hex: '#ffffff', name: 'White' }], sizes: ['XS', 'S', 'M', 'L', 'XL'], badge: null },
  { id: 'm2', name: 'Loose Fit Sweatshirt', price: 10.00, desc: 'A relaxed fit sweatshirt in soft fleece. Features a crew neck and dropped shoulders for an effortless look.', image: `${CDN}/products/light-green-1.jpg`, hoverImage: `${CDN}/products/light-green-2.jpg`, colors: [{ hex: '#b2d8b2', name: 'Light Green' }, { hex: '#1a1a1a', name: 'Black' }, { hex: '#2c5f8a', name: 'Blue' }, { hex: '#1e3a6e', name: 'Dark Blue' }, { hex: '#d0d8e4', name: 'Light Grey' }], sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: '-33%' },
  { id: 'm3', name: 'Regular Fit Oxford Shirt', price: 10.00, desc: 'A classic regular fit Oxford shirt in a soft, breathable cotton blend. Perfect for smart casual looks.', image: `${CDN}/products/black-4.jpg`, hoverImage: `${CDN}/products/black-5.jpg`, colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#1e3a6e', name: 'Dark Blue' }, { hex: '#c4a882', name: 'Beige' }, { hex: '#b0d0e0', name: 'Light Blue' }], sizes: ['S', 'M', 'L'], badge: null },
  { id: 'm4', name: 'Loose Fit Hoodie', price: 9.95, desc: 'A comfortable loose fit hoodie in a soft fleece fabric. Features a kangaroo pocket and drawstring hood.', image: `${CDN}/products/white-8.jpg`, hoverImage: `${CDN}/products/black-6.jpg`, colors: [{ hex: '#ffffff', name: 'White' }, { hex: '#1a1a1a', name: 'Black' }, { hex: '#b0d0e0', name: 'Light Blue' }], sizes: ['XS', 'S', 'M', 'L', 'XL'], badge: null },
  { id: 'm5', name: 'Patterned scarf', price: 14.95, desc: 'A warm patterned scarf in a soft knit fabric. Features a classic stripe pattern.', image: `${CDN}/products/brown-4.jpg`, hoverImage: `${CDN}/products/black-8.jpg`, colors: [{ hex: '#c4a882', name: 'Brown' }, { hex: '#1a1a1a', name: 'Black' }], sizes: ['M', 'L', 'XL'], badge: null },
  { id: 'm6', name: 'Slim Fit Fine-knit Turtleneck Sweater', price: 18.95, desc: 'A slim fit fine-knit turtleneck sweater in a soft ribbed fabric. Elegant and versatile.', image: `${CDN}/products/white-8.jpg`, hoverImage: `${CDN}/products/black-6.jpg`, colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#ffffff', name: 'White' }], sizes: ['S', 'M', 'L', 'XL'], badge: null },
  { id: 'm7', name: 'Slim Fit Fine-knit Turtleneck Sweater', price: 18.95, desc: 'A slim fit fine-knit turtleneck sweater in soft ribbed fabric. Elegant and versatile.', image: `${CDN}/products/grey-2.jpg`, hoverImage: `${CDN}/products/grey.jpg`, colors: [{ hex: '#d0d8e4', name: 'Light Grey' }, { hex: '#f8c8d4', name: 'Pink' }, { hex: '#fadadd', name: 'Light Pink' }], sizes: ['S', 'M', 'L'], badge: null },
  { id: 'm8', name: 'Slim Fit Fine-knit Turtleneck Sweater', price: 18.95, desc: 'A slim fit fine-knit turtleneck sweater. Timeless wardrobe staple for all seasons.', image: `${CDN}/products/black-9.jpg`, hoverImage: `${CDN}/products/black-10.jpg`, colors: [{ hex: '#1a1a1a', name: 'Black' }], sizes: ['S', 'M', 'L', 'XL'], badge: null },
];

const PAGE_SIZE = 8;

const VIEW_MODES = [
  { mode: 'list', icon: 'bi-view-list' },
  { mode: 2,      icon: 'bi-grid' },
  { mode: 3,      icon: 'bi-grid-3x2' },
  { mode: 4,      icon: 'bi-grid-3x3-gap-fill' },
  { mode: 5,      icon: 'bi-grid-fill' },
  { mode: 6,      icon: 'bi-grid-3x3' },
];

/* ── LIST ROW ── */
const ListRow = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const inWish = isInWishlist(product.id);

  return (
    <div style={{ display: 'flex', gap: 28, padding: '24px 0', borderBottom: '1px solid #f0f0f0' }}>
      <Link to={`/product/${product.id}`} style={{ flexShrink: 0, textDecoration: 'none', width: 240 }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, background: '#f5f5f5', aspectRatio: '3/4' }}>
          {product.badge && <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 5, background: '#db4444', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '3px 10px' }}>{product.badge}</div>}
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: hovered ? 0 : 1, transition: 'opacity 0.4s' }} />
          {product.hoverImage && <img src={product.hoverImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />}
        </div>
      </Link>
      <div style={{ flex: 1, paddingTop: 8 }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{product.name}</div>
        </Link>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>${product.price.toFixed(2)}</div>
        {product.desc && <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7, marginBottom: 16, maxWidth: 560 }}>{product.desc}</p>}
        {product.colors?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {product.colors.map((c, i) => (
              <div key={i} title={c.name} style={{ width: 20, height: 20, borderRadius: '50%', background: c.hex, border: c.hex === '#ffffff' ? '1.5px solid #ccc' : 'none', outline: i === 0 ? '2px solid #1a1a1a' : 'none', outlineOffset: 2, cursor: 'pointer' }} />
            ))}
          </div>
        )}
        {product.sizes?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {product.sizes.map(sz => (
              <button key={sz} onClick={() => setSelectedSize(sz)} style={{ minWidth: 36, height: 34, borderRadius: 4, padding: '0 8px', border: selectedSize === sz ? '1.5px solid #1a1a1a' : '1px solid #ddd', background: selectedSize === sz ? '#1a1a1a' : '#fff', color: selectedSize === sz ? '#fff' : '#1a1a1a', fontSize: 13, cursor: 'pointer' }}>{sz}</button>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { icon: added ? 'bi-check-lg' : 'bi-bag', title: 'Add to Cart', fn: () => { addToCart({ ...product, size: selectedSize }); setAdded(true); setTimeout(() => setAdded(false), 1500); }, active: added },
            { icon: inWish ? 'bi-heart-fill' : 'bi-heart', title: 'Wishlist', fn: () => toggleWishlist(product), active: inWish },
            { icon: 'bi-arrow-left-right', title: 'Compare', fn: () => {} },
            { icon: 'bi-eye', title: 'Quick View', fn: () => onQuickView?.(product) },
          ].map(({ icon, title, fn, active }) => (
            <button key={title} onClick={fn} title={title}
              style={{ width: 40, height: 40, borderRadius: 4, border: '1.5px solid #e0e0e0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer', color: active ? '#db4444' : '#1a1a1a', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = active ? '#db4444' : '#1a1a1a'; }}>
              <i className={`bi ${icon}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── GRID CARD ── */
const MenCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const inWish = isInWishlist(product.id);
  const hasSizes = product.sizes?.length > 0;

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setTooltip(null); }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, background: '#f5f5f5', aspectRatio: '3/4', marginBottom: 12 }}>
        {product.badge && <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 5, background: '#db4444', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 20, padding: '3px 10px' }}>{product.badge}</div>}
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: hovered && product.hoverImage ? 0 : 1, transition: 'opacity 0.4s' }} />
        {product.hoverImage && <img src={product.hoverImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />}
        <div style={{ position: 'absolute', bottom: hovered ? (hasSizes ? 48 : 12) : 18, left: '50%', transform: 'translateX(-50%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s, bottom 0.3s', display: 'flex', background: '#fff', borderRadius: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', overflow: 'hidden', zIndex: 10, pointerEvents: hovered ? 'auto' : 'none' }}>
          {[{ icon: added ? 'bi-check-lg' : 'bi-bag-plus', fn: e => { e.preventDefault(); addToCart({ ...product, size: selectedSize }); setAdded(true); setTimeout(() => setAdded(false), 1500); }, active: added }, { icon: inWish ? 'bi-heart-fill' : 'bi-heart', fn: e => { e.preventDefault(); toggleWishlist(product); }, active: inWish }, { icon: 'bi-arrow-left-right', fn: e => e.preventDefault() }, { icon: 'bi-eye', fn: e => { e.preventDefault(); onQuickView?.(product); } }].map(({ icon, fn, active }, i) => (
            <button key={i} onClick={fn} style={{ width: 40, height: 40, background: 'transparent', border: 'none', borderLeft: i > 0 ? '1px solid #f0f0f0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer', color: active ? '#db4444' : '#1a1a1a' }}><i className={`bi ${icon}`} /></button>
          ))}
        </div>
        {hasSizes && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '8px 12px', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s', zIndex: 9 }}>
          {product.sizes.map(sz => <button key={sz} onClick={e => { e.preventDefault(); setSelectedSize(sz); }} style={{ minWidth: 32, height: 30, borderRadius: 4, border: selectedSize === sz ? '1.5px solid #1a1a1a' : '1px solid #ddd', background: selectedSize === sz ? '#1a1a1a' : '#fff', color: selectedSize === sz ? '#fff' : '#1a1a1a', fontSize: 12, cursor: 'pointer', padding: '0 6px' }}>{sz}</button>)}
        </div>}
      </div>
      <div style={{ fontSize: 14, color: '#1a1a1a', marginBottom: 3 }}>{product.name}</div>
      <div style={{ fontSize: 14, color: '#1a1a1a', marginBottom: 7 }}>${product.price.toFixed(2)}</div>
      {product.colors?.length > 0 && (
        <div style={{ display: 'flex', gap: 5 }}>
          {product.colors.map((c, i) => (
            <div key={i} style={{ position: 'relative' }} onMouseEnter={() => setTooltip(i)} onMouseLeave={() => setTooltip(null)}>
              <div onClick={e => e.preventDefault()} style={{ width: 16, height: 16, borderRadius: '50%', background: c.hex, border: c.hex === '#ffffff' ? '1.5px solid #ccc' : 'none', outline: i === 0 ? '1.5px solid #1a1a1a' : 'none', outlineOffset: 2, cursor: 'pointer' }} />
              {tooltip === i && <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', background: '#1a1a1a', color: '#fff', fontSize: 11, padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap', zIndex: 20, pointerEvents: 'none' }}>{c.name}</div>}
            </div>
          ))}
        </div>
      )}
    </Link>
  );
};

/* ═══ MAIN PAGE ═══ */
const ShopMen = () => {
  const [quickView, setQuickView] = useState(null);
  const [sort, setSort]           = useState('featured');
  const [page, setPage]           = useState(1);
  const [viewMode, setViewMode]   = useState(4);

  const sorted = useMemo(() => {
    const list = [...menProducts];
    if (sort === 'price-low')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    return list;
  }, [sort]);

  const paginated  = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  return (
    <div>
      <div style={{ background: '#fdf6f0', textAlign: 'center', padding: '50px 20px 60px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#1a1a1a', marginBottom: 10 }}>Men</h1>
        <p style={{ fontSize: 14, margin: 0 }}>Shop through <span style={{ color: '#3b8fa3' }}>our</span> latest selection of Men</p>
      </div>

      <div style={{ borderBottom: '1px solid #e8e8e8', padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1280, margin: '0 auto' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}>
          <i className="bi bi-sliders" /> FILTER
        </button>
        <div style={{ display: 'flex', gap: 2 }}>
          {VIEW_MODES.map(({ mode, icon }) => (
            <button key={mode} onClick={() => { setViewMode(mode); setPage(1); }}
              style={{ width: 32, height: 32, background: 'none', border: 'none', cursor: 'pointer', color: viewMode === mode ? '#1a1a1a' : '#bbb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, borderRadius: 4, transition: 'color 0.2s' }}>
              <i className={`bi ${icon}`} />
            </button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ padding: '8px 16px', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, color: '#1a1a1a', background: '#fff', outline: 'none', minWidth: 160 }}>
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 40px 60px' }}>
        {viewMode === 'list' ? (
          <div style={{ marginBottom: 40 }}>
            {paginated.map(p => <ListRow key={p.id} product={p} onQuickView={setQuickView} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${viewMode}, 1fr)`, gap: viewMode >= 5 ? 12 : 20, marginBottom: 40 }}>
            {paginated.map(p => <MenCard key={p.id} product={p} onQuickView={setQuickView} />)}
          </div>
        )}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} style={{ width: 38, height: 38, borderRadius: 4, border: '1.5px solid', borderColor: page === n ? '#1a1a1a' : '#e0e0e0', background: page === n ? '#1a1a1a' : '#fff', color: page === n ? '#fff' : '#1a1a1a', fontSize: 14, cursor: 'pointer' }}>{n}</button>
            ))}
            {page < totalPages && <button onClick={() => setPage(p => p + 1)} style={{ width: 38, height: 38, borderRadius: 4, border: '1.5px solid #e0e0e0', background: '#fff', color: '#1a1a1a', fontSize: 14, cursor: 'pointer' }}>›</button>}
          </div>
        )}
      </div>
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
};

export default ShopMen;
