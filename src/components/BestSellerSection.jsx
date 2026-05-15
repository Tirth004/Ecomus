import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const CDN = 'https://themesflat.co/html/ecomus/images';

const bestSellerProducts = [
  {
    id: 1,
    name: 'Ribbed Tank Top',
    price: 16.95,
    pricePrefix: '',
    image: `${CDN}/products/orange-1.jpg`,
    hoverImage: `${CDN}/products/black-1.jpg`,
    colors: ['#e8651a', '#1a1a1a'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    countdown: null,
  },
  {
    id: 2,
    name: 'Ribbed modal T-shirt',
    price: 18.95,
    pricePrefix: 'From ',
    image: `${CDN}/products/white-2.jpg`,
    hoverImage: `${CDN}/products/purple.jpg`,
    colors: ['#c4a882', '#8b5cf6', '#22c55e'],
    sizes: ['M', 'L', 'XL'],
    countdown: { d: 11, h: 15, m: 37, s: 7 },
  },
  {
    id: 3,
    name: 'Oversized Printed T-shirt',
    price: 10.00,
    pricePrefix: '',
    image: `${CDN}/products/white-3.jpg`,
    hoverImage: `${CDN}/products/white-4.jpg`,
    colors: ['#ffffff', '#f8c8d4', '#1a1a1a'],
    sizes: ['S', 'M', 'L', 'XL'],
    countdown: null,
  },
  {
    id: 4,
    name: 'Oversized Printed T-shirt',
    price: 16.95,
    pricePrefix: '',
    image: `${CDN}/products/white-5.jpg`,
    hoverImage: `${CDN}/products/black-2.jpg`,
    colors: ['#ffffff', '#f8c8d4', '#1a1a1a'],
    sizes: ['XS', 'S', 'M', 'L'],
    countdown: null,
  },
];

/* ─────── Single card ─────── */
const BestSellerCard = ({ product, onQuickView }) => {
  const { addToCart, setIsCartOpen }     = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [hovered, setHovered]            = useState(false);
  const [selectedSize, setSelectedSize]  = useState(null);
  const [added, setAdded]                = useState(false);
  const [tooltip, setTooltip]            = useState(null);

  const inWish = isInWishlist(product.id);

  const handleCart = (e) => {
    e.preventDefault();
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 1500);
  };
  const handleWish    = (e) => { e.preventDefault(); toggleWishlist(product); };
  const handleQuick   = (e) => { e.preventDefault(); onQuickView?.(product); };

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTooltip(null); }}
    >
      {/* ── Image box ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: 8, background: '#f5f5f5',
        aspectRatio: '3/4', marginBottom: 12,
      }}>

        {/* Primary image */}
        <img
          src={product.image} alt={product.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            display: 'block',
            opacity: (hovered && product.hoverImage) ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Hover image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage} alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top',
              display: 'block',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        )}

        {/* Countdown badge */}
        {product.countdown && (
          <div style={{
            position: 'absolute', bottom: hovered ? 56 : 12,
            left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.96)',
            padding: '5px 12px', borderRadius: 4,
            fontSize: 12, fontWeight: 600, color: '#db4444',
            whiteSpace: 'nowrap', transition: 'bottom 0.3s ease',
            zIndex: 5,
          }}>
            {product.countdown.d}d : {String(product.countdown.h).padStart(2,'0')}h : {String(product.countdown.m).padStart(2,'0')}m : {String(product.countdown.s).padStart(2,'0')}s
          </div>
        )}

        {/* ── 4 Action icons — horizontal row centered, appear on hover ── */}
        <div style={{
          position: 'absolute',
          bottom: hovered ? 50 : 30,
          left: '50%', transform: 'translateX(-50%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease, bottom 0.3s ease',
          display: 'flex', alignItems: 'center',
          background: '#fff',
          borderRadius: 6,
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          zIndex: 10,
          whiteSpace: 'nowrap',
        }}>
          {[
            { icon: added ? 'bi-check-lg' : 'bi-bag-plus', fn: handleCart, title: 'Add to Cart', active: added },
            { icon: inWish ? 'bi-heart-fill' : 'bi-heart',  fn: handleWish,  title: 'Wishlist',    active: inWish },
            { icon: 'bi-arrow-left-right',                  fn: (e) => e.preventDefault(), title: 'Compare' },
            { icon: 'bi-eye',                               fn: handleQuick, title: 'Quick View' },
          ].map(({ icon, fn, title, active }, i) => (
            <button
              key={title}
              onClick={fn}
              title={title}
              style={{
                width: 40, height: 40,
                background: 'transparent',
                border: 'none',
                borderLeft: i > 0 ? '1px solid #f0f0f0' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, cursor: 'pointer',
                color: active ? '#db4444' : '#1a1a1a',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <i className={`bi ${icon}`}></i>
            </button>
          ))}
        </div>

        {/* ── Size selector — slides up from bottom on hover ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(255,255,255,0.95)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 4, padding: '8px 12px',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 9,
        }}>
          {product.sizes.map(sz => (
            <button
              key={sz}
              onClick={(e) => { e.preventDefault(); setSelectedSize(sz); }}
              style={{
                minWidth: 32, height: 30, borderRadius: 4,
                border: selectedSize === sz ? '1.5px solid #1a1a1a' : '1px solid #ddd',
                background: selectedSize === sz ? '#1a1a1a' : '#fff',
                color: selectedSize === sz ? '#fff' : '#1a1a1a',
                fontSize: 12, fontWeight: 500, cursor: 'pointer',
                padding: '0 6px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (selectedSize !== sz) {
                  e.currentTarget.style.borderColor = '#1a1a1a';
                }
              }}
              onMouseLeave={e => {
                if (selectedSize !== sz) {
                  e.currentTarget.style.borderColor = '#ddd';
                }
              }}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Info ── */}
      <div>
        {/* Name */}
        <div style={{
          fontSize: 14, fontWeight: 400, color: '#1a1a1a',
          marginBottom: 3, lineHeight: 1.45,
        }}>
          {product.name}
        </div>

        {/* Price */}
        <div style={{ fontSize: 14, color: '#1a1a1a', marginBottom: 7 }}>
          {product.pricePrefix && (
            <span style={{ color: '#888', fontSize: 13, marginRight: 2 }}>
              {product.pricePrefix}
            </span>
          )}
          ${product.price.toFixed(2)}
          {product.originalPrice && (
            <span style={{
              fontSize: 13, color: '#bbb',
              textDecoration: 'line-through', marginLeft: 8,
            }}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color swatches below price with tooltip */}
        {product.colors?.length > 0 && (
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {product.colors.map((c, i) => (
              <div
                key={i}
                style={{ position: 'relative' }}
                onMouseEnter={() => setTooltip(i)}
                onMouseLeave={() => setTooltip(null)}
              >
                <div
                  style={{
                    width: 16, height: 16, borderRadius: '50%',
                    background: c,
                    border: (c === '#ffffff' || c === '#fff') ? '1.5px solid #ccc' : 'none',
                    outline: i === 0 ? '1.5px solid #1a1a1a' : 'none',
                    outlineOffset: 2,
                    cursor: 'pointer',
                    transition: 'outline 0.15s',
                  }}
                  onClick={(e) => e.preventDefault()}
                />
                {tooltip === i && (
                  <div style={{
                    position: 'absolute', bottom: 22, left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#1a1a1a', color: '#fff',
                    fontSize: 11, padding: '3px 8px',
                    borderRadius: 4, whiteSpace: 'nowrap', zIndex: 20,
                    pointerEvents: 'none',
                  }}>
                    {c === '#e8651a' ? 'Orange' : c === '#1a1a1a' ? 'Black' : c === '#ffffff' || c === '#fff' ? 'White' : c === '#c4a882' ? 'Brown' : c === '#8b5cf6' ? 'Purple' : c === '#22c55e' ? 'Green' : c === '#f8c8d4' ? 'Pink' : 'Color'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

/* ─────── Best Seller Section ─────── */
const BestSellerSection = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{
            fontSize: 36, fontWeight: 700, color: '#1a1a1a',
            marginBottom: 8, letterSpacing: '-0.5px',
          }}>
            Best Seller
          </h2>
          <p style={{ fontSize: 14, color: '#888', margin: 0 }}>
            Shop the Latest Styles: Stay ahead of the curve with our newest arrivals
          </p>
        </div>

        {/* 4-col grid */}
        <div className="product-grid-custom" style={{ marginBottom: 40 }}>
          {bestSellerProducts.map(p => (
            <BestSellerCard
              key={p.id}
              product={p}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
