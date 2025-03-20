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
  };

  // Funzione per gestire l'invio del form e navigare alla pagina di ricerca
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!search.trim()) {
      setProducts(allProducts);
    } else {
      // Filtra i prodotti in base al nome
      const filteredProducts = allProducts.filter((product) =>
        product.product_name.toLowerCase().includes(search)
      );
      setProducts(filteredProducts);
    }

    navigate("/search/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="rounded-l-2xl p-2 w-40 bg-white/40 items-center"
        name="search"
        type="search"
        placeholder="Cerca prodotti..."
        value={search}
        onChange={handleSearch}
      />
      <button
        className="hover:cursor-pointer p-2 bg-orange-400 hover:bg-orange-500 transition duration-300 rounded-r-2xl"
        type="submit"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}
