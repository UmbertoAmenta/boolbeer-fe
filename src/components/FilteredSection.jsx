import { useState, useEffect } from "react";
import axios from "../api/axios";

import ProductCard from "./ProductCard";

export default function FilteredSection({ children, filterLogic }) {
  // new products
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get("/alldata").then((res) => {
      const filteredProducts = filterLogic
        ? filterLogic(res.data.products)
        : res.data.products;
      setProducts(filteredProducts);
    });
  };

  useEffect(fetchProducts, [filterLogic]);

  return (
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
              link={`product/${product.product_id}`}
              product_disponibility={product.product_disponibility}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
