import { useState, useEffect } from "react";
import axios from "../api/axios";

import ProductCard from "./ProductCard";

export default function FilteredSection({ children, filterLogic }) {
  // new products
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get("/products").then((res) => {
      const filteredProducts = filterLogic ? filterLogic(res.data) : res.data;
      setProducts(filteredProducts);
    });
  };

  useEffect(fetchProducts, [filterLogic]);

  return (
    <div className="p-4">
      <div>{children}</div>
      {products.map((product) => {
        return <ProductCard key={product.id} {...product} />;
      })}
    </div>
  );
}
