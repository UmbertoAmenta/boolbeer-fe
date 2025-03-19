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
    const checked = e.target.checked;
    setIsBillingSameAsShipping(checked);

    if (checked) {
      // Se la checkbox è selezionata, copia i dati di spedizione nella fatturazione
      setBillingData(shippingData);
    } else {
      // Se la checkbox è deselezionata, resetta i dati di fatturazione
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

  const handlerSubmitForm = (e) => {
    e.preventDefault();
    // Da collegare al sistema di pagamento
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
          <input
            type="checkbox"
            checked={isBillingSameAsShipping}
            onChange={handlerBillingCheckboxChange}
          />
          <label> La fatturazione è uguale all'indirizzo di spedizione</label>
          {/* Indirizzo di Fatturazione */}
          {isBillingSameAsShipping && (
            <div className="my-3">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Indirizzo di Fatturazione
                </h3>
                <div className="">
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
                      value={billingData.phone}
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
