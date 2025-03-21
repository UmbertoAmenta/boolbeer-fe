import React from "react";
import { useWishlist } from "../context/wishlistContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { slug } = useParams();

  return (
    <div className="max-w-6xl mt-12 mx-auto p-4">
      <div className="">
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
          <ul className="bg-white/50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4 font-bold">La tua wishlist</h2>

            {wishlist.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white my-2 px-4 rounded-lg shadow-md"
              >
                <Link to={`/product/${slug}`}>
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
                  className=" text-xl py-1 px-3 rounded-md hover:scale-105 cursor-pointer transition duration-200"
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
