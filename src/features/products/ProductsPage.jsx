import { useEffect, useState } from "react";
import useProductStore  from "./productStore";
import './product.css';
import { NavLink } from "react-router";
import ModalProduct from "../../components/ModalProduct";


const ProductPage = () => {
  const { products, fetchProducts, addProduct, isModalOpen, setIsModalOpen, loading } = useProductStore();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!formData.name || !formData.price) {
      alert('Nombre y precio son obligatorios');
      return;
    }

    addProduct({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock || 0)
    });
  
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: ''
    });
  };

  return (
    <div className="product-page container mt-5">
      <div className="d-flex align-items-center mb-4">
        <h1>Productos</h1>
        <button className="btn btn-outline-primary m-2" onClick={() => setIsModalOpen(true)}>
          Crear producto
        </button>
      </div>
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="col-12 text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            products.map(product => (
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
                    {product.stock === 0 && (
                      <span
                        className="badge bg-danger position-absolute top-0 start-0 m-2"
                        style={{ fontSize: '0.75rem', borderRadius: '12px' }}
                      >
                        AGOTADO
                      </span>
                    )}
                  </div>
                  <div className="pt-2">
                    <p className="mb-1" style={{ fontWeight: '500' }}>{product.name}</p>
                    <p className="fw-bold">${product.price.toLocaleString()}</p> {/* Precio estático por ahora */}
                  </div>
                </div>
                </NavLink>
              </div>
          )))}
        </div>
      </div>
      {console.log("Loading state:", loading)}

      {isModalOpen && (
        <ModalProduct
          handleChange={handleChange}
          formData={formData}
          setIsModalOpen={setIsModalOpen}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}

export default ProductPage; 