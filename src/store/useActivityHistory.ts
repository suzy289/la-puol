import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActivityType = 
  | "account_created" 
  | "login" 
  | "logout"
  | "menu_viewed"
  | "item_added_to_cart"
  | "item_removed_from_cart"
  | "order_placed"
  | "order_cancelled"
  | "order_viewed"
  | "profile_updated";

export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  restaurantId?: string;
  restaurantName?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

interface ActivityHistoryState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
  getActivitiesByUser: (userId: string) => Activity[];
  getActivitiesByRestaurant: (restaurantId: string) => Activity[];
  clearActivities: (userId?: string) => void;
}

export const useActivityHistory = create<ActivityHistoryState>()(
  persist(
    (set, get) => ({
      activities: [],

      addActivity: (activityData) => {
        const activity: Activity = {
          ...activityData,
          id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
        };
        set((state) => ({
          activities: [activity, ...state.activities].slice(0, 1000), // Garder les 1000 dernières
        }));
      },

      getActivitiesByUser: (userId) => {
        return get()
          .activities.filter((a) => a.userId === userId)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      },

      getActivitiesByRestaurant: (restaurantId) => {
        return get()
          .activities.filter((a) => a.restaurantId === restaurantId)
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      },

      clearActivities: (userId) => {
        if (userId) {
          set((state) => ({
            activities: state.activities.filter((a) => a.userId !== userId),
          }));
        } else {
          set({ activities: [] });
        }
      },
    }),
    {
      name: "activity-history-storage",
    }
  )
);
