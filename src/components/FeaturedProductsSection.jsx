import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const CDN = 'https://themesflat.co/html/ecomus/images';

// Products matching the reference screenshot exactly
export const initialProducts = [
  {
    id: 101,
    name: 'V-neck linen T-shirt',
    price: 114.95,
    image: `${CDN}/products/brown-2.jpg`,
    hoverImage: `${CDN}/products/brown-3.jpg`,
    colors: [{ hex: '#c4854a', name: 'Brown' }, { hex: '#ffffff', name: 'White' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 102,
    name: 'Loose Fit Sweatshirt',
    price: 10.00,
    image: `${CDN}/products/light-green-1.jpg`,
    hoverImage: `${CDN}/products/light-green-2.jpg`,
    colors: [{ hex: '#b2d8b2', name: 'Light Green' }, { hex: '#1a1a1a', name: 'Black' }, { hex: '#2c5f8a', name: 'Blue' }, { hex: '#1e3a6e', name: 'Dark Blue' }, { hex: '#d0d8e4', name: 'Light Grey' }],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 103,
    name: 'Regular Fit Oxford Shirt',
    price: 10.00,
    image: `${CDN}/products/black-4.jpg`,
    hoverImage: `${CDN}/products/black-5.jpg`,
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#1e3a6e', name: 'Dark Blue' }, { hex: '#c4a882', name: 'Beige' }, { hex: '#b0d0e0', name: 'Light Blue' }, { hex: '#ffffff', name: 'White' }],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 104,
    name: 'Loose Fit Hoodie',
    price: 9.95,
    image: `${CDN}/products/white-8.jpg`,
    hoverImage: `${CDN}/products/black-6.jpg`,
    colors: [{ hex: '#ffffff', name: 'White' }, { hex: '#1a1a1a', name: 'Black' }, { hex: '#b0d0e0', name: 'Light Blue' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
];

// More products revealed when "Load more" is clicked
export const extraProducts = [
  {
    id: 105,
    name: 'Classic Ribbed Tank Top',
    price: 16.95,
    image: `${CDN}/products/brown-4.jpg`,
    hoverImage: `${CDN}/products/black-8.jpg`,
    colors: [{ hex: '#c4a882', name: 'Brown' }, { hex: '#1a1a1a', name: 'Black' }],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 106,
    name: 'Oversized Crew Neck',
    price: 22.95,
    image: `${CDN}/products/black-9.jpg`,
    hoverImage: `${CDN}/products/black-10.jpg`,
    colors: [{ hex: '#1a1a1a', name: 'Black' }, { hex: '#ffffff', name: 'White' }],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 107,
    name: 'Relaxed Fit Knit',
    price: 18.95,
    image: `${CDN}/products/grey-2.jpg`,
    hoverImage: `${CDN}/products/grey.jpg`,
    colors: [{ hex: '#999', name: 'Grey' }, { hex: '#f8c8d4', name: 'Pink' }, { hex: '#fadadd', name: 'Light Pink' }],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 108,
    name: 'Slim Fit Oxford Shirt',
    price: 12.95,
    image: `${CDN}/products/black-11.jpg`,
    hoverImage: `${CDN}/products/black-12.jpg`,
    colors: [{ hex: '#1a1a1a', name: 'Black' }],
    sizes: ['XS', 'S', 'M', 'L'],
  },
];

/* ── Single card ── */
const FeaturedCard = ({ product, onQuickView }) => {
  const { addToCart, setIsCartOpen }     = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [hovered, setHovered]            = useState(false);
  const [selectedSize, setSelectedSize]  = useState(null);
  const [added, setAdded]                = useState(false);
  const [tooltip, setTooltip]            = useState(null);

  const inWish = isInWishlist(product.id);

  const handleCart  = (e) => { e.preventDefault(); addToCart({ ...product, size: selectedSize }); setAdded(true); setIsCartOpen(true); setTimeout(() => setAdded(false), 1500); };
  const handleWish  = (e) => { e.preventDefault(); toggleWishlist(product); };
  const handleQuick = (e) => { e.preventDefault(); onQuickView?.(product); };

  const hasSizes = product.sizes?.length > 0;

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTooltip(null); }}
    >
      {/* Image */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: 8, background: '#f5f5f5',
        aspectRatio: '3/4', marginBottom: 12,
      }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: (hovered && product.hoverImage) ? 0 : 1, transition: 'opacity 0.4s' }} />
        {product.hoverImage && (
          <img src={product.hoverImage} alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />
        )}

        {/* 4 action icons — horizontal white pill */}
        <div style={{
          position: 'absolute',
          bottom: hovered ? (hasSizes ? 50 : 14) : 20,
          left: '50%', transform: 'translateX(-50%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s, bottom 0.3s',
          display: 'flex', background: '#fff',
          borderRadius: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          overflow: 'hidden', zIndex: 10, whiteSpace: 'nowrap',
          pointerEvents: hovered ? 'auto' : 'none',
        }}>
          {[
            { icon: added ? 'bi-check-lg' : 'bi-bag-plus', fn: handleCart,  title: 'Add to Cart', active: added },
            { icon: inWish ? 'bi-heart-fill' : 'bi-heart',  fn: handleWish,  title: 'Wishlist',    active: inWish },
            { icon: 'bi-arrow-left-right',                  fn: (e) => e.preventDefault(), title: 'Compare' },
            { icon: 'bi-eye',                               fn: handleQuick, title: 'Quick View' },
          ].map(({ icon, fn, title, active }, i) => (
            <button key={title} onClick={fn} title={title}
              style={{
                width: 40, height: 40, background: 'transparent', border: 'none',
                borderLeft: i > 0 ? '1px solid #f0f0f0' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, cursor: 'pointer', color: active ? '#db4444' : '#1a1a1a',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <i className={`bi ${icon}`} />
            </button>
          ))}
        </div>

        {/* Size selector — slides up */}
        {hasSizes && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(255,255,255,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 4, padding: '8px 12px',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s', zIndex: 9,
          }}>
            {product.sizes.map(sz => (
              <button key={sz} onClick={(e) => { e.preventDefault(); setSelectedSize(sz); }}
                style={{
                  minWidth: 32, height: 30, borderRadius: 4,
                  border: selectedSize === sz ? '1.5px solid #1a1a1a' : '1px solid #ddd',
                  background: selectedSize === sz ? '#1a1a1a' : '#fff',
                  color: selectedSize === sz ? '#fff' : '#1a1a1a',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer', padding: '0 6px',
                  transition: 'all 0.15s',
                }}>
                {sz}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info — name, price, THEN swatches */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 400, color: '#1a1a1a', marginBottom: 3, lineHeight: 1.45 }}>
          {product.name}
        </div>
        <div style={{ fontSize: 14, color: '#1a1a1a', marginBottom: 7 }}>
          ${product.price.toFixed(2)}
        </div>
        {/* Color swatches below price with tooltip */}
        {product.colors?.length > 0 && (
          <div style={{ display: 'flex', gap: 5, alignItems: 'center', position: 'relative' }}>
            {product.colors.map((c, i) => {
              const hex = typeof c === 'object' ? c.hex : c;
              const name = typeof c === 'object' ? c.name : '';
              const isSelected = i === 0;
              return (
                <div key={i} style={{ position: 'relative' }}
                  onMouseEnter={() => setTooltip(i)}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <div
                    onClick={e => e.preventDefault()}
                    style={{
                      width: 16, height: 16, borderRadius: '50%', background: hex,
                      border: (hex === '#ffffff' || hex === '#fff') ? '1.5px solid #ccc' : 'none',
                      outline: isSelected ? '1.5px solid #1a1a1a' : 'none',
                      outlineOffset: 2, cursor: 'pointer',
                    }}
                  />
                  {tooltip === i && name && (
                    <div style={{
                      position: 'absolute', bottom: 22, left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#1a1a1a', color: '#fff',
                      fontSize: 11, padding: '3px 8px',
                      borderRadius: 4, whiteSpace: 'nowrap', zIndex: 20,
                      pointerEvents: 'none',
                    }}>{name}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
};

/* ── Featured Products Section ── */
const FeaturedProductsSection = () => {
  const [showMore, setShowMore]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [quickView, setQuickView] = useState(null);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => { setShowMore(true); setLoading(false); }, 600);
  };

  const displayed = showMore ? [...initialProducts, ...extraProducts] : initialProducts;

  return (
    <section style={{ padding: '0 0 60px' }}>
      <div className="container">
        {/* Product grid */}
        <div className="product-grid-custom" style={{ marginBottom: 40 }}>
          {displayed.map(p => (
            <FeaturedCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>

        {/* Load more button */}
        {!showMore && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleLoadMore}
              disabled={loading}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 40px',
                border: '1.5px solid #1a1a1a',
                borderRadius: 6,
                background: loading ? '#1a1a1a' : '#fff',
                color: loading ? '#fff' : '#1a1a1a',
                fontSize: 14, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s',
                letterSpacing: 0.2,
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; } }}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1a1a1a'; } }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 14, height: 14, border: '2px solid #fff',
                    borderTopColor: 'transparent', borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  Loading…
                </>
              ) : 'Load more'}
            </button>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default FeaturedProductsSection;
