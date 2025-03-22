import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CartButton from "../components/CartButton";
import WishlistButton from "../components/WishlistButton";
//import { useWishlist } from "../context/wishlistContext";
// import { generateSlug } from "../utils/slug";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  // const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  // Quando lo slug cambia, scrolla in cima e carica il prodotto
  useEffect(() => {
    if (slug) {
      window.scrollTo(0, 0);
      axios
        .get(`http://localhost:3000/product/${slug}`)
        .then((res) => {
          setProduct(res.data.product);
          setError(null);
        })
        .catch((error) => {
          console.error("Errore nel fetch del prodotto:", error);
          setError("Prodotto non trovato");
        });
    } else {
      setError("Prodotto non trovato");
    }
  }, [slug]);

  // se presente, mostra l'errore per evitare che venga caricata la pagina senza i dati
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
          <Link to="/">
            <i className="fa-solid fa-arrow-left text-2xl mb-2"></i>
          </Link>
          <h2 className="text-red-700">{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left text-2xl mb-2 cursor-pointer"></i>
        </button>
        <div className="flex flex-col md:flex-row">
          {/* Sezione immagine prodotto e logo brand */}
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <img
              src={`http://localhost:3000/imgs/loghi_brands/${product.brand_logo}`}
              alt="logo-brand"
              className="h-20 w-20 object-contain absolute top-0 left-0"
              loading="lazy"
            />
            <img
              src={`http://localhost:3000/imgs/${product.product_image}`}
              alt={product.product_name}
              className="h-120 object-contain m-auto"
              loading="lazy"
            />
          </div>
          {/* Sezione descrittiva del prodotto */}
          <div className="mt-4 md:mt-0 md:ml-8 flex-1">
            <h3 className="text-xl font-bold">
              {product.product_name} - {product.product_volume}ml
            </h3>
            <h2 className="my-2 text-2xl font-bold text-green-700">
              {product.product_price}€
            </h2>
            <ul className="my-4 flex flex-col gap-y-4">
              <li>
                <span className="inline-block w-35 font-semibold">
                  Produttore:
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
                <span className="inline-block w-35 font-semibold">Paese:</span>
                <span>{product.brand_place}</span>
              </li>
              <li>
                <span className="inline-block w-35 font-semibold">Stile:</span>
                <span>
                  {(product.details && product.details[0]?.style) || "N/A"}
                </span>
              </li>
              <li>
                <span className="inline-block w-35 font-semibold">
                  % Alcol:
                </span>
                <span>{product.product_abv}%</span>
              </li>
              <li>
                <span className="inline-block w-35 font-semibold">Colore:</span>
                <span>
                  {(product.details && product.details[0]?.color) || "N/A"}
                </span>
              </li>
              <li>
                <span className="inline-block w-35 font-semibold">
                  Descrizione:
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
              <CartButton product={product} />

              {/* Pulsante aggiungi alla wishlist */}
              <WishlistButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
