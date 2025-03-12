import { useState, useEffect } from "react";
import axios from "../api/axios";

import ProductCard from "./ProductCard";

export default function FilteredSection({ children }) {
  // new products
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get("/products").then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(fetchProducts, []);

  return (
    <div>
      <div>{children}</div>
      {products.map((product) => {
        return <ProductCard key={product.id} {...product} />;
      })}
    </div>
  );
}
