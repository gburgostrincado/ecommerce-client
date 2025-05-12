import { useEffect, useState } from "react";
import useOrdersStore from "./orderStore";
import ProductItem from "../../components/ProductItem";
import axios from "axios";

const OrdersPage = () => {
  const { orders, fetchOrders } = useOrdersStore();
  const [showRefundForm, setShowRefundForm] = useState(null);
  const [refundAmount, setRefundAmount] = useState("");
  const [loadingRefund, setLoadingRefund] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const labelStatus = (status) => {
    switch (status) {
      case "pending":
        return "pendiente";
      case "cancelled":
        return "cancelada";
      case "completed":
        return "completada";
    }
  };

  const handleRefund = async (orderId, amount) => {
    setLoadingRefund(orderId);
    try {
      const response = await axios.post(`http://localhost:5002/api/v1/orders/${orderId}/refund`, {
        amount: amount || undefined,
      });

      alert("Reembolso solicitado correctamente ✅");
      fetchOrders(); // Actualizar la lista de órdenes
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Error al procesar el reembolso";
      alert(message);
    } finally {
      setLoadingRefund(null);
      setShowRefundForm(null);
      setRefundAmount("");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Órdenes</h2>
      <hr />
      {orders.length === 0 ? (
        <p>No hay órdenes aún.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <strong>Orden #{order.id}</strong> — {order.name} ({order.email})
              </div>
              <span className={`badge ${
                order.status === 'pending' ? 'bg-warning' :
                order.status === 'cancelled' ?  'bg-secondary' : 'bg-success'}`}>
                {labelStatus(order.status)}
              </span>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {order.OrderDetails.map((orderDetail) => (
                  <ProductItem key={orderDetail.id} product={orderDetail.Product} orderDetail={orderDetail} checkout />
                ))}
              </ul>
              <div className="mt-3 d-flex justify-content-between align-items-center">
                {showRefundForm === order.id ? (
                  <div className="w-50">
                    <input
                      type="number"
                      className={`form-control mb-2 ${refundAmount > order.totalAmount && 'is-invalid'}`}
                      placeholder="Monto a reembolsar (opcional)"
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(e.target.value)}
                    />
                    <div class="invalid-feedback">
                      El monto ingresado debe ser menor o igual al total.
                    </div>
                    <p className="text-muted mb-2">
                      *Si no se especifica, se reembolsará el total de la orden.
                    </p>
                    <div className="d-flex justify-content-start">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleRefund(order.id, refundAmount)}
                        disabled={loadingRefund === order.id}
                      >
                        Confirmar Reembolso
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setShowRefundForm(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      setShowRefundForm(order.id);
                      setRefundAmount("");
                    }}
                    disabled={order.Refunds.length > 0}
                  >
                    {order.Refunds.length > 0 ? `Estado reembolso ${labelStatus(order.Refunds[0].status)}` : 'Solicitar Reembolso'}
                  </button>
                )}
                <strong>Total: ${order.totalAmount}</strong>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;