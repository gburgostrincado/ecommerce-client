import { NavLink } from 'react-router';
import useCartStore from '../features/carts/cartStore';

const Header = () => {
  const getCartCount = useCartStore((state) => state.getCartCount());
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Orders', path: '/orders' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container mt-1 px-4">
        <NavLink className="navbar-brand" to="/">
          Ecommerce
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link px-3 ${isActive ? 'active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/cart" className="nav-link position-relative text-white px-3">
            <i className="bi bi-cart-fill fs-4"></i>
            <span
              className="position-absolute top-30 start-90 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '0.7rem' }}
            >
              {getCartCount}
              <span className="visually-hidden">productos en el carrito</span>
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;