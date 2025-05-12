import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => set((state) => {
        const existingProduct = state.cart.find((item) => item.id === product.id);
        if (existingProduct) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        } else {
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }
      }
      ),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
      getCartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0)
    }),
    {
      name: 'cart-storage', // unique name
    }
  ));

export default useCartStore;
