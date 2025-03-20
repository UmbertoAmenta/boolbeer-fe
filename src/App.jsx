import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "./components/CartContext";
import { SearchProvider } from "./context/SearchContext";
import DefaultLayout from "./Layouts/DefaultLayout";
import { WishlistProvider } from "./context/wishlistContext";

// Pagine
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import WishlistPage from "./pages/WishlistPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  const [isVerified, setIsVerified] = useState(null);

  // Se l'utente ha rifiutato l'accesso, mostra la pagina di Access Denied
  if (isVerified === false) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AccessDeniedPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <WishlistProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route
                  index
                  path="/"
                  element={
                    <HomePage
                      isVerified={isVerified}
                      setIsVerified={setIsVerified}
                    />
                  }
                />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/cart/:cartId" element={<CartPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/search/:search" element={<SearchResultsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/product/*" element={<PageNotFound />} />
                <Route path="/search/*" element={<PageNotFound />} />
                <Route path="/cart/*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </WishlistProvider>
  );
}
