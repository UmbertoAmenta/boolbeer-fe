import React, { useState } from "react";
import { useCart } from "./CartContext";

const CartButton = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
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
        className="text-gray-600 transition duration-200 hover:text-gray-700 hover:scale-120 cursor-pointer">
        <i className="fa-solid fa-cart-shopping bg-orange-200 p-3 rounded hover:bg-orange-300 transition duration-200 mr-2"></i>
      </button>
    </div>
  );
};

export default CartButton;
