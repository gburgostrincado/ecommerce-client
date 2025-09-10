import { useEffect, useState } from 'react';
import useCartStore from '../carts/cartStore';
import useProductStore from './productStore';
import ModalProduct from '../../components/ModalProduct';
import { useNavigate } from 'react-router';
import './product.css'; // Asegúrate de agregar los estilos de animación aquí

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: ""
  });
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart, cart } = useCartStore();
  const { updateProduct, deleteProduct, isModalOpen, setIsModalOpen, loading } = useProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = window.location.pathname.split('/').pop();
      try {
        const response = await fetch(`${process.env.API_URL}/products/${productId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  const handleEditClick = () => {
    setEditData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      imageUrl: product.imageUrl || ""
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateProduct({
        ...product,
        ...editData,
        price: parseFloat(editData.price),
        stock: parseInt(editData.stock || 0)
      });
      setProduct(prev => ({
        ...prev,
        ...editData,
        price: parseFloat(editData.price),
        stock: parseInt(editData.stock || 0)
      }));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(product.id);
      alert("Producto eliminado correctamente");
      navigate('/');
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div className="container py-5">
      <div className="row gx-5 align-items-start">
        {/* Imagen del producto */}
        <div className="col-md-6">
          <div className="rounded bg-white image-container">
            <img
              src={product?.imageUrl}
              alt={product?.name}
              className="img-fluid w-100"
              style={{
                objectFit: 'cover',
                aspectRatio: '3/4',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-semibold">{product?.name}</h2>
            <div className="dropdown">
              <button
                className="btn btn-sm btn-outline-secondary"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={handleEditClick}>
                    ✏️ Editar
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleDelete} >
                    🗑️ Eliminar
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-muted mb-2">SKU #{product?.id}</p>
          <div className="mb-4">
            <span className="h4 bold text-success">${product?.price?.toLocaleString()}</span>
          </div>
          <p className="mb-4">{product?.description}</p>

          {/* Stock */}
          <div className="mb-3">
            {product?.stock > 5 ? (
              <span className="text-success fw-bold">EN STOCK ({product?.stock})</span>
            ) : (
              <span className="text-danger fw-bold">STOCK BAJO ({product?.stock})</span>
            )}
          </div>

          {/* Botón de compra */}
          <div className="d-grid gap-2 mb-4 position-relative">
            <button
              className={`btn btn-danger btn-lg ${addedToCart ? 'btn-added' : ''}`}
              disabled={product?.stock <= 0 || cart.some(item => item.id === product.id && item.quantity >= product.stock)}
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
          </div>

          {/* Extra opcional como cuotas o stock */}
          <div className="text-muted small">
            <p>Hasta 3 cuotas sin interés</p>
            <p>Ver stock en tiendas</p>
          </div>
        </div>
      </div>
      {isModalOpen && 
        <ModalProduct
          formData={editData}
          handleChange={handleChange}
          setIsModalOpen={setIsModalOpen}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      }
    </div>
  );
};

export default ProductDetail;
