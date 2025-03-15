import { useSearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  // Recupero delle funzioni e stati dal contesto della ricerca
  const { search, setSearch, setProducts, allProducts } = useSearchContext();
  const navigate = useNavigate(); // Hook per la navigazione tra le pagine

  // Funzione per gestire il filtraggio dei prodotti in base all'input dell'utente
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase(); // Converte il testo in minuscolo per ricerche case-insensitive
    setSearch(query);

    if (query === "") {
      setProducts(allProducts); // Se la barra di ricerca è vuota, mostra tutti i prodotti
    } else {
      // Filtra i prodotti in base al nome
      const filteredProducts = allProducts.filter((product) =>
        product.product_name.toLowerCase().includes(query)
      );
      setProducts(filteredProducts);
    }
  };

  // Funzione per gestire l'invio del form e navigare alla pagina di ricerca
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/search");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search-bar"
        name="search"
        type="search"
        placeholder="Cerca prodotti..."
        value={search}
        onChange={handleSearch}
      />
      <button className="search-bar-btn" type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}
