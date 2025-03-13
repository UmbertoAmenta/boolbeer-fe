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
    <div className=" bg-orange-50 rounded-lg container mx-auto overflow-x-auto mb-4">
      <div className="flex flex-row max-width: 1000px; gap-4">
        <div>{children}</div>
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
