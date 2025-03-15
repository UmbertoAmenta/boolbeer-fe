import React, { useState } from "react";
import Hero from "../components/Hero";
import FilteredSection from "../components/FilteredSection";
import AgeVerificationModal from "../components/AgeVerificationModal";

export default function HomePage() {
  const [showModal, setShowModal] = useState(true);

  const filterNewestProducts = (products) => {
    return products.sort((a, b) => b.product_id - a.product_id).slice(0, 10);
  };

  const filterBestSellersProducts = (products) => {
    return products.sort((a, b) => b.total_quantity_sold - a.total_quantity_sold).slice(0, 10);
  };

  return (
    <div>
      {showModal && <AgeVerificationModal onClose={() => setShowModal(false)} />}
      <Hero />
      <div className="container xl:max-w-320 mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800">Gli ultimi arrivi</h2>
        <FilteredSection filterLogic={filterNewestProducts} />
        <h2 className="text-2xl font-bold text-gray-800 mt-2">I più venduti</h2>
        <FilteredSection filterLogic={filterBestSellersProducts} />
      </div>
    </div>
  );
}
