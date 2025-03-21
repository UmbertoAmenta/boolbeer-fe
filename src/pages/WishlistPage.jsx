import React from "react";
import { useWishlist } from "../context/wishlistContext";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">La tua Wishlist</h1>
      <div>
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <Link to="/search">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-download-in-svg-png-gif-file-formats--online-shop-store-shopping-site-marketplace-states-pack-windows-interface-illustrations-9824480.png"
                alt="wishlist vuota"
                className="w-100 animate-pulse"
              />
            </Link>
            <p className="text-gray-500">
              La tua wishlist è vuota! Aggiungi prodotti che ti interessano.
            </p>
          </div>
        ) : (
          <ul>
            {wishlist.map((item) => (
              <li key={item.id} className="flex justify-between mb-4">
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
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className=" text-xl py-1 px-3 rounded-md hover:text-2xl cursor-pointer"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
