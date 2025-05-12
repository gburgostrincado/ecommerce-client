import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const CheckoutForm = ({ cart, client, addClient }) => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    addClient(name, value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5002/api/v1/payment", { cart, client });
      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: client.name,
            email: client.email,
          },
        },
      });

      console.log(result);
      if (result.error) {
        navigate("/payment/cancel");
        setLoading(false);
      } else if (result.paymentIntent.status === "succeeded") {
        // clearCart();
        navigate("/payment/success");
        setLoading(false);
      }
      
    } catch (error) { 
      console.error("Error al procesar el pago:", error);
      navigate("/payment/cancel");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="mb-3">
        <label className="form-label">Nombre completo</label>
        <input
          type="text"
          className="form-control"
          value={client.name}
          name="name"
          onChange={e => handleChange(e)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          value={client.email}
          name="email"
          onChange={e => handleChange(e)}
          required
        />
      </div>

      <label>Información de la tarjeta</label>
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      
      <button className="btn btn-primary mt-3 w-100" type="submit" disabled={!stripe || loading}>
        {loading ? "Procesando..." : "Pagar"}
      </button>
    </form>
  );
};

export default CheckoutForm;