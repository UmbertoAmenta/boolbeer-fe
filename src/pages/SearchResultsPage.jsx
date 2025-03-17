import { useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import ProductCard from "../components/ProductCard";

export default function SearchResultsPage() {
  const { products } = useSearchContext(); // Ottiene i prodotti filtrati dal contesto di ricerca
  const [sortOption, setSortOption] = useState("recent"); // Variabile per la gestione dell'opzione di ordinamento

  // Ordinamento dei prodotti (.localeCompare distribuisce più stringhe in ordine alfabetico  )
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price") {
      return a.product_price - b.product_price;
    } else if (sortOption === "name") {
      return a.product_name.localeCompare(b.product_name);
    } else {
      return b.product_id - a.product_id;
    }
  });

  return (
    <div className="container xl:max-w-320 mx-auto px-4">
      <div className="py-4 text-xl">
        <label className="font-semibold">Ordina per:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="recent">Recenti</option>
          <option value="price">Prezzo</option>
          <option value="name">Nome</option>
        </select>
      </div>
      {sortedProducts.length > 0 ? ( // Se ci sono risultati, mostra la lista dei prodotti
        <div>
          <div className="rounded-lg mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sortedProducts.map((product) => (
                <div className="col" key={product.product_id}>
                  <ProductCard
                    name={product.product_name}
                    image={product.product_image}
                    volume={product.product_volume}
                    abv={product.product_abv}
                    description={product.product_description}
                    price={product.product_price}
                    link={`/product/${product.product_id}`}
                    product_disponibility={product.product_disponibility}
                    brand={product.brand_logo}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Nessun prodotto trovato.</p> // Messaggio mostrato se non ci sono risultati
      )}
    </div>
  );
}
