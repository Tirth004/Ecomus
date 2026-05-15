import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';

const FlashSale = () => {
  const [quickView, setQuickView] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 47, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const saleProducts = products.filter(p => p.isSale).slice(0, 4);
  const pad = n => String(n).padStart(2, '0');

  return (
    <section className="flash-sale-section">
      <div className="container">
        <div className="flash-sale-header">
          <div>
            <div className="flash-badge">
              <i className="bi bi-lightning-fill"></i> Flash Sale
            </div>
            <h2 style={{marginTop:12}}>Deal of the Day</h2>
          </div>
          <div>
            <p style={{color:'rgba(255,255,255,0.6)', fontSize:13, marginBottom:8, textAlign:'center'}}>Ends in</p>
            <div className="countdown-timer">
              <div className="timer-block">
                <span className="timer-number">{pad(timeLeft.hours)}</span>
                <span className="timer-label">Hours</span>
              </div>
              <span className="timer-separator">:</span>
              <div className="timer-block">
                <span className="timer-number">{pad(timeLeft.minutes)}</span>
                <span className="timer-label">Mins</span>
              </div>
              <span className="timer-separator">:</span>
              <div className="timer-block">
                <span className="timer-number">{pad(timeLeft.seconds)}</span>
                <span className="timer-label">Secs</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3">
          {saleProducts.map(product => (
            <div key={product.id} className="col-6 col-md-3">
              <ProductCard product={product} onQuickView={setQuickView} />
            </div>
          ))}
        </div>

        <div style={{textAlign:'center', marginTop:36}}>
          <Link to="/shop?filter=sale" className="btn-outline-custom" style={{borderColor:'rgba(255,255,255,0.5)', color:'#fff'}}
            onMouseEnter={e=>{e.target.style.background='#fff';e.target.style.color='#1a1a1a';}}
            onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color='#fff';}}>
            View All Sale Items
          </Link>
        </div>
      </div>

      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </section>
  );
};

export default FlashSale;
