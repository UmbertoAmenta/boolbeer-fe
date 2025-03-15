import React, { useState } from "react";
import axios from "../api/axios";

export default function AgeVerificationModal({ onClose }) {
  const [step, setStep] = useState("ageCheck"); // "ageCheck", "emailInput", "resultMessage"
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    console.log("Email inviata:", email);
    if (!email.trim()) {
      setResult("Per favore, inserisci una email valida.");
      setStep("resultMessage");
      return;
    }
    try {
      const response = await axios.post("/discount/verify-email", { email });
      if (response.data.discount) {
        setResult(`${response.data.message} Codice sconto: ${response.data.discount}`);
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
    setStep("emailInput");
  };

  const handleAgeNo = () => {
    setResult("Torna quando potrai bere");
    setStep("resultMessage");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md mx-auto text-center">
        {step === "ageCheck" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Sei maggiorenne?</h2>
            <div className="flex justify-around">
              <button onClick={handleAgeYes} className="px-4 py-2 bg-green-500 text-white rounded">
                Sì
              </button>
              <button onClick={handleAgeNo} className="px-4 py-2 bg-red-500 text-white rounded">
                No
              </button>
            </div>
          </>
        )}

        {step === "emailInput" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Inserisci la tua email</h2>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua email"
                className="border p-2 rounded w-full mb-4"
                required
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Invia
              </button>
            </form>
          </>
        )}

        {step === "resultMessage" && (
          <>
            <h2 className="text-xl font-bold mb-4">{result}</h2>
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
              Chiudi
            </button>
          </>
        )}
      </div>
    </div>
  );
}
