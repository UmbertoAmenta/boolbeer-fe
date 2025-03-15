import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } =
    useCart();

  const handleRemoveFromCart = (productId, quantity) => {
    removeFromCart(productId, quantity);
  };
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl mb-4 font-bold">Il tuo carrello</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Il carrello è vuoto.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-4 border-b pb-4">
                <div className="flex flex-col">
                  <img
                    src={`http://localhost:3000/imgs/${item.product_image}`}
                    alt={item.product_name}
                    className="h-100 object-contain"
                  />
                  <strong className="text-lg">{item.product_name}</strong>
                  <span>
                    {item.quantity} x €{item.product_price}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="text-gray-800 hover:text-gray-600 cursor-pointer text-2xl mr-2">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="text-gray-800 hover:text-gray-600 text-2xl cursor-pointer mr-2">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(item.id, item.quantity)}
                    className="text-red-600 hover:text-red-800 cursor-pointer font-semibold">
                    Rimuovi
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
