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

  const handlerInputChange = (e, setInfo) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product_price * item.quantity,
      0
    );
  };

  const applyDiscount = () => {
    if (discountCode === "ALCOOL4EVER") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  const handlerDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value.toUpperCase());
  };

  const handlerSubmitForm = (e) => {
    e.preventDefault();
    // da collegare al sistema di pagamento
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handlerSubmitForm}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Dati di Spedizione</h3>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={shippingData.name}
              onChange={(e) => handlerInputChange(e, setShippingData)}
              className="border p-2 rounded w-full mb-2"
              //   required
            />
            <input
              type="text"
              name="country"
              placeholder="Nazione"
              value={shippingData.country}
              onChange={(e) => handlerInputChange(e, setShippingData)}
              className="border p-2 rounded w-full mb-2"
              //   required
            />
            <input
              type="text"
              name="city"
              placeholder="Città"
              value={shippingData.city}
              onChange={(e) => handlerInputChange(e, setShippingData)}
              className="border p-2 rounded w-full mb-2"
              //   required
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Codice postale"
              value={shippingData.zipCode}
              onChange={(e) => handlerInputChange(e, setShippingData)}
              className="border p-2 rounded w-full mb-2"
              //   required
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Dati di Fatturazione</h3>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={billingData.name}
              onChange={(e) => handlerInputChange(e, setBillingData)}
              className="border p-2 rounded w-full mb-2"
              //   required
            />
            <input
              type="text"
              name="country"
              placeholder="Nazione"
              value={billingData.country}
              onChange={(e) => handlerInputChange(e, setBillingData)}
              className="border p-2 rounded w-full mb-2"
              //   required
            />
            <input
              type="text"
              name="city"
              placeholder="Città"
              value={billingData.city}
              onChange={(e) => handlerInputChange(e, setBillingData)}
              className="border p-2 rounded w-full mb-2"
              //   required
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Codice postale"
              value={billingData.zipCode}
              onChange={(e) => handlerInputChange(e, setBillingData)}
              className="border p-2 rounded w-full mb-2"
              //   required
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
          Totale Ordine: {totalPrice().toFixed(2)}€
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
            className="px-4 py-2 cursor-pointer bg-blue-200 hover:bg-blue-300 hover:scale-110 transition duration-200 rounded"
          >
            Applica Codice Sconto
          </button>
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
