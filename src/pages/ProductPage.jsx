import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/product/${id}`).then((res) => {
      setProduct(res.data.product);
    });
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <Link to="/">
          <i className="fa-solid fa-arrow-left text-2xl mb-2"></i>
        </Link>
        <div className="flex justify-evenly">
          <div className="relative w-50 ">
            <img
              src={`http://localhost:3000/imgs/loghi_brands/${product.brand_logo}`}
              alt="logo-brand"
              className="h-10 w-10 object-contain absolute top-0 left-0"
            />
            <img
              src={`http://localhost:3000/imgs/${product.product_image}`}
              alt={product.product_name}
              className="h-120 object-contain"
            />
          </div>
          <div>
            <h3>
              <strong>
                {product.product_name} - {`${product.product_volume}ml`}
              </strong>
            </h3>
            <h2 className="my-2 text-2xl text-green-700">
              <em>€{product.product_price}</em>
            </h2>
            <ul className="my-4 flex flex-col gap-y-4">
              <li>
                <span className="inline-block w-35">
                  <strong>Produttore:</strong>
                </span>
                <span>
                  <a
                    href={`https://${product.brand_web_site}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline hover:text-blue-900"
                  >
                    {product.brand_name}
                  </a>
                </span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>Paese:</strong>
                </span>
                <span>{product.brand_place}</span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>Stile:</strong>
                </span>
                <span>
                  {(product.details && product.details[0]?.style) || "N/A"}
                </span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>% Alcol:</strong>
                </span>
                <span>{product.product_abv}%</span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>Colore:</strong>
                </span>
                <span>
                  {(product.details && product.details[0]?.color) || "N/A"}
                </span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>Descrizione:</strong>
                </span>
                <span>{product.product_description}</span>
              </li>
            </ul>
            <div
              className={
                product.product_disponibility > 0
                  ? "text-green-700 font-bold"
                  : "text-red-700 font-bold"
              }
            >
              {product.product_disponibility > 0
                ? "Disponibile"
                : "Non disponibile"}
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="number"
                placeholder={1}
                min={1}
                max={product.product_disponibility}
                className="border border-neutral-500 rounded-lg p-2 mr-2 w-15"
              />

              <button
                type="button"
                className="text-gray-600 transition duration-200 hover:text-gray-700 hover:scale-120"
              >
                <i className="fa-solid fa-cart-shopping bg-orange-200 p-3 rounded hover:bg-orange-300 transition duration-200 mr-2"></i>
              </button>
              <button
                type="button"
                className="bg-orange-400 px-4 py-2 rounded hover:bg-orange-500 transition duration-200 hover:scale-105"
              >
                Vai al carrello
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
