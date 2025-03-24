import { useEffect } from "react";
import { useCart } from "../components/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    // Svuota il carrello
    clearCart();
    // Dopo 3 secondi, reindirizza alla home page
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [clearCart, navigate]);

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Pagamento Completato!</h1>
      {sessionId ? (
        <p>Il tuo ID sessione è: {sessionId}</p>
      ) : (
        <p>Grazie per aver effettuato il pagamento.</p>
      )}
      <p>Verrai reindirizzato alla home page a breve.</p>
    </div>
  );
}
