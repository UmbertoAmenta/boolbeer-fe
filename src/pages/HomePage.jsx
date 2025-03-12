// COMPONENTS
import Hero from "../components/Hero";
import FilteredSection from "../components/FilteredSection";

export default function HomePage() {
  // filter: 10 newest products (by id)
  const filterNewestProducts = (products) => {
    return products.sort((a, b) => b.id - a.id).slice(0, 10);
  };

  // filter: 10 best sellers
  const filterBestSellersProducts = (products) => {
    return products.sort((a, b) => b.sales - a.sales).slice(0, 10);
  };

  return (
    // container
    <div>
      <Hero />
      <FilteredSection filterLogic={filterNewestProducts}>
        <h3>Gli ultimi arrivi</h3>
      </FilteredSection>
      <FilteredSection filterLogic={filterBestSellersProducts}>
        <h3>I più venduti</h3>
      </FilteredSection>
    </div>
  );
}
