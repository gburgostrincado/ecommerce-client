import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useCartStore from "../carts/cartStore";
import axios from "axios";
import useCheckoutStore from "./checkoutStore";

const SuccessPage = () => {
  const { cart, clearCart } = useCartStore();
  const { client } = useCheckoutStore();
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const saveOrder = async () => {
      const respose = await axios.post("http://localhost:5002/api/v1/orders", { cart, client });

      if (respose.status !== 201) {
        console.error("Error al guardar la orden");
        return;
      } else {
        console.log(respose.data);
        setOrder(respose.data);
        clearCart();
      }
    };

    if (cart.length > 0) {
      saveOrder();
    } else {
      navigate('/');
    }
  }, [cart, clearCart, navigate]);

  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="text-success">✅ ¡Pago exitoso!</h2>
        <p>Gracias por tu compra. A continuación el resumen:</p>
      </div>

      <ul className="list-group mb-4">
        {cart.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h6 className="my-0">{item.name}</h6>
              <small className="text-muted">Cantidad: {item.quantity}</small>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between">
          <strong>Total</strong>
          <strong>${getTotal()}</strong>
        </li>
      </ul>

      <div className="text-center">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;