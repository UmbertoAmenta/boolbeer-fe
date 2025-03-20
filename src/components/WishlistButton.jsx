import React, { useState } from "react";
import { useWishlist } from "../context/wishlistContext";

const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [showPopup, setShowPopup] = useState(false);

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="mt-4 flex items-center">
      {/* Bottone della wishlist */}
      <button
        type="button"
        onClick={handleWishlistClick}
        className="text-gray-600 transition duration-200 hover:text-gray-700 hover:scale-120 cursor-pointer">
        <i
          className={`fa${
            isInWishlist ? "s" : "r"
          } fa-heart text-xl bg-orange-200 p-3 rounded hover:bg-orange-400 transition duration-200 mr-2`}></i>
      </button>
    </div>
  );
};

export default WishlistButton;
