import React, { useState } from "react";
import { useWishlist } from "../context/wishlistContext";

const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [showPopup, setShowPopup] = useState(false);

  const isInWishlist = wishlist.some(
    (item) => item.product_id === product.product_id
  );

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product.product_id);
    } else {
      addToWishlist(product);
    }

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  return (
    <div className="mt-4 flex items-center">
      {/* Bottone della wishlist */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className="text-gray-600 transition duration-200 hover:text-gray-700 hover:scale-120 cursor-pointer"
        aria-label={
          isInWishlist ? "Rimuovi dal carrello" : "Aggiungi al carrello"
        }
      >
        {/* Aggiungi le classi condizionali per il cuore pieno o vuoto */}
        <i
          className={`fa${
            isInWishlist ? "s" : "r"
          } fa-heart  bg-orange-200 p-3 w-11 rounded hover:bg-orange-400 transition duration-200 mr-2 ${
            isInWishlist ? "text-gray-500" : "text-gray-500"
          }`}
        ></i>
      </button>
    </div>
  );
};

export default WishlistButton;
