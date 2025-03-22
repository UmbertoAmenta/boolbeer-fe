import React from "react";
import { useWishlist } from "../context/wishlistContext";
import { Link } from "react-router-dom";
import { generateSlug } from "../utils/slug";
import { useParams } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { slug } = useParams();
  // Calcola la quantità totale dei prodotti nel carrello
  const totalItemWishlist = wishlist.length;

  return (
    <div className="max-w-6xl mx-auto p-4">
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
              La tua lista dei desideri è vuota! Aggiungi prodotti che ti
              interessano.
            </p>
          </div>
        ) : (
          <ul className="bg-white/50 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl mb-4 font-bold">
              La tua lista dei desideri
            </h2>
            <p className="text-xl mb-4">
              Elementi nella tua lista dei desideri: {totalItemWishlist}
            </p>

            {wishlist.map((item) => (
              <li
                key={item.product_id}
                className="flex justify-between items-center bg-white my-2 px-4 rounded-lg shadow-md">
                <Link to={`/product/${generateSlug(item.product_name)}`}>
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
                  onClick={() => removeFromWishlist(item.product_id)}
                  className=" text-xl py-1 px-3 rounded-md  text-neutral-800 transition duration-200 hover:text-neutral-900 hover:scale-110 cursor-pointer">
                  <i className="fa-solid fa-trash"></i>
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
