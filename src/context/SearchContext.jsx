import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Creazione del context di ricerca
const SearchContext = createContext();

function SearchProvider({ children }) {
  // Stato per il valore della barra di ricerca
  const [search, setSearch] = useState("");
  // Stato per i prodotti filtrati che vengono mostrati
  const [products, setProducts] = useState([]);
  // Stato per mantenere tutti i prodotti originali recuperati dall'API
  const [allProducts, setAllProducts] = useState([]);

  // Effettua una chiamata API per ottenere tutti i prodotti al caricamento del componente
  useEffect(() => {
    axios
      .get("http://localhost:3000/alldata")
      .then((res) => {
        setProducts(res.data.products); // Imposta i prodotti iniziali
        setAllProducts(res.data.products); // Salva tutti i prodotti per i futuri filtraggi
      })
      .catch((err) =>
        console.error("Errore nel caricamento dei prodotti:", err)
      );
  }, []);

  return (
    <SearchContext.Provider
      value={{ search, setSearch, products, setProducts, allProducts }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// Hook personalizzato per utilizzare il context della ricerca
function useSearchContext() {
  return useContext(SearchContext);
}

export { SearchProvider, useSearchContext };
