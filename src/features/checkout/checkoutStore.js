import { create } from 'zustand';


const useCheckoutStore = create(
  (set, get) => ({
    client: {
      name: "",
      email: "",
    },
    addClient: (name, value) => set((state) => ({
      ...state,
      client: ({
        ...state.client,
        [name]: value,
      }),
    })),
    clearClient: () => set(() => ({
      client: {
        name: "",
        email: "",
      },
    })),
  }));

export default useCheckoutStore;
