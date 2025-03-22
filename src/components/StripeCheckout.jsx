import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Sostituisci con la tua chiave pubblica
const stripePromise = loadStripe("LA_TUA_CHIAVE_PUBBLICA_DI_STRIPE");

export default function StripeCheckout() {
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/checkout/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [{ name: "Prodotto Esempio", price: 50.0, quantity: 1 }],
          }),
        }
      );
      const session = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (error) {
        console.error("Errore nel redirect:", error);
      }
    } catch (error) {
      console.error("Errore nella creazione della sessione:", error);
    }
  };

  return <button onClick={handleCheckout}>Paga con Stripe Checkout</button>;
}
