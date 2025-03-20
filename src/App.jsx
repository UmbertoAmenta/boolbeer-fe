import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "./components/CartContext";
import { SearchProvider } from "./context/SearchContext";
import DefaultLayout from "./Layouts/DefaultLayout";

// Pagine
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CheckoutPage from "./pages/CheckoutPage";
import AgeVerificationModal from "./components/AgeVerificationModal";
import AccessDeniedPage from "./pages/AccessDeniedPage";

export default function App() {
  const [isVerified, setIsVerified] = useState(null);

  // Quando l'utente clicca "SI" (anche dopo l'inserimento dell'email)
  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  // Quando l'utente clicca "NO"
  const handleVerificationDenied = () => {
    setIsVerified(false);
  };

  // Se l'utente non ha ancora risposto, mostra esclusivamente la modale di verifica
  if (isVerified === null) {
    return (
      <AgeVerificationModal
        onClose={handleVerificationSuccess}
        onDeny={handleVerificationDenied}
      />
    );
  }

  // Se l'utente ha risposto "NO", mostra la pagina di Access Denied
  if (isVerified === false) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AccessDeniedPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Se l'utente è verificato, mostra il sito normalmente
  return (
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/search/:search" element={<SearchResultsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  );
}
