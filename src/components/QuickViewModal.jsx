import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty, selectedSize, selectedColor);
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <div className="quickview-modal open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="quickview-backdrop" onClick={onClose} />
      <div className="quickview-content">
        <button onClick={onClose} style={{position:'absolute',top:16,right:16,background:'none',border:'none',fontSize:24,cursor:'pointer',zIndex:10}}>×</button>
        <div className="quickview-body">
          <div className="quickview-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="quickview-info">
            <p style={{fontSize:12,color:'var(--text-secondary)',textTransform:'uppercase',letterSpacing:1}}>{product.category}</p>
            <h3 style={{fontSize:22,fontWeight:700,margin:'8px 0'}}>{product.name}</h3>
            <div className="product-price mb-3">
              {product.originalPrice ? (
                <><span className="price-new">${product.price.toFixed(2)}</span><span className="price-old">${product.originalPrice.toFixed(2)}</span></>
              ) : (
                <span className="price-regular">${product.price.toFixed(2)}</span>
              )}
            </div>
            <p style={{fontSize:14,color:'var(--text-secondary)',marginBottom:20,lineHeight:1.7}}>{product.description}</p>

            {product.sizes && (
              <div className="size-selector">
                <div className="size-label">Size: <strong>{selectedSize}</strong></div>
                <div className="size-options">
                  {product.sizes.map(s => (
                    <button key={s} className={`size-btn${selectedSize===s?' active':''}`} onClick={() => setSelectedSize(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div className="color-selector mb-3">
                <div className="size-label">Color</div>
                <div className="color-options">
                  {product.colors.map((c,i) => (
                    <button key={i} className={`color-option-btn${selectedColor===c?' active':''}`} style={{background:c,outline:c==selectedColor?'2px solid #1a1a1a':'none'}} onClick={() => setSelectedColor(c)} />
                  ))}
                </div>
              </div>
            )}

            <div className="d-flex gap-3 align-items-center mb-3">
              <div className="qty-input">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
                <input className="qty-value" value={qty} readOnly />
                <button className="qty-btn" onClick={() => setQty(q => q+1)}>+</button>
              </div>
              <button className="btn-primary-custom flex-grow-1" onClick={handleAdd}>
                {added ? '✓ Added!' : 'Add to Cart'}
              </button>
            </div>

            <button
              className={`btn-outline-custom w-100${isInWishlist(product.id)?' active':''}`}
              onClick={() => toggleWishlist(product)}
              style={isInWishlist(product.id)?{background:'var(--secondary)',color:'#fff',borderColor:'var(--secondary)'}:{}}
            >
              <i className={`bi bi-heart${isInWishlist(product.id)?'-fill':''} me-2`}></i>
              {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
