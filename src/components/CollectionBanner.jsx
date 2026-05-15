import { Link } from 'react-router-dom';

const CDN = 'https://themesflat.co/html/ecomus/images';
const COL = `${CDN}/collections`;

const CollectionBanner = () => (
  <section style={{ padding: '60px 0' }}>
    <div className="container">
      <div className="row g-4">

        {/* Large left banner */}
        <div className="col-md-6">
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', height: 380 }}>
            <img
              src={`${COL}/collection-17.jpg`}
              alt="Men Collection"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => e.target.style.display = 'none'}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: 36,
            }}>
              <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: 10 }}>New Season</span>
              <h3 style={{ color: '#fff', fontSize: 30, fontWeight: 800, marginBottom: 20, letterSpacing: '-0.5px' }}>Men's Collection</h3>
              <Link to="/shop?cat=men" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff', color: '#1a1a1a',
                padding: '10px 22px', borderRadius: 6,
                fontSize: 13, fontWeight: 700, textDecoration: 'none',
                transition: 'all 0.3s', width: 'fit-content',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1a1a1a'; }}>
                Shop Men's <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Right column — two stacked */}
        <div className="col-md-6">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>

            <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', flex: 1 }}>
              <img
                src={`${COL}/collection-14.jpg`}
                alt="Accessories"
                style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                onError={e => e.target.style.display = 'none'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 28,
              }}>
                <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: 6 }}>Trending</span>
                <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Accessories</h3>
                <Link to="/shop?cat=accessories" style={{ color: '#fff', fontSize: 13, fontWeight: 700, borderBottom: '2px solid rgba(255,255,255,0.5)', paddingBottom: 2, textDecoration: 'none', width: 'fit-content' }}>
                  Shop Now →
                </Link>
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', flex: 1 }}>
              <img
                src={`${COL}/collection-18.jpg`}
                alt="Women Collection"
                style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                onError={e => e.target.style.display = 'none'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 28,
              }}>
                <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: 6 }}>Best Sellers</span>
                <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Women's Picks</h3>
                <Link to="/shop?cat=women" style={{ color: '#fff', fontSize: 13, fontWeight: 700, borderBottom: '2px solid rgba(255,255,255,0.5)', paddingBottom: 2, textDecoration: 'none', width: 'fit-content' }}>
                  Shop Now →
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default CollectionBanner;
