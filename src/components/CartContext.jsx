import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    console.log("Carrello caricato da localStorage:", savedCart);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    console.log("Carrello aggiornato:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const updatedCart = cart.reduce((acc, item) => {
      if (item.id === product.id) {
        return [...acc, { ...item, quantity: item.quantity + quantity }];
      }
      return [...acc, item];
    }, []);

    if (updatedCart.length === cart.length) {
      setCart([...cart, { ...product, quantity }]);
    } else {
      setCart(updatedCart);
    }
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);
    setCart(updatedCart);
  };

  const removeFromCart = (productId, quantity) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === productId && item.quantity === quantity)
    );
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
