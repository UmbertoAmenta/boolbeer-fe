import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CartButton from "../components/CartButton";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    scroll;
  });

  useEffect(() => {
    // Scrolla in cima alla pagina
    window.scrollTo(0, 0);

    // Effettua la richiesta per ottenere i dettagli del prodotto
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

        <div className="">
          {/* Sezione immagine prodotto e logo brand */}
          <div className="relative w-full md:w-70 inline-block lg:w-100">
            <img
              src={`http://localhost:3000/imgs/loghi_brands/${product.brand_logo}`}
              alt="logo-brand"
              className="h-25 w-25 object-contain absolute top-0 left-0"
            />
            <img
              src={`http://localhost:3000/imgs/${product.product_image}`}
              alt={product.product_name}
              className="h-120 object-contain m-auto"
            />
          </div>
          {/* Sezione descrittiva del prodotto */}
          <div className="inline-block">
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
                    className="text-blue-700 underline hover:text-blue-900">
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
              }>
              {product.product_disponibility > 0
                ? "Disponibile"
                : "Non disponibile"}
            </div>
            <div className="mt-4 flex items-center">
              <CartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
