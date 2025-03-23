import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Funzione helper per attendere un certo tempo (opzionale)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));

  // Funzione per ricaricare il carrello dal backend
  const refreshCart = async (id) => {
    try {
      const res = await axios.get(`/cart/${id}`);
      console.log("Carrello aggiornato:", res.data.items);
      setCart(res.data.items);
    } catch (error) {
      console.error("Errore nel refresh del carrello:", error);
    }
  };

  // Inizializza il carrello
  useEffect(() => {
    const initializeCart = async () => {
      try {
        let id = cartId;
        if (!id) {
          const response = await axios.post("/cart/create");
          id = response.data.cartId;
          setCartId(id);
          localStorage.setItem("cartId", id);
        }
        await refreshCart(id);
      } catch (error) {
        console.error("Errore nell'inizializzazione del carrello:", error);
      }
    };

    initializeCart();
  }, []);

  // Funzione per aggiungere un prodotto
  const addToCart = async (product, quantity) => {
    try {
      await axios.post("/cart/add", {
        cartId,
        productId: product.product_id || product.id,
        quantity,
      });
      // Aspetta un attimo e ricarica il carrello
      await delay(100);
      await refreshCart(cartId);
    } catch (error) {
      console.error("Errore durante l'aggiunta al carrello:", error);
    }
  };

  // Incrementa la quantità
  const incrementQuantity = async (productId) => {
    try {
      await axios.post("/cart/add", {
        cartId,
        productId,
        quantity: 1,
      });
      await delay(100);
      await refreshCart(cartId);
    } catch (error) {
      console.error("Errore nell'incremento della quantità:", error);
    }
  };

  // Decrementa la quantità o rimuove il prodotto
  const decrementQuantity = async (productId, currentQuantity) => {
    try {
      if (currentQuantity > 1) {
        await axios.post("/cart/add", {
          cartId,
          productId,
          quantity: -1,
        });
        await delay(100);
        await refreshCart(cartId);
      } else {
        await removeFromCart(productId);
      }
    } catch (error) {
      console.error("Errore nel decremento della quantità:", error);
    }
  };

  // Rimuove un prodotto dal carrello
  const removeFromCart = async (productId) => {
    try {
      await axios.delete("/cart/remove", {
        data: { cartId, productId },
      });
      await delay(100);
      await refreshCart(cartId);
    } catch (error) {
      console.error("Errore nella rimozione dal carrello:", error);
    }
  };

  // Completa l'ordine (non svuota il carrello sul frontend)
  const completeOrder = async (cartId) => {
    try {
      await axios.post("/cart/complete", { cartId });
      await delay(100);
      await refreshCart(cartId);
    } catch (error) {
      console.error("Errore durante la finalizzazione dell'ordine:", error);
    }
  };

  // Funzione per svuotare il carrello sul frontend
  const clearCart = () => {
    setCart([]);
    setCartId(null);
    localStorage.removeItem("cartId");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        completeOrder,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
