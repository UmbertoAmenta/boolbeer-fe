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
      <div className="container mx-auto ">
        <h2 className="text-2xl font-bold text-gray-800 mt-2">
          Gli ultimi arrivi
        </h2>
        <FilteredSection filterLogic={filterNewestProducts} />
        <h2 className="text-2xl font-bold text-gray-800 mt-2">I più venduti</h2>
        <FilteredSection filterLogic={filterBestSellersProducts} />
      </div>
    </div>
  );
}
