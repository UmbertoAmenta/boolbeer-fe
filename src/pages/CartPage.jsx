import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } =
    useCart();

  const handleRemoveFromCart = (productId, quantity) => {
    removeFromCart(productId, quantity);
  };

  // Calcolo totale carrello
  const total = cart
    .reduce((acc, item) => acc + item.product_price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white/50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 font-bold">Il tuo carrello:</h2>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <Link to="/search">
              <img
                src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                alt="carrello vuoto"
                className="w-100 animate-pulse"
              />
            </Link>
            <p className="text-gray-500">
              Il carrello è vuoto aggiungi almeno un articolo prima di procedere
              per il check-out!
            </p>
          </div>
        ) : (
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white my-2 px-4 rounded-lg shadow-md"
              >
                {/* Sezione immagine, nome, quantità e prezzo*/}
                <Link to={`/product/${item.product_id}`}>
                  <div className="flex items-center gap-4">
                    <div>
                      <img
                        src={`http://localhost:3000/imgs/${item.product_image}`}
                        alt={item.product_name}
                        className="h-20 w-20 py-1 object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">{item.product_name}</h2>
                      <h3>
                        {item.quantity} x {item.product_price}€
                      </h3>
                    </div>
                  </div>
                </Link>
                {/* Sezione per aggiungere, rimuovere prodotto */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="text-gray-800 hover:text-gray-600 cursor-pointer text-2xl mr-2"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="text-gray-800 hover:text-gray-600 text-2xl cursor-pointer mr-2"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id, item.quantity)}
                    className="text-red-600 hover:text-red-800 cursor-pointer font-semibold"
                  >
                    Rimuovi
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Sezione totale e checkout */}
        {cart.length === 0 ? null : (
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
        )}
      </div>
    </div>
  );
}
