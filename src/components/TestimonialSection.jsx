import { useState } from 'react';
import { Link } from 'react-router-dom';

const CDN = 'https://themesflat.co/html/ecomus/images';

const testimonials = [
  {
    id: 1,
    rating: 5,
    heading: 'Best Online Fashion Site',
    text: '" I always find something stylish and affordable on this web fashion site "',
    name: 'Robert smith',
    location: 'Customer from USA',
    product: { name: 'Jersey thong body', price: '$105.95', image: `${CDN}/shop/products/img-p2.png`, link: '/product/1' },
  },
  {
    id: 2,
    rating: 5,
    heading: 'Great Selection and Quality',
    text: '"I love the variety of styles and the high-quality clothing on this web fashion site."',
    name: 'Allen Lyn',
    location: 'Customer from France',
    product: { name: 'Cotton jersey top', price: '$7.95', image: `${CDN}/shop/products/img-p3.png`, link: '/product/2' },
  },
  {
    id: 3,
    rating: 5,
    heading: 'Best Customer Service',
    text: '"I finally found a web fashion site with stylish and flattering options in my size."',
    name: 'Peter Rope',
    location: 'Customer from USA',
    product: { name: 'Ribbed modal T-shirt', price: 'From $18.95', image: `${CDN}/shop/products/img-p4.png`, link: '/product/3' },
  },
  {
    id: 4,
    rating: 5,
    heading: 'Great Selection and Quality',
    text: '"Amazing quality and fast shipping. I am very happy with my purchase from this site."',
    name: 'Yuki Tanaka',
    location: 'Customer from Japan',
    product: { name: 'Cotton jersey top', price: '$7.95', image: `${CDN}/shop/products/img-p5.png`, link: '/product/4' },
  },
];

const VISIBLE = 3; // cards visible at once

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const maxIdx = testimonials.length - VISIBLE;

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIdx, c + 1));

  const visible = testimonials.slice(current, current + VISIBLE);

  return (
    <section style={{ padding: '70px 0', background: '#fff' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{
            fontSize: 36, fontWeight: 700, color: '#1a1a1a',
            marginBottom: 10, letterSpacing: '-0.3px',
          }}>
            Happy Clients
          </h2>
          <p style={{ fontSize: 14, margin: 0, color: '#555' }}>
            Hear{' '}
            <span style={{ color: '#3b8fa3', fontStyle: 'italic' }}>what</span>
            {' '}they say about{' '}
            <span style={{ color: '#3b8fa3' }}>us</span>
          </p>
        </div>

        {/* Slider wrapper */}
        <div style={{ position: 'relative' }}>

          {/* Prev arrow */}
          <button
            onClick={prev}
            disabled={current === 0}
            style={{
              position: 'absolute',
              left: -24, top: '50%',
              transform: 'translateY(-50%)',
              width: 40, height: 40,
              borderRadius: '50%',
              border: '1.5px solid #ddd',
              background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current === 0 ? 'not-allowed' : 'pointer',
              opacity: current === 0 ? 0.4 : 1,
              zIndex: 10,
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => { if (current > 0) { e.currentTarget.style.borderColor = '#1a1a1a'; }}}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; }}
          >
            <i className="bi bi-chevron-left" style={{ fontSize: 13, color: '#1a1a1a' }} />
          </button>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {visible.map(t => (
              <div key={t.id} style={{
                border: '1.5px solid #e8e8e8',
                borderRadius: 10,
                padding: '24px 22px 20px',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: 3 }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill" style={{ color: '#f5a623', fontSize: 14 }} />
                  ))}
                </div>

                {/* Heading */}
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>
                  {t.heading}
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: 14, color: '#444', lineHeight: 1.65,
                  margin: 0, flexGrow: 1,
                }}>
                  {t.text}
                </p>

                {/* Reviewer */}
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{t.location}</div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #f0f0f0' }} />

                {/* Product thumbnail row */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  position: 'relative',
                }}>
                  <Link to={t.product.link} style={{ flexShrink: 0, textDecoration: 'none' }}>
                    <img
                      src={t.product.image}
                      alt={t.product.name}
                      onError={e => { e.target.style.background = '#f5f5f5'; e.target.src = ''; }}
                      style={{
                        width: 64, height: 80,
                        objectFit: 'cover', objectPosition: 'top',
                        borderRadius: 6, background: '#f8f8f8',
                        display: 'block',
                      }}
                    />
                  </Link>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <Link to={t.product.link} style={{ textDecoration: 'none' }}>
                      <div style={{
                        fontSize: 13, fontWeight: 500, color: '#1a1a1a',
                        marginBottom: 4, lineHeight: 1.4,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {t.product.name}
                      </div>
                      <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 600 }}>
                        {t.product.price}
                      </div>
                    </Link>
                  </div>

                  {/* Arrow link button */}
                  <Link
                    to={t.product.link}
                    style={{
                      flexShrink: 0,
                      width: 34, height: 34, borderRadius: '50%',
                      border: '1.5px solid #ddd',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#1a1a1a', textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#1a1a1a';
                      e.currentTarget.style.borderColor = '#1a1a1a';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = '#ddd';
                      e.currentTarget.style.color = '#1a1a1a';
                    }}
                  >
                    <i className="bi bi-arrow-up-right" style={{ fontSize: 13 }} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            disabled={current >= maxIdx}
            style={{
              position: 'absolute',
              right: -24, top: '50%',
              transform: 'translateY(-50%)',
              width: 40, height: 40,
              borderRadius: '50%',
              border: '1.5px solid #ddd',
              background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current >= maxIdx ? 'not-allowed' : 'pointer',
              opacity: current >= maxIdx ? 0.4 : 1,
              zIndex: 10,
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => { if (current < maxIdx) { e.currentTarget.style.borderColor = '#1a1a1a'; }}}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; }}
          >
            <i className="bi bi-chevron-right" style={{ fontSize: 13, color: '#1a1a1a' }} />
          </button>
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 6,
          marginTop: 28,
        }}>
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: current === i ? 20 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: current === i ? '#1a1a1a' : '#ddd',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;
