import React, { useState, useEffect } from "react";
import axios from "../api/axios";

export default function AgeVerificationModal({ onClose, onDeny }) {
  const [step, setStep] = useState("ageCheck");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [denied, setDenied] = useState(false);

  // Avvia il timer solo se NON è stato negato
  useEffect(() => {
    if (step === "resultMessage" && !denied) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, denied, onClose]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      // If the user doesn't provide an email, proceed without sending the request
      setResult("Verifica completata senza email.");
      setStep("resultMessage");
      return;
    }

    try {
      const response = await axios.post("/discount/verify-email", { email });

      if (response.data.discount) {
        setResult(
          `${response.data.message} Codice sconto: ${response.data.discount}`
        );
      } else {
        setResult(response.data.message);
      }

      setStep("resultMessage");
    } catch (err) {
      console.error("Errore nella verifica dell'email:", err);
      setResult("Si è verificato un errore. Riprova.");
      setStep("resultMessage");
    }
  };

  const handleAgeYes = () => {
    // Passa allo step di inserimento email
    setStep("emailInput");
  };

  const handleAgeNo = () => {
    setResult("Accesso negato. Torna quando sarai maggiorenne!");
    setStep("resultMessage");
    setDenied(true); // Segnaliamo che l'utente ha negato
    onDeny();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-orange-100 p-8 rounded-xl shadow-lg max-w-md mx-auto text-center w-150">
        {step === "ageCheck" && (
          <>
            <h2 className="text-4xl font-bold mb-6">Sei maggiorenne?</h2>
            <div className="flex justify-around">
              <button
                onClick={handleAgeYes}
                className="px-4 py-2 w-25 h-18 shadow-md bg-green-800 text-white rounded-xl transform transition duration-300 hover:scale-105 text-3xl font-bold cursor-pointer"
              >
                SI
              </button>
              <button
                onClick={handleAgeNo}
                className="px-4 py-2 w-25 h-18 shadow-md bg-red-800 text-white rounded-xl transform transition duration-300 hover:scale-105 text-3xl font-bold cursor-pointer"
              >
                NO
              </button>
            </div>
          </>
        )}

        {step === "emailInput" && (
          <>
            {" "}
            <h2 className="text-2xl font-bold mb-4">
              Inserisci la tua email (opzionale)
            </h2>{" "}
            <form onSubmit={handleEmailSubmit}>
              {" "}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua email (opzionale)"
                className="bg-white p-2 rounded w-full mb-4"
              />{" "}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {" "}
                Invia{" "}
              </button>{" "}
            </form>{" "}
          </>
        )}
        {step === "resultMessage" && (
          <>
            <h2 className="text-xl font-bold mb-4">{result}</h2>
            {/* Mostra il bottone "Chiudi" solo se non è stato negato */}
            {!denied && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Chiudi
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
