// components/CartButton.jsx
import React, { useState } from "react";
import axios from "../api/axios";
import { useCart } from "./CartContext";

const CartButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      // Recupera (o crea) il cartId
      let cartId = localStorage.getItem("cartId");
      if (!cartId) {
        // Se non esiste, crea un nuovo carrello
        const createRes = await axios.post("/cart/create");
        cartId = createRes.data.cartId;
        localStorage.setItem("cartId", cartId);
      }

      // Usa product.product_id se presente, altrimenti product.id
      const productId = product.product_id || product.id;

      // A questo punto abbiamo un cartId, possiamo aggiungere il prodotto
      const addRes = await axios.post("/cart/add", {
        cartId,
        productId,
        quantity,
      });
      console.log("Prodotto aggiunto al carrello:", addRes.data.items);

      addToCart(product, quantity);

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error("Errore durante l'aggiunta al carrello:", error);
    }
  };

  return (
    <div>
      <div className="mt-4 flex items-center">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          max={product.product_disponibility}
          className="border border-neutral-500 rounded-lg p-2 mr-2 w-15"
        />
        <button
          type="button"
          onClick={handleAddToCart}
          className="text-gray-600 transition duration-200 hover:text-gray-700 hover:scale-120 cursor-pointer"
        >
          <i className="fa-solid fa-cart-shopping bg-orange-200 p-3 rounded hover:bg-orange-400 transition duration-200 mr-2"></i>
        </button>
      </div>

      {showPopup && (
        <div className="absolute top-0 right-0 bg-green-700 text-white p-3 rounded-lg shadow-lg m-3">
          Prodotto aggiunto al carrello!
        </div>
      )}
    </div>
  );
};

export default CartButton;
