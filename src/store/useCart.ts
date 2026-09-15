import { create } from "zustand";

export interface CartOption {
  name: string;
  value: string;
}

export interface CartItem {
  id: string; // Unique ID for the cart entry (composite)
  productId: string; // Original product ID
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: CartOption[];
  image?: string;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  logo?: string;
  cuisine?: string;
}

interface CartState {
  items: CartItem[];
  restaurant: RestaurantInfo | null;
  addItem: (item: Omit<CartItem, "id" | "productId"> & { id: string }, restaurant: RestaurantInfo) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  totals: () => { subtotal: number };
}

// Helper to create a stable string key for options
const getOptionsKey = (options?: CartOption[]) => {
  if (!options || options.length === 0) return "";
  // Sort by name and value to ensure consistency
  const sorted = [...options].sort((a, b) => 
    a.name.localeCompare(b.name) || a.value.localeCompare(b.value)
  );
  return JSON.stringify(sorted);
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  restaurant: null,
  addItem: (item, restaurant) => {
    const state = get();
    
    // Check if cart has items from a different restaurant
    if (state.restaurant && state.restaurant.id !== restaurant.id) {
      return false; // Indicate that the item was not added
    }

    const optionsKey = getOptionsKey(item.selectedOptions);
    // Find item with same product ID and same options
    const existingItem = state.items.find(
      (i) => i.productId === item.id && getOptionsKey(i.selectedOptions) === optionsKey
    );

    if (existingItem) {
      set({
        items: state.items.map((i) =>
          i.id === existingItem.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
      return true;
    }

    // Create new item
    const newItem: CartItem = {
      ...item,
      productId: item.id,
      id: `${item.id}-${optionsKey || Date.now()}`,
    };

    set({ 
      items: [...state.items, newItem],
      restaurant: restaurant 
    });
    return true;
  },
  removeItem: (id) => {
    const state = get();
    const newItems = state.items.filter((i) => i.id !== id);
    set({ 
      items: newItems,
      restaurant: newItems.length === 0 ? null : state.restaurant
    });
  },
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clear: () => set({ items: [], restaurant: null }),
  totals: () => {
    const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { subtotal };
  },
}));
