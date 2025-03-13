import React from "react";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="bg-orange-200  text-gray-800 shadow-xl sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to={"/"}>
          <img className="w-20" src="./logo_boolshop.png" alt="logo" />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-gray-900 hover:font-bold">
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-gray-900 hover:font-bold"
              >
                Prodotti
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-900 hover:font-bold">
                Chi Siamo
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-gray-900 hover:font-bold"
              >
                Contatti
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
