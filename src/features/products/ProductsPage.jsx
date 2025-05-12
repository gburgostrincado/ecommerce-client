import { useEffect } from "react";
import useProductStore  from "./productStore";
import './product.css';
import { NavLink } from "react-router";


const ProductPage = () => {
  const products = useProductStore(state => state.products);
  const fetchProducts = useProductStore(state => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-page container mt-5">
      <h1>Productos</h1>
      <div className="container">
        <div className="row">
          {products.map(product => (
            <div className="col-6 col-md-4 col-lg-3 mb-4" key={product.id}>
              <NavLink
                to={`/products/${product.id}`}
                className="nav-link text-decoration-none"
              >
                <div className="product-tile">
                  <div className="image-container">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="img-fluid w-100"
                      style={{
                        objectFit: 'cover',
                        aspectRatio: '2/3', // Relación de aspecto similar a la imagen vertical
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                  <div className="pt-2">
                    <p className="mb-1" style={{ fontWeight: '500' }}>{product.name}</p>
                    <p className="fw-bold">${product.price.toLocaleString()}</p> {/* Precio estático por ahora */}
                  </div>
                </div>
                </NavLink>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage; 