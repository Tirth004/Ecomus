import HeroBanner from '../components/HeroBanner';
import TickerBanner from '../components/TickerBanner';
import CategorySection from '../components/CategorySection';
import BestSellerSection from '../components/BestSellerSection';
import FeaturedProductsSection from '../components/FeaturedProductsSection';
import ShopTheLookSection from '../components/ShopTheLookSection';
import TestimonialSection from '../components/TestimonialSection';
import Newsletter from '../components/Newsletter';
import { useState } from 'react';

const CDN = 'https://themesflat.co/html/ecomus/images';

/* ── Brand Logos Bar ── */
const BrandBar = () => {
  const brands = [
    { id: 1, img: `${CDN}/brand/brand-01.png`, name: 'SSENSE' },
    { id: 2, img: `${CDN}/brand/brand-02.png`, name: 'Burberry' },
    { id: 3, img: `${CDN}/brand/brand-03.png`, name: 'Nike' },
    { id: 4, img: `${CDN}/brand/brand-04.png`, name: 'ASOS' },
    { id: 5, img: `${CDN}/brand/brand-05.png`, name: 'Pull&Bear' },
    { id: 6, img: `${CDN}/brand/brand-06.png`, name: 'Gildan' },
  ];

  return (
    <section style={{
      borderTop: '1px solid #e8e8e8',
      borderBottom: '1px solid #e8e8e8',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
      }}>
        {brands.map((brand, i) => (
          <div
            key={brand.id}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '28px 20px',
              borderLeft: i > 0 ? '1px solid #e8e8e8' : 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <img
              src={brand.img}
              alt={brand.name}
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
              style={{
                maxHeight: 36, maxWidth: '100%',
                objectFit: 'contain', display: 'block',
                filter: 'grayscale(0)',
              }}
            />
            <span style={{
              display: 'none',
              fontSize: 16, fontWeight: 800,
              color: '#1a1a1a', letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── Shop Gram / Instagram Gallery ── */
const ShopGram = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const galleryImages = [
    `${CDN}/shop/gallery/gallery-7.jpg`,
    `${CDN}/shop/gallery/gallery-3.jpg`,
    `${CDN}/shop/gallery/gallery-5.jpg`,
    `${CDN}/shop/gallery/gallery-8.jpg`,
    `${CDN}/shop/gallery/gallery-6.jpg`,
  ];

  return (
    <section>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '60px 0 28px' }}>
        <h2 style={{
          fontSize: 36, fontWeight: 700, color: '#1a1a1a',
          marginBottom: 10, letterSpacing: '-0.3px',
        }}>
          Shop Gram
        </h2>
        <p style={{ fontSize: 14, margin: 0 }}>
          <span style={{ color: '#3b8fa3', fontStyle: 'italic' }}>
            Inspire and let yourself be inspired,
          </span>
          {' '}
          <span style={{ color: '#e8651a', fontStyle: 'italic' }}>
            from one unique fashion to another.
          </span>
        </p>
      </div>

      {/* 5-column flush image grid */}
      <div className="shop-gram-grid">
        {galleryImages.map((img, i) => (
          <a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '1 / 1.1',
              lineHeight: 0,
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <img
              src={img}
              alt={`Shop Gram ${i + 1}`}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                display: 'block',
                transition: 'transform 0.5s ease',
                transform: hoveredIdx === i ? 'scale(1.06)' : 'scale(1)',
              }}
              onError={e => (e.target.style.background = '#f0f0f0')}
            />

            {/* Dark overlay on hover */}
            <div style={{
              position: 'absolute', inset: 0,
              background: hoveredIdx === i ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0)',
              transition: 'background 0.3s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Shopping bag icon — always visible on center image, rest on hover */}
              {(hoveredIdx === i || i === 2) && (
                <div style={{
                  width: 36, height: 36,
                  background: '#fff',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  opacity: hoveredIdx === i ? 1 : (i === 2 ? 0.9 : 0),
                  transition: 'opacity 0.3s',
                }}>
                  <i className="bi bi-bag" style={{ fontSize: 14, color: '#1a1a1a' }} />
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};



const Home = () => {

  return (
    <>
      {/* 1. Hero Slider */}
      <HeroBanner />

      {/* 2. Yellow Scrolling Ticker */}
      <TickerBanner />

      {/* 3. Shop by Categories */}
      <CategorySection />

      {/* 4. Best Seller Products */}
      <BestSellerSection />

      {/* 5. Featured Products (Load More) */}
      <FeaturedProductsSection />

      {/* 6. Shop the Look */}
      <ShopTheLookSection />





      {/* 10. Testimonials — Happy Clients */}
      <TestimonialSection />

      {/* 11. Brand Logos Bar */}
      <BrandBar />

      {/* 12. Shop Gram Instagram Gallery */}
      <ShopGram />

      {/* 13. Newsletter */}
      <Newsletter />
    </>
  );
};

export default Home;
