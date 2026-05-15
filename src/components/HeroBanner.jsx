import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CDN = 'https://themesflat.co/html/ecomus/images';

const slides = [
  {
    id: 1,
    img: `${CDN}/slider/fashion-slideshow-01.jpg`,
    bg: '#faf5f0',
    title: ['Glamorous', 'Glam'],
    subtitle: "From casual to formal, we've got you covered",
    cta: 'Shop collection',
    ctaLink: '/shop',
  },
  {
    id: 2,
    img: `${CDN}/slider/fashion-slideshow-02.jpg`,
    bg: '#eef4fc',
    title: ['New Season', 'Arrivals'],
    subtitle: 'Discover the latest trends this season',
    cta: 'Shop Now',
    ctaLink: '/shop',
  },
  {
    id: 3,
    img: `${CDN}/slider/fashion-slideshow-03.jpg`,
    bg: '#f0f7f0',
    title: ['Minimal', 'Style'],
    subtitle: 'Shop the biggest sale of the season right now',
    cta: 'Shop the Sale',
    ctaLink: '/shop?filter=sale',
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent(c => (c + 1) % slides.length);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>

      {/* ── Slides ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        /* Aspect ratio matches the wide slideshow images (approx 1280 x 580) */
      }}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              inset: 0,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.85s ease',
              zIndex: i === current ? 2 : 1,
              background: s.bg,
            }}
          >
            {/* Full image — NO crop */}
            <img
              src={s.img}
              alt=""
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
              onError={e => e.target.style.display = 'none'}
            />
          </div>
        ))}

        {/* ── Text overlay (left side, vertically centered) ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ paddingLeft: '6%', maxWidth: '42%', pointerEvents: 'auto', paddingTop: '60px' }}>
            <h1
              key={current}
              style={{
                fontSize: 'clamp(44px, 5vw, 72px)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#1a1a1a',
                marginBottom: 16,
                letterSpacing: '-1.5px',
                fontFamily: "'DM Sans', sans-serif",
                animation: 'fadeUp 0.5s ease',
              }}
            >
              {slides[current].title[0]}
              <br />
              {slides[current].title[1]}
            </h1>

            <p
              style={{
                fontSize: 15,
                color: '#555',
                lineHeight: 1.65,
                marginBottom: 32,
                fontWeight: 400,
                animation: 'fadeUp 0.6s ease',
              }}
            >
              <span style={{ color: '#e07b39', fontWeight: 500 }}>
                {slides[current].subtitle.charAt(0)}
              </span>
              {slides[current].subtitle.slice(1)}
            </p>

            <Link
              to={slides[current].ctaLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#1a1a1a',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 0.2,
                textDecoration: 'none',
                transition: 'background 0.25s',
                animation: 'fadeUp 0.7s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#333')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1a')}
            >
              {slides[current].cta}
              <i className="bi bi-chevron-right" style={{ fontSize: 12 }} />
            </Link>
          </div>
        </div>

        {/* ── Dot Navigation ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 10,
            zIndex: 20,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: 10, height: 10,
                borderRadius: '50%',
                padding: 0,
                border: '2px solid #1a1a1a',
                background: i === current ? '#1a1a1a' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* ── Prev / Next Arrows ── */}
        {[
          { key: 'prev', icon: 'bi-chevron-left',  side: { left: 20 },  fn: prev },
          { key: 'next', icon: 'bi-chevron-right', side: { right: 20 }, fn: next },
        ].map(({ key, icon, side, fn }) => (
          <button
            key={key}
            onClick={fn}
            aria-label={key}
            style={{
              position: 'absolute',
              top: '50%', transform: 'translateY(-50%)',
              ...side,
              zIndex: 20,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.88)',
              border: '1px solid rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: '#1a1a1a',
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.88)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; }}
          >
            <i className={`bi ${icon}`} />
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;
