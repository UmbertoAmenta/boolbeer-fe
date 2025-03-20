// pages/CartPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function CartPage() {
  const { cartId: paramCartId } = useParams();
  const navigate = useNavigate();

  // Usa il parametro URL o, in assenza, quello salvato in localStorage
  const [cartId, setCartId] = useState(
    paramCartId || localStorage.getItem("cartId")
  );
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Funzione per caricare il carrello dal backend
  const loadCart = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`/cart/${id}`);
      setCartItems(res.data.items);
      setError(null);
    } catch (err) {
      console.error("Errore nel caricamento del carrello:", err);
      setError("Carrello non trovato o errore nel recupero");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function initCart() {
      // Esegui questa logica solo una volta
      if (initialized) return;

      if (!cartId) {
        // Caso: nessun cartId (né in URL né in localStorage) → crea un nuovo carrello
        try {
          setLoading(true);
          const res = await axios.post("/cart/create");
          const newCartId = res.data.cartId;
          setCartId(newCartId);
          localStorage.setItem("cartId", newCartId);
          // Reindirizza a /cart/{newCartId} per rendere condivisibile l'URL
          navigate(`/cart/${newCartId}`, { replace: true });
        } catch (err) {
          console.error("Errore nella creazione del carrello:", err);
          setError("Impossibile creare il carrello");
        } finally {
          setLoading(false);
          setInitialized(true);
        }
      } else {
        // Caso: abbiamo già un cartId → carica il carrello
        await loadCart(cartId);
        // Se l'URL non mostra il cartId corretto, forzalo
        if (!paramCartId || paramCartId !== cartId) {
          navigate(`/cart/${cartId}`, { replace: true });
        }
        setInitialized(true);
      }
    }
    initCart();
  }, [cartId, paramCartId, navigate, initialized]);

  // Funzione per incrementare la quantità di un prodotto
  const incrementQuantity = async (productId) => {
    try {
      const res = await axios.post("/cart/add", {
        cartId,
        productId,
        quantity: 1,
      });
      setCartItems(res.data.items);
    } catch (err) {
      console.error("Errore nell'incremento:", err);
    }
  };

  // Funzione per decrementare la quantità di un prodotto
  const decrementQuantity = async (productId, currentQuantity) => {
    try {
      if (currentQuantity > 1) {
        const res = await axios.post("/cart/add", {
          cartId,
          productId,
          quantity: -1,
        });
        setCartItems(res.data.items);
      } else {
        const res = await axios.delete("/cart/remove", {
          data: { cartId, productId },
        });
        setCartItems(res.data.items);
      }
    } catch (err) {
      console.error("Errore nel decremento:", err);
    }
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p className="text-red-700">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white/50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 font-bold">Il tuo carrello</h2>
        {cartId && (
          <p className="text-gray-600 mb-4">
            <strong>ID carrello:</strong> {cartId}
          </p>
        )}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <Link to="/search">
              <img
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                alt="carrello vuoto"
                className="w-100 animate-pulse"
              />
            </Link>
            <p className="text-gray-500">
              Il carrello è vuoto. Aggiungi almeno un articolo prima di
              procedere al check-out!
            </p>
          </div>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.product_id}
                  className="flex justify-between items-center bg-white my-2 px-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000/imgs/${item.image}`}
                      alt={item.name}
                      className="h-20 w-20 py-1 object-contain"
                    />
                    <div>
                      <h2 className="text-lg font-bold">{item.name}</h2>
                      <h3>
                        {item.quantity} x {item.price}€
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => incrementQuantity(item.product_id)}
                      className="text-gray-800 hover:text-gray-600 cursor-pointer text-2xl"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button
                      onClick={() =>
                        decrementQuantity(item.product_id, item.quantity)
                      }
                      className="text-gray-800 hover:text-gray-600 cursor-pointer text-2xl"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-start justify-between mt-6">
              <div className="text-xl font-semibold">
                Totale: <span className="font-bold">{total}€</span>
              </div>
              <Link to="/checkout">
                <button className="font-medium text-neutral-800 transition duration-200 hover:text-neutral-900 hover:scale-105 cursor-pointer bg-orange-200 hover:bg-orange-400 p-2 rounded">
                  Procedi al check-out
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
