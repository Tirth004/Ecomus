import { useState } from 'react';
import { Link } from 'react-router-dom';

const CDN = 'https://themesflat.co/html/ecomus/images';

// Two slides of categories — matching the reference carousel exactly
const slides = [
  [
    {
      id: 1, name: 'Clothing',   slug: 'women',
      image: `${CDN}/collections/collection-17.jpg`,
      bg: '#fdf3d0',   // warm yellow
    },
    {
      id: 2, name: 'Sunglasses', slug: 'accessories',
      image: `${CDN}/collections/collection-14.jpg`,
      bg: '#f5f0e8',   // cream/beige
    },
    {
      id: 3, name: 'Bags',       slug: 'bags',
      image: `${CDN}/collections/collection-18.jpg`,
      bg: '#fce8e8',   // pale rose/pink
    },
  ],
  [
    {
      id: 4, name: 'Bags',        slug: 'bags',
      image: `${CDN}/collections/collection-18.jpg`,
      bg: '#fce8e8',
    },
    {
      id: 5, name: 'Fashion',     slug: 'men',
      image: `${CDN}/collections/collection-1.jpg`,
      bg: '#e8eef5',   // very light blue
    },
    {
      id: 6, name: 'Accessories', slug: 'accessories',
      image: `${CDN}/collections/collection-2.jpg`,
      bg: '#f0ede4',   // warm beige
    },
  ],
];

const CategorySection = () => {
  const [slide, setSlide] = useState(0);

  const prev = () => setSlide(s => (s - 1 + slides.length) % slides.length);
  const next = () => setSlide(s => (s + 1) % slides.length);

  const cats = slides[slide];

  return (
    <section style={{ padding: '52px 0 40px' }}>
      <div className="container">

        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 10, marginBottom: 20,
        }}>
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            style={{
              width: 34, height: 34, borderRadius: '50%',
              border: '1px solid #d5d5d5', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 13, color: '#1a1a1a',
              flexShrink: 0, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1a1a1a'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.borderColor = '#d5d5d5'; }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next"
            style={{
              width: 34, height: 34, borderRadius: '50%',
              border: '1px solid #d5d5d5', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 13, color: '#1a1a1a',
              flexShrink: 0, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1a1a1a'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.borderColor = '#d5d5d5'; }}
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          <span style={{
            fontSize: 12, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: '#1a1a1a',
          }}>
            SHOP BY CATEGORIES
          </span>
        </div>

        {/* ── 4-Column Grid: 3 category cards + 1 CTA ── */}
        <div className="product-grid-custom" style={{ gap: 14 }}>

          {cats.map(cat => (
            <Link
              key={cat.id}
              to={`/shop?cat=${cat.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                style={{
                  background: cat.bg,
                  borderRadius: 10,
                  overflow: 'hidden',
                  position: 'relative',
                  height: 280,
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {/* Category image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'top center',
                    display: 'block',
                  }}
                />

                {/* White label badge — bottom left */}
                <div style={{
                  position: 'absolute', bottom: 16, left: 16,
                  background: '#fff', borderRadius: 6,
                  padding: '7px 14px',
                  fontSize: 13, fontWeight: 500, color: '#1a1a1a',
                  lineHeight: 1,
                }}>
                  {cat.name}
                </div>
              </div>
            </Link>
          ))}

          {/* ── "Discovery all new items" CTA Card ── */}
          <Link to="/collections" style={{ textDecoration: 'none', display: 'block' }}>
            <div
              style={{
                border: '1px solid #e5e5e5',
                borderRadius: 10,
                height: 280,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '0 24px 28px',
                background: '#fff', cursor: 'pointer',
                transition: 'box-shadow 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <h3 style={{
                fontSize: 20, fontWeight: 700, color: '#1a1a1a',
                lineHeight: 1.35, marginBottom: 20, letterSpacing: '-0.2px',
              }}>
                Discovery all new items
              </h3>
              <div
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: '1.5px solid #1a1a1a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17, color: '#1a1a1a',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1a1a'; }}
              >
                <i className="bi bi-arrow-up-right"></i>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default CategorySection;
