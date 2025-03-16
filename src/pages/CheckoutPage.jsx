import { useState } from "react";
import { useCart } from "../components/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [shippingData, setShippingData] = useState({
    name: "",
    country: "",
    city: "",
    zipCode: "",
  });
  const [billingData, setBillingData] = useState({
    name: "",
    country: "",
    city: "",
    zipCode: "",
  });

  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isDiscountValid, setIsDiscountValid] = useState(true);

  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(false);

  const handlerInputChange = (e, setInfo) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // quando gli indirizzi sono uguali imposta i dati di fat. = a quelli di sped.
  const handlerBillingCheckboxChange = (e) => {
    setIsBillingSameAsShipping(e.target.checked);
    if (e.target.checked) {
      setBillingData(shippingData);
    }
  };

  // quando gli indirizzi sono uguali, al modificare della sped. viene modificata anche la fat.
  const handlerShippingDataChange = (e) => {
    handlerInputChange(e, setShippingData);
    if (isBillingSameAsShipping) {
      setBillingData((prevBillingData) => ({
        ...prevBillingData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const totalPrice = () => {
    const total = cart.reduce(
      (total, item) => total + item.product_price * item.quantity,
      0
    );
    return total;
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

  const handlerSubmitForm = (e) => {
    e.preventDefault();
    // da collegare al sistema di pagamento
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <form onSubmit={handlerSubmitForm}>
        <div>
          <div className="flex flex-col items-start mt-4">
            <h3 className="text-xl font-semibold mb-2">
              Indirizzo di Spedizione
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={shippingData.name}
              onChange={handlerShippingDataChange}
              className="border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Nazione"
              value={shippingData.country}
              onChange={handlerShippingDataChange}
              className="border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Città"
              value={shippingData.city}
              onChange={handlerShippingDataChange}
              className="border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Codice postale"
              value={shippingData.zipCode}
              onChange={handlerShippingDataChange}
              className="border p-2 rounded mb-2"
              required
            />
          </div>
          <div className="flex flex-col items-start mt-4">
            <h3 className="text-xl font-semibold mb-2">
              Indirizzo di Fatturazione
            </h3>
            <div className="mb-2">
              <input
                type="checkbox"
                checked={isBillingSameAsShipping}
                onChange={handlerBillingCheckboxChange}
                className="mb-2"
              />{" "}
              Uguale all'indirizzo di spedizione
            </div>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={billingData.name}
              onChange={(e) => handlerInputChange(e, setBillingData)}
              className="border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Nazione"
              value={billingData.country}
              onChange={(e) => handlerInputChange(e, setBillingData)}
              className="border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Città"
              value={billingData.city}
              onChange={(e) => handlerInputChange(e, setBillingData)}
              className="border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Codice postale"
              value={billingData.zipCode}
              onChange={(e) => handlerInputChange(e, setBillingData)}
              className="border p-2 rounded mb-2"
              required
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-2">Riepilogo Ordine</h3>
        <ul>
          {cart.map((product) => (
            <li key={product.id} className="mb-2">
              {product.product_name} - {product.quantity} x{" "}
              {product.product_price}€
            </li>
          ))}
        </ul>
        <div className="text-xl font-semibold mt-4">
          Totale Ordine:{" "}
          {isDiscountApplied ? (
            <>
              <span className="line-through">{totalPrice().toFixed(2)}€</span>{" "}
              <span>{discountedPrice().toFixed(2)}€</span> ({discountCode}: -
              {discount * 100}%)
            </>
          ) : (
            <span>{totalPrice().toFixed(2)}€</span>
          )}
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Codice sconto"
            value={discountCode}
            onChange={handlerDiscountCodeChange}
            className="border p-2 rounded mb-2 mr-5"
          />
          <button
            type="button"
            onClick={applyDiscount}
            className={`px-4 py-2 bg-blue-200 rounded ${
              isDiscountApplied
                ? "bg-green-200"
                : "cursor-pointer hover:bg-blue-300 hover:scale-110 transition duration-200"
            }`}
          >
            {isDiscountApplied ? "Codice Valido" : "Applica Codice Sconto"}
          </button>
          {!isDiscountValid && (
            <div className="text-red-500 mt-2">Codice sconto non valido</div>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 cursor-pointer bg-orange-200 hover:bg-orange-300 hover:scale-110 transition duration-200 rounded"
        >
          Procedi con il pagamento
        </button>
      </form>
    </div>
  );
}
