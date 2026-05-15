import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-az', label: 'Name: A-Z' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

const CATEGORIES = ['Women', 'Men', 'Accessories', 'Shoes', 'Bags', 'Jewelry'];
const PAGE_SIZE = 8;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [quickView, setQuickView] = useState(null);
  const [sort, setSort] = useState('default');
  const [selectedCats, setSelectedCats] = useState(() => {
    const cat = searchParams.get('cat');
    return cat ? [cat.charAt(0).toUpperCase() + cat.slice(1)] : [];
  });
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlySale, setOnlySale] = useState(() => searchParams.get('filter') === 'sale');
  const [page, setPage] = useState(1);

  const toggleCat = (cat) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCats.length) list = list.filter(p => selectedCats.includes(p.category));
    if (onlyNew) list = list.filter(p => p.isNew);
    if (onlySale) list = list.filter(p => p.isSale);
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case 'price-low': list.sort((a,b) => a.price - b.price); break;
      case 'price-high': list.sort((a,b) => b.price - a.price); break;
      case 'name-az': list.sort((a,b) => a.name.localeCompare(b.name)); break;
      case 'rating': list.sort((a,b) => b.rating - a.rating); break;
      case 'newest': list = list.filter(p => p.isNew).concat(list.filter(p => !p.isNew)); break;
    }
    return list;
  }, [selectedCats, onlyNew, onlySale, priceRange, sort]);

  const paginated = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-custom">
        <div className="container">
          <a href="/">Home</a>
          <span className="separator">›</span>
          <span className="current">Shop</span>
        </div>
      </div>

      <div className="container">
        <div className="shop-layout">
          {/* Sidebar */}
          <aside className="shop-sidebar">
            <div className="filter-group">
              <div className="filter-title">Categories</div>
              {CATEGORIES.map(cat => (
                <div key={cat} className="filter-option">
                  <input type="checkbox" id={`cat-${cat}`} checked={selectedCats.includes(cat)} onChange={() => toggleCat(cat)} />
                  <label htmlFor={`cat-${cat}`}>{cat}</label>
                </div>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-title">Price Range</div>
              <input type="range" min={0} max={200} value={priceRange[1]} onChange={e => setPriceRange([0, +e.target.value])} style={{width:'100%', accentColor:'var(--primary)'}} />
              <div className="price-range-inputs">
                <div style={{fontSize:13, color:'var(--text-secondary)'}}>$0</div>
                <div style={{fontSize:13, fontWeight:600}}>Max: ${priceRange[1]}</div>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-title">Filter By</div>
              <div className="filter-option">
                <input type="checkbox" id="f-new" checked={onlyNew} onChange={() => setOnlyNew(!onlyNew)} />
                <label htmlFor="f-new">New Arrivals</label>
              </div>
              <div className="filter-option">
                <input type="checkbox" id="f-sale" checked={onlySale} onChange={() => setOnlySale(!onlySale)} />
                <label htmlFor="f-sale">On Sale</label>
              </div>
            </div>

            <button className="btn-outline-custom w-100 mt-3" onClick={() => { setSelectedCats([]); setPriceRange([0,200]); setOnlyNew(false); setOnlySale(false); setSort('default'); }}>
              Clear Filters
            </button>
          </aside>

          {/* Products */}
          <main>
            <div className="shop-toolbar">
              <span className="shop-result-count">Showing {filtered.length} products</span>
              <select className="sort-dropdown" value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {paginated.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-search"></i>
                <h4>No products found</h4>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              <div className="row g-3">
                {paginated.map(p => (
                  <div key={p.id} className="col-6 col-md-4 col-xl-3">
                    <ProductCard product={p} onQuickView={setQuickView} />
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="pagination-custom">
                <button className="page-btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>‹</button>
                {Array.from({length: totalPages}, (_, i) => (
                  <button key={i+1} className={`page-btn${page===i+1?' active':''}`} onClick={() => setPage(i+1)}>{i+1}</button>
                ))}
                <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page===totalPages}>›</button>
              </div>
            )}
          </main>
        </div>
      </div>

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
};

export default Shop;
