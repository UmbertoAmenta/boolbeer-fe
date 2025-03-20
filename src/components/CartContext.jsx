import { createContext, useContext, useState, useEffect } from "react";

// Creazione del contesto per il carrello
const CartContext = createContext();

// Custom hook per utilizzare il contesto del carrello
export const useCart = () => {
  return useContext(CartContext);
};

// Provider del carrello
const CartProvider = ({ children }) => {
  // Stato del carrello inizializzato con i dati salvati in localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    console.log("Carrello caricato da localStorage:", savedCart);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Effetto per aggiornare localStorage ogni volta che il carrello cambia
  useEffect(() => {
    console.log("Carrello aggiornato:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Funzione per aggiungere un prodotto al carrello
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      // Controlla se il prodotto è già presente nel carrello
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Se esiste, aggiorna solo la quantità
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Se non esiste, aggiunge il nuovo prodotto
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Incrementa la quantità di un prodotto nel carrello
  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrementa la quantità di un prodotto nel carrello (rimuove se quantità = 1)
  const decrementQuantity = (productId) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item.id === productId) {
              return item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : null;
            }
            return item;
          })
          .filter((item) => item !== null) // Filtra gli elementi null (rimossi)
    );
  };

  // Rimuove completamente un prodotto dal carrello
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
