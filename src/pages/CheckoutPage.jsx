import { useState } from "react";
import { useCart } from "../components/CartContext";
import { loadStripe } from "@stripe/stripe-js";

// Inizializza Stripe con la tua chiave pubblica (sostituisci con quella reale)
const stripePromise = loadStripe(
  "pk_test_51R4ONsFLHpRiN26Tq0tEKZPostKWKCAc1Nv5r8gCy5nLBfFmEnYvLlBB72IcNdbzElUyLu6cUZX1H2Cr04Moqzem00WbCeqR7o"
);

export default function CheckoutPage() {
  const { cart } = useCart();

  // Stato per dati di spedizione e fatturazione
  const [shippingData, setShippingData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  const [billingData, setBillingData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    phone: "",
    taxCode: "",
    vatNumber: "",
  });

  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isDiscountValid, setIsDiscountValid] = useState(true);
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(false);
  const [isBillingDiffShipping, setIsBillingDiffShipping] = useState(false);

  const handlerInputChange = (e, setInfo) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleBillingOptionChange = (option) => {
    if (option === "same") {
      setIsBillingSameAsShipping(true);
      setIsBillingDiffShipping(false);
      setBillingData((prev) => ({
        ...prev,
        ...shippingData,
      }));
    } else {
      setIsBillingSameAsShipping(false);
      setIsBillingDiffShipping(true);
      setBillingData({
        name: "",
        surname: "",
        email: "",
        address: "",
        country: "",
        city: "",
        zipCode: "",
        phone: "",
        taxCode: "",
        vatNumber: "",
      });
    }
  };

  const handlerShippingDataChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
    if (!isBillingSameAsShipping) {
      setBillingData((prev) => ({ ...prev, [name]: value }));
    }
    handlerInputChange(e, setShippingData);
    if (isBillingSameAsShipping) {
      setBillingData((prevBillingData) => ({
        ...prevBillingData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product_price * item.quantity,
      0
    );
  };

  const discountedPrice = () => {
    return totalPrice() - totalPrice() * discount;
  };

  const applyDiscount = () => {
    if (discountCode === "ALCOOL4EVER") {
      setDiscount(0.1);
      setIsDiscountApplied(true);
      setIsDiscountValid(true);
    } else {
      setDiscount(0);
      setIsDiscountApplied(false);
      setIsDiscountValid(false);
    }
  };

  const handlerDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value.toUpperCase());
    setIsDiscountApplied(false);
    setIsDiscountValid(true);
  };

  const handlerSubmitForm = async (e) => {
    e.preventDefault();

    // Costruisci l'array degli articoli dal carrello per Stripe Checkout.
    // Il backend convertirà il prezzo in centesimi.
    const items = cart.map((item) => ({
      name: item.product_name,
      price: item.product_price,
      quantity: item.quantity,
    }));

    try {
      // Richiama l'endpoint del backend per creare la sessione di Checkout
      const response = await fetch(
        "http://localhost:3000/checkout/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        }
      );
      const session = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (error) {
        console.error("Errore nel redirect a Stripe Checkout:", error);
      }
    } catch (error) {
      console.error(
        "Errore nella creazione della sessione di Checkout:",
        error
      );
    }
  };

  return (
    <div className="max-w-5xl m-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Sezione Checkout */}
      <div className=" md:col-span-2 bg-white/50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <form onSubmit={handlerSubmitForm}>
          {/* Indirizzo di Spedizione */}
          <div className="my-3">
            <h3 className="text-xl font-semibold mb-3">
              Indirizzo di Spedizione
            </h3>
            <div className="flex justify-between gap-2">
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={shippingData.name}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Cognome"
                value={shippingData.surname}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
            </div>
            <div className="flex justify-between gap-2">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={shippingData.email}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
              <input
                type="number"
                name="phone"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                placeholder="Telefono"
                value={shippingData.phone}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Indirizzo"
              value={shippingData.address}
              onChange={handlerShippingDataChange}
              className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
              required
            />
            <div className="flex justify-between gap-2">
              <input
                type="text"
                name="country"
                placeholder="Nazione"
                value={shippingData.country}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Città"
                value={shippingData.city}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Codice postale"
                value={shippingData.zipCode}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
            </div>
          </div>

          {/* Scelta per la fatturazione */}
          <label> La fatturazione è uguale all'indirizzo di spedizione:</label>
          <br />
          <input
            type="radio"
            name="billingOption"
            value="same"
            checked={isBillingSameAsShipping}
            onChange={() => handleBillingOptionChange("same")}
          />
          <label> Si</label>
          <br />
          <input
            type="radio"
            name="billingOption"
            value="different"
            checked={isBillingDiffShipping}
            onChange={() => handleBillingOptionChange("different")}
          />
          <label> No</label>

          {/* Indirizzo di fatturazione uguale */}
          {isBillingSameAsShipping && (
            <div>
              <p>
                <strong>Nome:</strong> {shippingData.name}{" "}
                {shippingData.surname}
              </p>
              <p>
                <strong>Email:</strong> {shippingData.email}
              </p>
              <p>
                <strong>Telefono:</strong> {shippingData.phone}
              </p>
              <p>
                <strong>Indirizzo:</strong> {shippingData.address},{" "}
                {shippingData.city}, {shippingData.zipCode},{" "}
                {shippingData.country}
              </p>
              <div className="flex justify-between gap-2 mt-2">
                <input
                  type="text"
                  name="taxCode"
                  placeholder="Codice Fiscale"
                  value={billingData.taxCode}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      taxCode: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="text"
                  name="vatNumber"
                  placeholder="Partita IVA"
                  value={billingData.vatNumber}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      vatNumber: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                />
              </div>
            </div>
          )}

          {/* Indirizzo di Fatturazione diversa*/}
          {isBillingDiffShipping && (
            <div className="my-3">
              <h3 className="text-xl font-semibold mb-3">
                Indirizzo di Fatturazione
              </h3>
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={billingData.name}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Cognome"
                  value={billingData.surname}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      surname: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
              </div>
              <div className="flex justify-between gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={billingData.email}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="number"
                  name="phone"
                  placeholder="Telefono"
                  value={billingData.phone}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Indirizzo"
                value={billingData.address}
                onChange={(e) =>
                  setBillingData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  name="country"
                  placeholder="Nazione"
                  value={billingData.country}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Città"
                  value={billingData.city}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Codice postale"
                  value={billingData.zipCode}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      zipCode: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
              </div>
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  name="taxCode"
                  placeholder="Codice Fiscale"
                  value={billingData.taxCode}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      taxCode: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="text"
                  name="vatNumber"
                  placeholder="Partita IVA"
                  value={billingData.vatNumber}
                  onChange={(e) =>
                    setBillingData((prev) => ({
                      ...prev,
                      vatNumber: e.target.value,
                    }))
                  }
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 mt-5 bg-orange-200 hover:bg-orange-400 transition rounded"
            >
              Procedi con il pagamento
            </button>
          </div>
        </form>
      </div>
      {/* Riepilogo Ordine */}
      <div className="bg-white/50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">Riepilogo Ordine</h3>
        <ul>
          {cart.map((product) => (
            <li key={product.id} className="mb-2">
              {product.product_name} - {product.quantity} x{" "}
              {product.product_price}€
            </li>
          ))}
        </ul>

        {/* Codice sconto */}
        <div className=" flex md:flex-wrap lg:flex-nowrap gap-2 my-3">
          <input
            type="text"
            placeholder="Codice sconto"
            value={discountCode}
            onChange={handlerDiscountCodeChange}
            className="border border-neutral-300 p-2 rounded bg-white/80 h-10.5 w-full"
          />
          <button
            type="button"
            onClick={applyDiscount}
            className={`px-4 py-2 h-10.5 w-full bg-blue-200 rounded ${
              isDiscountApplied
                ? "bg-green-200"
                : "cursor-pointer hover:bg-blue-300 hover:scale-105 transition duration-200"
            }`}
          >
            {isDiscountApplied ? "Codice Valido" : "Applica"}
          </button>
          {!isDiscountValid && (
            <div className="text-red-500 mt-2">Codice sconto non valido</div>
          )}
        </div>
        <div className="text-xl font-semibold mt-4">
          Totale:{" "}
          {isDiscountApplied ? (
            <>
              <span className="line-through">{totalPrice().toFixed(2)}€</span>{" "}
              <span>{discountedPrice().toFixed(2)}€</span>
            </>
          ) : (
            <span>{totalPrice().toFixed(2)}€</span>
          )}
        </div>
      </div>
    </div>
  );
}
