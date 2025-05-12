import axios from 'axios';
import { create } from 'zustand';

const useOrdersStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    if (get().orders.length > 0) return;
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:5002/api/v1/orders');
      set({ orders: res.data, loading: false });
    } catch (error) {
      set({ error: 'Error fetching products', loading: false });
    }
  }
}));

export default useOrdersStore;