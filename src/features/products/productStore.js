import axios from 'axios';
import { create } from 'zustand';

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  fetchProducts: async () => {
    if (get().products.length > 0) return;
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${process.env.API_URL}/products`);
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ error: 'Error fetching products', loading: false });
    }
  },
  addProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${process.env.API_URL}/products`, product);
      set(state => ({ products: [...state.products, res.data], loading: false, isModalOpen: false }));
    } catch (error) {
      set({ error: 'Error adding product', loading: false });
    }
  },
  updateProduct: async (updatedProduct) => {
    set({loading: true, error: null });
    try {
      const res = await axios.put(`${process.env.API_URL}/products/${updatedProduct.id}`, updatedProduct);
      set(state => ({
        products: state.products.map(p => p.id === updatedProduct.id ? res.data : p),
        loading: false,
        isModalOpen: false
      }));
    } catch (error) {
      set({ error: 'Error updating product', loading: false });
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${process.env.API_URL}/products/${productId}`);
      set(state => ({
        products: state.products.filter(p => p.id !== productId),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Error deleting product', loading: false });
    }
  },
}));

export default useProductStore;