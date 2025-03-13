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
    <div className=" bg-orange-50 rounded-lg container mx-auto overflow-x-auto mb-">
      <div className="flex flex-row max-width: 1000px; gap-4">
        <div>{children}</div>
        {products.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard
              name={product.name}
              image={product.image}
              volume={product.volume}
              abv={product.abv}
              description={product.description}
              price={product.price}
              link={`product/${product.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
