import axios from 'axios';
import { create } from 'zustand';

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    if (get().products.length > 0) return;
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:5002/api/v1/products');
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ error: 'Error fetching products', loading: false });
    }
  }
}));

export default useProductStore;