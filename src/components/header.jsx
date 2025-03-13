import React from "react";

export default function Header() {
  return (
    <header className="bg-orange-200  text-gray-800">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">BoolBeer</h1>
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
