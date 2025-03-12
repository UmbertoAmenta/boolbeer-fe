import axios from "../api/axios";
import { useState, useEffect } from "react";

// COMPONENTS
import Hero from "../components/Hero";
import FilteredSection from "../components/FilteredSection";

// Placeholder
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  // filtro: i 10 prodotti più recenti (id più alto)
  const filterNewProducts = (products) => {
    return products.sort((a, b) => b.id - a.id).slice(0, 10);
  };

  // filtro: i 10 prodotti più venduti (al momento i più costosi)
  const filterTopSellingProducts = (products) => {
    return products.sort((a, b) => b.price - a.price).slice(0, 10);
  };
  return (
    // container
    <div>
      <Hero />
      <FilteredSection filterLogic={filterNewProducts}>
        <h3>Gli ultimi arrivi</h3>
      </FilteredSection>
      <FilteredSection filterLogic={filterTopSellingProducts}>
        <h3>I più venduti</h3>
      </FilteredSection>
    </div>
  );
}
