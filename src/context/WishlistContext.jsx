import { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const local = JSON.parse(localStorage.getItem('ecomus-wishlist'));
      if (local && local.length > 0) return local;
      // Pre-populate with first 4 products to match the visual layout of the reference
      return products.slice(0, 4);
    } catch { 
      return products.slice(0, 4); 
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ecomus-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id) => wishlistItems.some(item => item.id === id);
  const toggleWishlist = (product) => {
    isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const clearWishlist = () => setWishlistItems([]);
  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems, addToWishlist, removeFromWishlist,
      isInWishlist, toggleWishlist, wishlistCount, clearWishlist,
      isWishlistOpen, setIsWishlistOpen
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
