import { create } from "zustand";

export type MenuOption = {
  id: string;
  name: string;
  type: "radio" | "checkbox";
  required: boolean;
  choices: { id: string; label: string; priceOffset: number }[];
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  available: boolean;
  image?: string;
  options?: MenuOption[];
  restaurantId: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  logo?: string;
  cover?: string;
  address?: string;
  phone?: string;
  email?: string;
  eta: string;
  rating: number;
  reviews: number;
  deliveryFee: number;
  isOpen: boolean;
  openingHours?: string;
};

interface RestaurantsState {
  restaurants: Restaurant[];
  menuItems: MenuItem[];
  getRestaurantById: (id: string) => Restaurant | undefined;
  getMenuByRestaurant: (restaurantId: string) => MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  updateRestaurant: (id: string, data: Partial<Restaurant>) => void;
}

// Données initiales des restaurants
const initialRestaurants: Restaurant[] = [
  {
    id: "resto-1",
    name: "Innova Grill",
    cuisine: "Fusion",
    description: "Dégustez une cuisine contemporaine avec des produits frais, plats signatures et options végétariennes. Livraison rapide sur Yaoundé.",
    logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80",
    address: "Bastos, Yaoundé",
    phone: "+237 690 000 001",
    email: "contact@innovagrill.cm",
    eta: "25-35 min",
    rating: 4.7,
    reviews: 500,
    deliveryFee: 500,
    isOpen: true,
    openingHours: "10h - 23h",
  },
  {
    id: "resto-2",
    name: "Meriaz Kitchen",
    cuisine: "Africain",
    description: "Cuisine africaine authentique avec des recettes traditionnelles revisitées. Saveurs d'Afrique centrale et de l'Ouest.",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80",
    address: "Mokolo, Yaoundé",
    phone: "+237 690 000 002",
    email: "contact@meriaz.cm",
    eta: "20-30 min",
    rating: 4.6,
    reviews: 320,
    deliveryFee: 500,
    isOpen: true,
    openingHours: "9h - 22h",
  },
];

// Menus initiaux pour chaque restaurant
const initialMenuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Poulet DG",
    price: 4800,
    description: "Poulet braisé avec banane plantain, carottes, haricots verts",
    category: "Plats",
    available: true,
    restaurantId: "resto-1",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&auto=format&fit=crop&q=60",
    options: [
      {
        id: "cuisson",
        name: "Cuisson",
        type: "radio",
        required: true,
        choices: [
          { id: "bien-cuit", label: "Bien cuit", priceOffset: 0 },
          { id: "fume", label: "Fumé", priceOffset: 500 },
        ],
      },
    ],
  },
  {
    id: "m2",
    name: "Ndolé Crevettes",
    price: 3500,
    description: "Plat traditionnel aux arachides et crevettes fraîches",
    category: "Plats",
    available: true,
    restaurantId: "resto-2",
    image: "https://images.unsplash.com/photo-1626804475297-411d8631c51a?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: "m3",
    name: "Burger Signature",
    price: 5200,
    description: "Bœuf charolais, cheddar affiné, oignons confits",
    category: "Fast Food",
    available: true,
    restaurantId: "resto-1",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=60",
  },
];

export const useRestaurants = create<RestaurantsState>((set, get) => ({
  restaurants: initialRestaurants,
  menuItems: initialMenuItems,

  getRestaurantById: (id) => {
    return get().restaurants.find((r) => r.id === id);
  },

  getMenuByRestaurant: (restaurantId) => {
    return get().menuItems.filter((item) => item.restaurantId === restaurantId);
  },

  addMenuItem: (item) => {
    set((state) => ({
      menuItems: [...state.menuItems, item],
    }));
  },

  updateMenuItem: (id, updates) => {
    set((state) => ({
      menuItems: state.menuItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },

  deleteMenuItem: (id) => {
    set((state) => ({
      menuItems: state.menuItems.filter((item) => item.id !== id),
    }));
  },

  updateRestaurant: (id, data) => {
    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.id === id ? { ...r, ...data } : r
      ),
    }));
  },
}));
