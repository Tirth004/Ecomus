import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ecomus-cart')) || [];
      return saved.map(item => ({
        ...item,
        color: typeof item.color === 'object' && item.color !== null ? item.color.name : item.color
      }));
    } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ecomus-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, size = null, color = null) => {
    const colorStr = typeof color === 'object' && color !== null ? color.name : color;
    
    setCartItems(prev => {
      const existing = prev.find(item => 
        item.id === product.id && item.size === size && item.color === colorStr
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size && item.color === colorStr
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, size, color: colorStr }];
    });
  };

  const removeFromCart = (id, size, color) => {
    setCartItems(prev => prev.filter(
      item => !(item.id === id && item.size === size && item.color === color)
    ));
  };

  const updateQuantity = (id, size, color, quantity) => {
    if (quantity < 1) {
      removeFromCart(id, size, color);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity,
      clearCart, cartTotal, cartCount, isCartOpen, setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
