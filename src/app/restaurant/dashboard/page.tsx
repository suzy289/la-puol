"use client";

import { DashboardShell } from "@/components/layouts/DashboardShell";
import { useOrders } from "@/store/useOrders";
import { useRestaurants } from "@/store/useRestaurants";
import { TrendingUp, Package, DollarSign, Star, Clock } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/restaurant/dashboard", label: "Tableau de bord" },
  { href: "/restaurant/orders", label: "Commandes" },
  { href: "/restaurant/menu", label: "Menu" },
  { href: "/restaurant/settings", label: "Paramètres" },
];

const statusConfig = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmée", color: "bg-blue-100 text-blue-800" },
  preparing: { label: "En préparation", color: "bg-orange-100 text-orange-800" },
  ready: { label: "Prête", color: "bg-green-100 text-green-800" },
  on_delivery: { label: "En livraison", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Livrée", color: "bg-green-600 text-white" },
  cancelled: { label: "Annulée", color: "bg-red-100 text-red-800" },
};

export default function RestaurantDashboard() {
  // TODO: Get from auth context
  const RESTAURANT_ID = "resto-1";
  
  const { getOrdersByRestaurant } = useOrders();
  const { getRestaurantById, getMenuByRestaurant } = useRestaurants();
  
  const orders = getOrdersByRestaurant(RESTAURANT_ID);
  const restaurant = getRestaurantById(RESTAURANT_ID);
  const menuItems = getMenuByRestaurant(RESTAURANT_ID);
  
  // Calculate today's orders (demo: showing all)
  const todayOrders = orders;
  const activeOrders = orders.filter(o => 
    ['pending', 'confirmed', 'preparing', 'ready', 'on_delivery'].includes(o.status)
  );
  
  const todayRevenue = todayOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0);
  
  const recentOrders = orders.slice(0, 5);

  return (
    <DashboardShell title="Restaurant" navItems={navItems} badge="Restaurant">
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Bienvenue, {restaurant?.name || "Restaurant"} 👋
          </h2>
          <p className="text-slate-600">Voici votre activité du jour</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-3">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Commandes du jour</p>
                <p className="text-2xl font-bold text-slate-900">{todayOrders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 p-3">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">En cours</p>
                <p className="text-2xl font-bold text-slate-900">{activeOrders.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-3">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Revenus jour</p>
                <p className="text-2xl font-bold text-slate-900">
                  {todayRevenue.toLocaleString()} F
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-3">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Note moyenne</p>
                <p className="text-2xl font-bold text-slate-900">
                  {restaurant?.rating || "N/A"}★
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <div className="card">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Commandes récentes</h3>
                <Link href="/restaurant/orders" className="text-sm text-[var(--color-primary)] hover:underline">
                  Voir tout
                </Link>
              </div>
            </div>
            <div className="divide-y divide-slate-200">
              {recentOrders.length === 0 ? (
                <div className="p-5 text-center text-sm text-slate-600">
                  Aucune commande récente
                </div>
              ) : (
                recentOrders.map((order) => {
                  const config = statusConfig[order.status];
                  return (
                    <div key={order.id} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-semibold text-slate-900">{order.orderNumber}</p>
                        <p className="text-sm text-slate-600">{order.clientName}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`pill ${config.color} text-xs`}>
                          {config.label}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {order.total.toLocaleString()} F
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Menu Overview */}
          <div className="card">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Aperçu du menu</h3>
                <Link href="/restaurant/menu" className="text-sm text-[var(--color-primary)] hover:underline">
                  Gérer
                </Link>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total articles</span>
                <span className="font-bold text-slate-900">{menuItems.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Disponibles</span>
                <span className="font-bold text-green-600">
                  {menuItems.filter(m => m.available).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Indisponibles</span>
                <span className="font-bold text-red-600">
                  {menuItems.filter(m => !m.available).length}
                </span>
              </div>
              <Link href="/restaurant/menu" className="btn btn-accent w-full mt-4">
                Gérer le menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

