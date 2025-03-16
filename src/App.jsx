import { BrowserRouter, Routes, Route } from "react-router";
import { CartProvider } from "./components/CartContext";
import { SearchProvider } from "./context/SearchContext";
//Layouts
import DefaultLayout from "./Layouts/DefaultLayout";

//Pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  );
}
