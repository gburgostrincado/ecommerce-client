import { useEffect, useState } from 'react';
import useCartStore from '../carts/cartStore';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = window.location.pathname.split('/').pop();
      try {
        const response = await fetch(`http://localhost:5002/api/v1/products/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

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
      <h2 className="fw-semibold mb-3">{product?.name}</h2>
      <p className="text-muted mb-2">SKU #{product?.id}</p>

      <div className="mb-4">
        <span className="h4 bold text-success">${product?.price?.toLocaleString()}</span>
      </div>

      <p className="mb-4">{product?.description}</p>

      {/* Stock */}
      <div className="mb-3">
        {product?.stock > 5 ? (
          <span className="text-success fw-bold">EN STOCK</span>
        ) : (
          <span className="text-danger fw-bold">STOCK BAJO</span>
        )}
      </div>

      {/* Botón de compra */}
      <div className="d-grid gap-2 mb-4">
        <button
          className="btn btn-danger btn-lg"
          disabled={product?.stock <= 0}
          onClick={() => addToCart(product)}
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
</div>
  );
} 
export default ProductDetail;