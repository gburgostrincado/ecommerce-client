// PaymentForm.jsx
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import useCartStore from "../carts/cartStore";
import ProductItem from "../../components/ProductItem"; 
import CheckoutForm from "./components/CheckoutForm";
import useCheckoutStore from "./checkoutStore";

const stripePromise = loadStripe("pk_test_51RMemMR3MftjHKGucNLLcmEPTYV0vIcGzlWut79L6uP4RYkqisrs1QELMXBlFkYM8kseKFuQtAnDo0v1XIDFqFIg00LidolgX2");

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCartStore();
  const { client, addClient } = useCheckoutStore();
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex align-items-center border-bottom py-3">
            <div className="flex-grow-1">
              <h2>Detalles de la compra</h2>
            </div>
            <div className="ms-3 text-end">
              <p className="mb-0 fw-semibold">${(getCartTotal()).toLocaleString()}</p>
            </div>
          </div>
          {cart.map((product, index) => (
            <ProductItem key={index} product={product} checkout />
          ))}
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center border-bottom py-3">
            <div className="flex-grow-1">
              <h2>Información de pago</h2>
            </div>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm cart={cart} clearCart={clearCart} client={client} addClient={addClient} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;