import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BoolBeer. Tutti i diritti riservati.
        </p>
        <div className="flex space-x-4">
          <a href="/privacy" className="text-sm hover:text-gray-300">
            Privacy
          </a>
          <a href="/terms" className="text-sm hover:text-gray-300">
            Termini
          </a>
        </div>
      </div>
    </footer>
  );
}
