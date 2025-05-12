const ProductItem = ({ product, checkout=false, removeFromCart, orderDetail }) => {
  const quantity = orderDetail ? orderDetail.quantity : product.quantity;
  const price = orderDetail ? orderDetail.price : product.price;

  return (
    <div key={product.id} className="d-flex align-items-center border-bottom py-3">
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        className="me-3"
      />
      <div className="flex-grow-1">
        <h6 className="mb-1 fw-bold">{product.name}</h6>
        <span>
          x{quantity}
        </span>
      </div>
      <div className="ms-3 text-end">
        <p className="mb-0 fw-semibold">${(price * quantity).toLocaleString()}</p>
      </div>
      {!checkout && (
        <div className="ms-3 text-end">
          <button className="btn btn-link text-danger p-0" onClick={() => removeFromCart(product.id)}>
            <i className="bi bi-trash-fill fs-5"></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductItem;