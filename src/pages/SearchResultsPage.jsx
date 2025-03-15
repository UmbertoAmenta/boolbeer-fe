import { useSearchContext } from "../context/SearchContext";
import ProductCard from "../components/ProductCard";

export default function SearchResultsPage() {
  const { products } = useSearchContext(); // Ottiene i prodotti filtrati dal contesto di ricerca

  return (
    <div>
      <h2>Risultati della ricerca</h2>
      {products.length > 0 ? ( // Se ci sono risultati, mostra la lista dei prodotti
        <div className="container xl:max-w-320 mx-auto px-4">
          <div className="rounded-lg mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
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
