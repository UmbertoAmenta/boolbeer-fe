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
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 }; // Aumenta la quantità
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          // Se la quantità è maggiore di 1, decrementa
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Se la quantità è 1, rimuovi l'articolo dal carrello
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null); // Filtra gli articoli nulli (quelli rimossi)
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
