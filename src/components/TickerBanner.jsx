import '../styles/ticker.css';

const TickerBanner = () => {
  const items = Array(12).fill('Spring Clearance Event: Save Up to 70%');

  return (
    <div className="ticker-banner">
      <div className="ticker-track">
        {items.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20">
                <path d="M14.5833 8H8.61742L9.94318 0L0 12H5.96591L4.64015 20L14.5833 8" fill="currentColor"></path>
              </svg>
            </span>
            <span className="ticker-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerBanner;
