import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cart) {
      const quantity = cart.reduce(
        (accumulator, currentItem) => accumulator + currentItem.quantity,
        0
      );
      setQuantity(quantity);
    }
  }, [cart]);

  function addToCart(product, id) {
    setCart((prevCart) => {
      const existingCart = prevCart.find((item) => item.id === id);

      if (existingCart) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function deleteFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  function incQuantity(id) {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  }

  function decQuantity(id) {
    setCart((prevCart) => {
      const moreThanOne = prevCart.find((item) => item.id === id);

      if (moreThanOne.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== id);
      }
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteFromCart,
        clearCart,
        quantity,
        incQuantity,
        decQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
