import { useState } from 'react';
import { Link } from 'react-router-dom';

const CDN = 'https://themesflat.co/html/ecomus/images';

// Two editorial look panels — exact images from Ecomus reference
const looks = [
  {
    id: 1,
    image: `${CDN}/shop/file/lookbook-3.jpg`,
    pins: [
      { top: '53%', left: '33%', product: 'Pearl Necklace',  price: '$24.95', link: '/product/1' },
      { top: '68%', left: '48%', product: 'Textured Tank Top', price: '$18.95', link: '/product/2' },
    ],
  },
  {
    id: 2,
    image: `${CDN}/shop/file/lookbook-4.jpg`,
    pins: [
      { top: '22%', left: '72%', product: 'Bucket Hat', price: '$22.95', link: '/product/3' },
    ],
  },
];

const ShopTheLookSection = () => {
  const [activePin, setActivePin] = useState(null);

  return (
    <section style={{ padding: '60px 0 0' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h2 style={{
          fontSize: 36, fontWeight: 700, color: '#1a1a1a',
          marginBottom: 10, letterSpacing: '-0.5px',
          fontFamily: 'inherit',
        }}>
          Shop the look
        </h2>
        <p style={{
          fontSize: 14,
          fontStyle: 'italic',
          color: '#3b8fa3',
          margin: 0,
          lineHeight: 1.6,
        }}>
          Inspire and let yourself be inspired,{' '}
          <span style={{ color: '#e8651a' }}>from one unique fashion</span>{' '}
          to another.
        </p>
      </div>

      {/* Full-width 2-panel grid — no gap, flush edge-to-edge */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        overflow: 'hidden',
      }}>
        {looks.map(look => (
          <div
            key={look.id}
            style={{ position: 'relative', overflow: 'hidden', lineHeight: 0 }}
          >
            <img
              src={look.image}
              alt={`Look ${look.id}`}
              style={{
                width: '100%',
                height: 560,
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                transition: 'transform 0.6s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />

            {/* Product Pins */}
            {look.pins.map((pin, i) => {
              const pinKey = `${look.id}-${i}`;
              const isActive = activePin === pinKey;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: pin.top, left: pin.left,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 5,
                  }}
                >
                  {/* Pulsing dot button */}
                  <button
                    onClick={() => setActivePin(isActive ? null : pinKey)}
                    style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: '#fff',
                      border: '3px solid rgba(255,255,255,0.6)',
                      boxShadow: '0 0 0 4px rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      display: 'block',
                      position: 'relative',
                      padding: 0,
                      animation: 'pinPulse 2.2s ease-in-out infinite',
                    }}
                    aria-label={pin.product}
                  />

                  {/* Popup card on click */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      bottom: 30, left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#fff',
                      borderRadius: 8,
                      padding: '12px 16px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                      minWidth: 150,
                      textAlign: 'center',
                      zIndex: 20,
                      animation: 'fadeUp 0.2s ease',
                    }}>
                      <Link to={pin.link} style={{ textDecoration: 'none' }}>
                        <div style={{
                          fontSize: 12, fontWeight: 600, color: '#1a1a1a',
                          marginBottom: 4, lineHeight: 1.4,
                        }}>
                          {pin.product}
                        </div>
                        <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 700 }}>
                          {pin.price}
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pinPulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(255,255,255,0.3); }
          50%       { box-shadow: 0 0 0 10px rgba(255,255,255,0.1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateX(-50%) translateY(6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default ShopTheLookSection;
