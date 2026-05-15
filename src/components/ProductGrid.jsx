import { useState } from 'react';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, title, subtitle, viewAllLink }) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container">

        {/* Section Header — centered like reference */}
        {(title || subtitle) && (
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            {title && (
              <h2 style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: 8,
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
              }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{
                fontSize: 14,
                color: '#777',
                margin: 0,
                lineHeight: 1.6,
              }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Product Grid — 4 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>

        {/* View All button */}
        {viewAllLink && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link
              to={viewAllLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                border: '1.5px solid #1a1a1a',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                color: '#1a1a1a',
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1a1a1a';
              }}
            >
              View All <i className="bi bi-arrow-right" style={{ fontSize: 12 }}></i>
            </Link>
          </div>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </section>
  );
};

export default ProductGrid;
