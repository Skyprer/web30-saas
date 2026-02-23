import { create } from 'zustand';

// Mendefinisikan bentuk data produk di keranjang
export interface CartItem {
  id: string;
  nama: string;
  harga: number;
  quantity: number;
}

// Mendefinisikan fungsi-fungsi yang bisa dilakukan keranjang
interface CartState {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  // Fungsi tambah barang
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        // Jika barang sudah ada, tambah jumlahnya (quantity)
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      // Jika barang baru, masukkan ke array dengan quantity 1
      return { items: [...state.items, { ...product, quantity: 1 }] };
    });
  },

  // Fungsi kurangi/hapus barang
  removeItem: (productId) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return {
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      }
      return { items: state.items.filter((item) => item.id !== productId) };
    });
  },

  // Kosongkan keranjang
  clearCart: () => set({ items: [] }),

  // Hitung total harga
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.harga * item.quantity, 0);
  },

  // Hitung total barang
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));