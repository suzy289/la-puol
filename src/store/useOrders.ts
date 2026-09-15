import { create } from "zustand";
import { CartItem } from "./useCart";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "on_delivery" | "delivered" | "cancelled";

export type Order = {
  id: string;
  orderNumber: string;
  restaurantId: string;
  restaurantName: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "cash" | "mobile_money";
  notes?: string;
  createdAt: Date;
  deliveryTime?: Date;
  livreurId?: string;
};

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "createdAt">) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByRestaurant: (restaurantId: string) => Order[];
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getOrdersByClient: (clientPhone: string) => Order[];
}

// Commandes de démonstration
const demoOrders: Order[] = [
  {
    id: "order1",
    orderNumber: "INN-20260104-001",
    restaurantId: "resto-1",
    restaurantName: "Innova Grill",
    clientName: "Sarah Kamdem",
    clientPhone: "+237 690 123 456",
    clientAddress: "Bastos, Rue 1234, Yaoundé",
    items: [
      {
        id: "p1-1",
        productId: "p1",
        name: "Poulet DG",
        price: 5300,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&auto=format&fit=crop&q=60",
        selectedOptions: [{ name: "Cuisson", value: "Fumé" }],
      },
    ],
    subtotal: 10600,
    deliveryFee: 500,
    serviceFee: 100,
    total: 11200,
    status: "preparing",
    paymentMethod: "cash",
    notes: "Sonnez 2 fois",
    createdAt: new Date("2026-01-04T10:30:00"),
  },
  {
    id: "order2",
    orderNumber: "INN-20260104-002",
    restaurantId: "resto-1",
    restaurantName: "Innova Grill",
    clientName: "Jean Mbala",
    clientPhone: "+237 691 234 567",
    clientAddress: "Melen, Yaoundé",
    items: [
      {
        id: "ff1-1",
        productId: "ff1",
        name: "Burger Signature",
        price: 5200,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=60",
      },
    ],
    subtotal: 5200,
    deliveryFee: 500,
    serviceFee: 100,
    total: 5800,
    status: "pending",
    paymentMethod: "cash",
    createdAt: new Date("2026-01-04T11:15:00"),
  },
];

export const useOrders = create<OrdersState>((set, get) => ({
  orders: demoOrders,

  addOrder: (orderData) => {
    const orderNumber = `INN-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(get().orders.length + 1).padStart(3, "0")}`;
    const newOrder: Order = {
      ...orderData,
      id: `order${Date.now()}`,
      orderNumber,
      createdAt: new Date(),
      status: "pending",
    };
    set((state) => ({
      orders: [...state.orders, newOrder],
    }));
    return newOrder.id;
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    }));
  },

  getOrderById: (orderId) => {
    return get().orders.find((order) => order.id === orderId);
  },

  getOrdersByRestaurant: (restaurantId) => {
    return get().orders.filter((order) => order.restaurantId === restaurantId);
  },

  getOrdersByStatus: (status) => {
    return get().orders.filter((order) => order.status === status);
  },

  getOrdersByClient: (clientPhone) => {
    return get().orders.filter((order) => order.clientPhone === clientPhone);
  },
}));
