import { useState } from "react";
import { useCart } from "../components/CartContext";

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

  const handlerInputChange = (e, setInfo) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Sincronizzazione indirizzo di fatturazione con quello di spedizione
  const handlerBillingCheckboxChange = (e) => {
    setIsBillingSameAsShipping(e.target.checked);
    if (e.target.checked) {
      setBillingData(shippingData);
    }
  };

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

  const handlerSubmitForm = (e) => {
    e.preventDefault();
    // Da collegare al sistema di pagamento
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Sezione Checkout */}
      <div className="md:col-span-2 bg-white/50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <form onSubmit={handlerSubmitForm}>
          {/* Indirizzo di Spedizione */}
          <div className="w-110">
            <div className="flex justify-between gap-2">
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={billingData.name}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Cognome"
                value={billingData.surname}
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
                value={billingData.email}
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
              value={billingData.address}
              onChange={handlerShippingDataChange}
              className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
              required
            />
            <div className="flex justify-between gap-2">
              <input
                type="text"
                name="country"
                placeholder="Nazione"
                value={billingData.country}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Città"
                value={billingData.city}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Codice postale"
                value={billingData.zipCode}
                onChange={handlerShippingDataChange}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
            </div>
          </div>
          {/* Indirizzo di Fatturazione */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">
              Indirizzo di Fatturazione
            </h3>
            <input
              type="checkbox"
              checked={isBillingSameAsShipping}
              onChange={handlerBillingCheckboxChange}
              className="mb-2"
            />{" "}
            Uguale all'indirizzo di spedizione
            <br />
            <div className="w-110">
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={billingData.name}
                  onChange={(e) => handlerInputChange(e, setBillingData)}
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Cognome"
                  value={billingData.surname}
                  onChange={(e) => handlerInputChange(e, setBillingData)}
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
                  onChange={(e) => handlerInputChange(e, setBillingData)}
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="number"
                  name="phone"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  placeholder="Telefono"
                  value={shippingData.phone}
                  onChange={(e) => handlerInputChange(e, setBillingData)}
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Indirizzo"
                value={billingData.address}
                onChange={(e) => handlerInputChange(e, setBillingData)}
                className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                required
              />
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  name="country"
                  placeholder="Nazione"
                  value={billingData.country}
                  onChange={(e) => handlerInputChange(e, setBillingData)}
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Città"
                  value={billingData.city}
                  onChange={(e) => handlerInputChange(e, setBillingData)}
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Codice postale"
                  value={billingData.zipCode}
                  onChange={(e) => handlerInputChange(e, setBillingData)}
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
                  onChange={(e) => handlerInputChange(e, setBillingData)}
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                  required
                />
                <input
                  type="text"
                  name="vatNumber"
                  placeholder="Partita IVA"
                  value={billingData.vatNumber}
                  onChange={(e) => handlerInputChange(e, setBillingData)}
                  className="border border-neutral-300 p-2 rounded mb-2 bg-white/80 w-full"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-orange-200 hover:bg-orange-400 transition rounded"
          >
            Procedi con il pagamento
          </button>
        </form>
      </div>
      {/* Riepilogo Ordine */}
      <div className="bg-white/50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Riepilogo Ordine</h3>
        <ul>
          {cart.map((product) => (
            <li key={product.id} className="mb-2">
              {product.product_name} - {product.quantity} x{" "}
              {product.product_price}€
            </li>
          ))}
        </ul>
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
