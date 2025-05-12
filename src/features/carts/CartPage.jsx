import useCartStore  from './cartStore';
import { NavLink } from 'react-router';
import ProductItem from '../../components/ProductItem';

const CartPage = () => {
  const { cart, removeFromCart, getCartTotal } = useCartStore();

  if (cart.length === 0) {
    return <p className="text-center mt-4">Tu carrito está vacío</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h5 className="mb-4">Producto(s)</h5>

          {cart.map((product) => (
            <ProductItem 
              key={product.id}
              product={product}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>${getCartTotal().toLocaleString()}</strong>
            </div>

            <div className="d-flex justify-content-between">
              <span>Total</span>
              <strong>${getCartTotal().toLocaleString()}</strong>
            </div>
            <hr />
            <NavLink to="/checkout" className="btn btn-dark w-100 mb-2 text-uppercase">
                Ir a pagar
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;