import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const StarRating = ({ rating }) => (
  <div className="star-rating">
    {[1,2,3,4,5].map(s => (
      <i key={s} className={`bi bi-star${s<=Math.floor(rating)?'-fill':s-0.5===rating?'-half':''} star${s>rating?' empty':''}`} />
    ))}
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[1] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);
  const [quickView, setQuickView] = useState(null);

  if (!product) return (
    <div className="empty-state" style={{padding:'100px 20px'}}>
      <i className="bi bi-bag-x"></i>
      <h4>Product Not Found</h4>
      <Link to="/shop" className="btn-primary-custom mt-3">Back to Shop</Link>
    </div>
  );

  const images = product.images || [product.image];
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize, selectedColor);
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <div className="breadcrumb-custom">
        <div className="container">
          <Link to="/">Home</Link><span className="separator">›</span>
          <Link to="/shop">Shop</Link><span className="separator">›</span>
          <span className="current">{product.name}</span>
        </div>
      </div>

      <div className="container" style={{padding:'40px 15px 80px'}}>
        <div className="row g-5">
          {/* Gallery */}
          <div className="col-md-6">
            <div className="product-gallery">
              <div className="gallery-thumbs">
                {images.map((img, i) => (
                  <div key={i} className={`gallery-thumb${selectedImage===i?' active':''}`} onClick={() => setSelectedImage(i)}>
                    <img src={img} alt={`${product.name} ${i+1}`} />
                  </div>
                ))}
              </div>
              <div className="gallery-main">
                <img src={images[selectedImage]} alt={product.name} />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="col-md-6">
            <div className="product-detail-info">
              <p style={{fontSize:12,color:'var(--text-secondary)',textTransform:'uppercase',letterSpacing:1,marginBottom:6}}>{product.category}</p>
              <h1>{product.name}</h1>

              <div style={{display:'flex',alignItems:'center',gap:8,margin:'10px 0 16px'}}>
                <StarRating rating={product.rating} />
                <span style={{fontSize:13,color:'var(--text-secondary)'}}>({product.reviews} reviews)</span>
              </div>

              <div className="product-detail-price">
                {product.originalPrice ? (
                  <>
                    <span className="price-main">${product.price.toFixed(2)}</span>
                    <span className="price-orig">${product.originalPrice.toFixed(2)}</span>
                    <span className="discount-pct">-{product.discount}%</span>
                  </>
                ) : (
                  <span className="price-main">${product.price.toFixed(2)}</span>
                )}
              </div>

              <p style={{fontSize:14,color:'var(--text-secondary)',lineHeight:1.8,marginBottom:20}}>{product.description}</p>
              <hr />

              {/* Colors */}
              {product.colors && (
                <div className="color-selector">
                  <div className="size-label">Color: <strong>{selectedColor}</strong></div>
                  <div className="color-options">
                    {product.colors.map((c,i) => (
                      <button key={i} className={`color-option-btn${selectedColor===c?' active':''}`}
                        style={{background:c,outline:selectedColor===c?'3px solid #1a1a1a':'2px solid transparent',outlineOffset:2}}
                        onClick={() => setSelectedColor(c)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && (
                <div className="size-selector">
                  <div className="size-label" style={{display:'flex',justifyContent:'space-between'}}>
                    <span>Size: <strong>{selectedSize}</strong></span>
                    <a href="#" style={{fontSize:12,color:'var(--secondary)'}}>Size Guide</a>
                  </div>
                  <div className="size-options">
                    {product.sizes.map(s => (
                      <button key={s} className={`size-btn${selectedSize===s?' active':''}`} onClick={() => setSelectedSize(s)}>{s}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add */}
              <div className="product-actions-row mt-4">
                <div className="qty-input">
                  <button className="qty-btn" onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
                  <input className="qty-value" value={qty} readOnly />
                  <button className="qty-btn" onClick={() => setQty(q => q+1)}>+</button>
                </div>
                <button className="btn-primary-custom flex-grow-1 btn-add-cart" onClick={handleAddToCart}>
                  <i className={`bi bi-${added?'check-lg':'bag-plus'}`}></i>
                  {added ? 'Added to Cart!' : 'Add to Cart'}
                </button>
                <button
                  className={`nav-icon-btn${isInWishlist(product.id)?' active':''}`}
                  style={{border:'1px solid var(--border-color)',borderRadius:6,width:46,height:46,background:isInWishlist(product.id)?'var(--secondary)':'transparent',color:isInWishlist(product.id)?'#fff':'var(--text-primary)'}}
                  onClick={() => toggleWishlist(product)}>
                  <i className={`bi bi-heart${isInWishlist(product.id)?'-fill':''}`}></i>
                </button>
              </div>

              {/* Meta */}
              <div style={{marginTop:24, padding:'16px 0', borderTop:'1px solid var(--border-color)'}}>
                <p style={{fontSize:13,color:'var(--text-secondary)', marginBottom:6}}>
                  <strong>SKU:</strong> ECO-{String(product.id).padStart(4,'0')}
                </p>
                <p style={{fontSize:13,color:'var(--text-secondary)', marginBottom:6}}>
                  <strong>Category:</strong> <Link to={`/shop?cat=${product.category.toLowerCase()}`} style={{color:'var(--secondary)'}}>{product.category}</Link>
                </p>
                <div style={{display:'flex',gap:10,marginTop:12}}>
                  {['bi-facebook','bi-twitter-x','bi-pinterest'].map(icon => (
                    <a key={icon} href="#" className="social-btn" style={{background:'var(--light-gray)',color:'var(--text-primary)'}}>
                      <i className={`bi ${icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="tab-buttons">
            {['description', 'reviews', 'additional'].map(tab => (
              <button key={tab} className={`tab-btn${activeTab===tab?' active':''}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase()+tab.slice(1)} {tab==='reviews'&&`(${product.reviews})`}
              </button>
            ))}
          </div>
          <div className="tab-content-panel">
            {activeTab === 'description' && (
              <div>
                <p>{product.description}</p>
                <ul style={{marginTop:16,paddingLeft:20}}>
                  <li>Premium quality fabric</li><li>Comfortable fit for all-day wear</li>
                  <li>Easy care instructions</li><li>Sustainable materials used where possible</li>
                </ul>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:48,fontWeight:700}}>{product.rating.toFixed(1)}</div>
                    <StarRating rating={product.rating} />
                    <div style={{fontSize:12,color:'var(--text-secondary)',marginTop:4}}>{product.reviews} reviews</div>
                  </div>
                </div>
                <p style={{color:'var(--text-secondary)'}}>Reviews are verified purchases from our customers.</p>
              </div>
            )}
            {activeTab === 'additional' && (
              <table style={{fontSize:14,width:'100%',borderCollapse:'collapse'}}>
                {[['Material','100% Cotton / Polyester blend'],['Care','Machine wash cold'],['Fit','Regular fit'],['Country','Made in Italy']].map(([k,v]) => (
                  <tr key={k} style={{borderBottom:'1px solid var(--border-color)'}}>
                    <td style={{padding:'10px 0',fontWeight:600,width:'40%'}}>{k}</td>
                    <td style={{padding:'10px 0',color:'var(--text-secondary)'}}>{v}</td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{marginTop:60}}>
            <h3 className="section-title" style={{marginBottom:24}}>You May Also Like</h3>
            <div className="row g-3">
              {related.map(p => (
                <div key={p.id} className="col-6 col-md-3">
                  <ProductCard product={p} onQuickView={setQuickView} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
};

export default ProductDetails;
