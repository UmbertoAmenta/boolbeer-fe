import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">BoolBeer</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-gray-300">
                Prodotti
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-300">
                Chi Siamo
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-300">
                Contatti
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
