import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { CartContext } from "./CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);

  // Calcolo della quantità totale dei prodotti nel carrello
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-orange-200  text-gray-800 shadow-xl sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to={"/"}>
          <img className="w-20" src="./logo_boolshop.png" alt="logo" />
        </Link>

        <div className="flex items-center gap-4">
          <nav
            className={`transition-all duration-300 absolute md:relative top-25 md:top-auto w-full right-0 md:w-auto bg-orange-200 md:bg-transparent p-4 md:p-0 flex flex-col md:flex-row md:gap-6 items-cente ${
              menuOpen ? "block" : "hidden"
            } md:flex`}
          >
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-center">
              <li>
                <Link
                  to="/"
                  className="hover:bg-white/40 hover:font-bold px-4 py-2 rounded-2xl transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/search"}
                  className="hover:bg-white/40 hover:font-bold p-2 rounded-2xl transition duration-200"
                >
                  Prodotti
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:bg-white/40 hover:font-bold p-2 rounded-2xl transition duration-200"
                >
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:bg-white/40 hover:font-bold p-2 rounded-2xl transition duration-200"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </nav>

          {/* SearchBar */}
          <SearchBar />

          {/* Icona del Carrello con Badge di Notifica */}
          <Link
            to="/cart"
            className="relative hover:text-gray-900 hover:font-bold"
          >
            <i className="fa-solid fa-cart-shopping hover:text-black transition duration-200 text-3xl mr-2"></i>

            {/* Mostra il pallino solo se ci sono prodotti nel carrello */}
            {totalQuantity > 0 && (
              <span className="shadow absolute -top-2 -right-1 bg-red-600 text-white text-xs rounded-xl px-2 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars hover:text-black transition duration-200 text-3xl cursor-pointer"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
