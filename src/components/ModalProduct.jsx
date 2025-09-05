
const ModalProduct = ({ handleChange, formData, setIsModalOpen, handleSubmit, loading }) => {
    return (
        <div className="modal-backdrop">
          <div className="modal-container">
            <h2>Crear Producto</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="URL de la imagen"
                value={formData.imageUrl}
                onChange={handleChange}
              />

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default ModalProduct;