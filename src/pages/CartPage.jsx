import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { generateSlug } from "../utils/slug";
export default function CartPage() {
  const { cart, incrementQuantity, decrementQuantity } = useCart();

  // Calcola il totale dell'ordine
  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center">
        <Link to="/search">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="carrello vuoto"
            className="w-100 animate-pulse"
          />
        </Link>
        <p className="text-gray-500">
          Il carrello è vuoto. Aggiungi almeno un articolo prima di procedere al
          check-out!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white/50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 font-bold">Il tuo carrello</h2>
        <ul>
          {cart.map((item) => (
            <li
              key={item.product_id}
              className="flex justify-between items-center bg-white my-2 px-4 rounded-lg shadow-md"
            >
              <Link to={`/product/${generateSlug(item.name)}`}>
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
              </Link>
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
      </div>
    </div>
  );
}
