import { Link } from 'react-router-dom';

const CDN = 'https://themesflat.co/html/ecomus/images';

const collectionData = [
  { id: 1, name: "Women's Collection", count: 245, image: `${CDN}/collection-1.jpg`,  slug: 'women' },
  { id: 2, name: "Men's Collection",   count: 198, image: `${CDN}/collection-2.jpg`,  slug: 'men' },
  { id: 3, name: 'Accessories',        count: 132, image: `${CDN}/collection-17.jpg`, slug: 'accessories' },
  { id: 4, name: 'Shoes & Footwear',   count: 87,  image: `${CDN}/collection-14.jpg`, slug: 'shoes' },
  { id: 5, name: 'Bags & Handbags',    count: 64,  image: `${CDN}/collection-18.jpg`, slug: 'bags' },
  { id: 6, name: 'Jewelry & Watches',  count: 95,  image: `${CDN}/collection-15.jpg`, slug: 'jewelry' },
  { id: 7, name: 'New Arrivals',       count: 48,  image: `${CDN}/collection-20.jpg`, slug: 'new' },
  { id: 8, name: 'Sale Items',         count: 156, image: `${CDN}/brown.jpg`,          slug: 'sale' },
  { id: 9, name: 'Lookbook',           count: 36,  image: `${CDN}/lookbook-3.jpg`,    slug: 'lookbook' },
];

const Collections = () => (
  <div>
    <div className="breadcrumb-custom">
      <div className="container">
        <Link to="/">Home</Link>
        <span className="separator">›</span>
        <span className="current">Collections</span>
      </div>
    </div>

    <div className="container">
      <div style={{ textAlign: 'center', padding: '50px 0 20px' }}>
        <h1 className="section-title">All Collections</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Explore our curated collections for every style and occasion
        </p>
      </div>

      <div className="collections-grid" style={{ paddingBottom: 80 }}>
        {collectionData.map(col => (
          <Link key={col.id} to={`/shop?cat=${col.slug}`}>
            <div className="collection-card">
              <img src={col.image} alt={col.name} />
              <div className="collection-card-overlay">
                <div>
                  <h3>{col.name}</h3>
                  <span>{col.count} Products</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Collections;
