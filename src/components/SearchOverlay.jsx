import { useState } from 'react';
import { products } from '../data/products';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  const results = query.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className={`search-popup${isOpen ? ' open' : ''}`}>
      <div className="container">
        <div className="search-popup-inner">
          <i className="bi bi-search" style={{fontSize:20, color:'var(--text-secondary)'}}></i>
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus={isOpen}
          />
          <button className="search-close-btn" onClick={() => { onClose(); setQuery(''); }}>×</button>
        </div>
        {results.length > 0 && (
          <div style={{maxWidth:'var(--container-max)', margin:'16px auto 0', padding:'0 15px'}}>
            <div style={{background:'#fff', border:'1px solid var(--border-color)', borderRadius:'var(--radius-lg)', overflow:'hidden', boxShadow:'var(--card-shadow)'}}>
              {results.slice(0, 6).map(p => (
                <a key={p.id} href={`/product/${p.id}`} onClick={onClose}
                  style={{display:'flex', alignItems:'center', gap:14, padding:'12px 16px', borderBottom:'1px solid var(--border-color)'}}>
                  <img src={p.image} alt={p.name} style={{width:44, height:56, objectFit:'cover', borderRadius:6}} />
                  <div>
                    <div style={{fontSize:14, fontWeight:600}}>{p.name}</div>
                    <div style={{fontSize:13, color:'var(--secondary)', fontWeight:700}}>${p.price.toFixed(2)}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        {query.length > 1 && results.length === 0 && (
          <div style={{maxWidth:'var(--container-max)', margin:'16px auto 0', padding:'0 15px', textAlign:'center', color:'var(--text-secondary)'}}>
            No products found for "<strong>{query}</strong>"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
