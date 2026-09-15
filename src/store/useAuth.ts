import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "client" | "restaurant" | "livreur" | "admin" | null;

interface AuthState {
  userId: string | null;
  role: UserRole;
  displayName: string | null;
  restaurantId: string | null; // Entreprise/restaurant associé au compte
  email: string | null;
  setAuth: (payload: { userId: string; role: UserRole; displayName?: string; restaurantId?: string; email?: string }) => void;
  clear: () => void;
  setRestaurantId: (restaurantId: string | null) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      role: null,
      displayName: null,
      restaurantId: null,
      email: null,
      setAuth: ({ userId, role, displayName, restaurantId, email }) =>
        set({ 
          userId, 
          role, 
          displayName: displayName ?? null,
          restaurantId: restaurantId ?? null,
          email: email ?? null,
        }),
      clear: () => set({ userId: null, role: null, displayName: null, restaurantId: null, email: null }),
      setRestaurantId: (restaurantId) => set({ restaurantId }),
    }),
    {
      name: "auth-storage",
    }
  )
);

