import axios from "../api/axios";
import { useState, useEffect } from "react";

// COMPONENTS
import Hero from "../components/Hero";
import FilteredSection from "../components/FilteredSection";

// Placeholder
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  return (
    // container
    <div>
      <Hero />
      <FilteredSection>
        <h3>Gli ultimi arrivi</h3>
      </FilteredSection>
      <FilteredSection>
        <h3>I più venduti</h3>
      </FilteredSection>
    </div>
  );
}
