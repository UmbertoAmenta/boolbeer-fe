import { Link } from "react-router";

export default function ProductPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
        <Link to="/">
          <i className="fa-solid fa-arrow-left text-2xl mb-2"></i>
        </Link>
        <div className="flex">
          <div className="w-30 h-50">
            <img src="#" alt="CH₃CH₂OH" />
            <img src="#" alt="logo" />
          </div>
          <div>
            <h3>
              <strong>Titolo - volume</strong>
            </h3>
            <h2>prezzo</h2>
            <ul>
              <li>
                <span className="inline-block w-35">
                  <strong>Produttore:</strong>
                </span>
                <span>?</span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>Paese:</strong>
                </span>
                <span>?</span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>Stile:</strong>
                </span>
                <span>?</span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>% Alcol:</strong>
                </span>
                <span>?</span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>Colore:</strong>
                </span>
                <span>?</span>
              </li>
              <li>
                <span className="inline-block w-35">
                  <strong>Descrizione:</strong>
                </span>
                <span>?</span>
              </li>
            </ul>
            <div>Disponibile / Non disponibile</div>
            <div>
              <input type="number" max={99} />
              <button type="button">Aggiungi</button>
              <button type="button">
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
