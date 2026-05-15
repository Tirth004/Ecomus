import { useState } from 'react';

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="announcement-bar">
      <span>
        🔥 Summer Sale — Up to <strong>50% OFF</strong> on selected items!{' '}
        <a href="/shop">Shop Now →</a>
      </span>
      <button className="close-ann" onClick={() => setVisible(false)} aria-label="Close">×</button>
    </div>
  );
};

export default AnnouncementBar;
