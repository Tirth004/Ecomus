import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart, setIsCartOpen }     = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [hovered, setHovered]            = useState(false);
  const [selectedSize, setSelectedSize]  = useState(null);
  const [added, setAdded]                = useState(false);
  const [imgErr, setImgErr]              = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 1500);
  };
  const handleWishlist  = (e) => { e.preventDefault(); toggleWishlist(product); };
  const handleQuickView = (e) => { e.preventDefault(); onQuickView?.(product); };
  const handleCompare   = (e) => { e.preventDefault(); };

  const hasSizes = product.sizes?.length > 0;

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image Box ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: 8, background: '#f5f5f5',
        aspectRatio: '3/4', marginBottom: 12,
      }}>

        {/* Primary image */}
        <img
          src={imgErr ? '/placeholder.jpg' : product.image}
          alt={product.name}
          onError={() => setImgErr(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            display: 'block',
            opacity: (hovered && product.hoverImage) ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Hover / secondary image */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt=""
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

        {/* Badges */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          display: 'flex', flexDirection: 'column', gap: 5,
          zIndex: 6,
        }}>
          {product.isNew && (
            <span style={{
              background: '#3b7a57', color: '#fff',
              fontSize: 10, fontWeight: 700, padding: '3px 8px',
              borderRadius: 4, letterSpacing: 1, textTransform: 'uppercase',
            }}>New</span>
          )}
          {product.isSale && product.discount > 0 && (
            <span style={{
              background: '#db4444', color: '#fff',
              fontSize: 10, fontWeight: 700, padding: '3px 8px',
              borderRadius: 4, letterSpacing: 0.5,
            }}>-{product.discount}%</span>
          )}
        </div>

        {/* ── 4-icon horizontal white pill — slides up above size strip ── */}
        <div style={{
          position: 'absolute',
          bottom: hovered ? (hasSizes ? 50 : 14) : 20,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease, bottom 0.3s ease',
          display: 'flex',
          background: '#fff',
          borderRadius: 6,
          boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
          overflow: 'hidden',
          zIndex: 10,
          whiteSpace: 'nowrap',
          pointerEvents: hovered ? 'auto' : 'none',
        }}>
          {[
            {
              icon: added ? 'bi-check-lg' : 'bi-bag-plus',
              fn: handleAddToCart,
              title: 'Add to Cart',
              active: added,
            },
            {
              icon: inWishlist ? 'bi-heart-fill' : 'bi-heart',
              fn: handleWishlist,
              title: 'Wishlist',
              active: inWishlist,
            },
            {
              icon: 'bi-arrow-left-right',
              fn: handleCompare,
              title: 'Compare',
              active: false,
            },
            {
              icon: 'bi-eye',
              fn: handleQuickView,
              title: 'Quick View',
              active: false,
            },
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
              onMouseEnter={e => {
                e.currentTarget.style.background = '#f5f5f5';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <i className={`bi ${icon}`} />
            </button>
          ))}
        </div>

        {/* ── Size strip — slides up from bottom on hover ── */}
        {hasSizes && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(255,255,255,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: 4, padding: '8px 10px',
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
                  fontSize: 12, fontWeight: 500,
                  cursor: 'pointer', padding: '0 6px',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (selectedSize !== sz) e.currentTarget.style.borderColor = '#1a1a1a';
                }}
                onMouseLeave={e => {
                  if (selectedSize !== sz) e.currentTarget.style.borderColor = '#ddd';
                }}
              >
                {sz}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Product Info ── */}
      <div style={{ paddingTop: 4 }}>
        {/* Name */}
        <div style={{
          fontSize: 14, fontWeight: 400, color: '#1a1a1a',
          marginBottom: 6, lineHeight: 1.45,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {product.name}
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: 13, color: '#bbb', textDecoration: 'line-through' }}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors?.length > 0 && (
          <div style={{ display: 'flex', gap: 5 }}>
            {product.colors.slice(0, 5).map((c, i) => (
              <div
                key={i}
                onClick={e => e.preventDefault()}
                style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: c,
                  border: (c === '#ffffff' || c === '#fff') ? '1px solid #ddd' : 'none',
                  outline: i === 0 ? '1px solid #1a1a1a' : 'none',
                  outlineOffset: 2,
                  cursor: 'pointer',
                  transition: 'outline 0.15s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
