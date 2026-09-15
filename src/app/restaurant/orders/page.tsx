"use client";

import { DashboardShell } from "@/components/layouts/DashboardShell";
import { useOrders, OrderStatus } from "@/store/useOrders";
import { useState } from "react";
import { Clock, Package, CheckCircle, XCircle, Search } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const navItems = [
  { href: "/restaurant/dashboard", label: "Tableau de bord" },
  { href: "/restaurant/orders", label: "Commandes" },
  { href: "/restaurant/menu", label: "Menu" },
  { href: "/restaurant/settings", label: "Paramètres" },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Clock; nextStatus?: OrderStatus }> = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800", icon: Clock, nextStatus: "confirmed" },
  confirmed: { label: "Confirmée", color: "bg-blue-100 text-blue-800", icon: Package, nextStatus: "preparing" },
  preparing: { label: "En préparation", color: "bg-orange-100 text-orange-800", icon: Package, nextStatus: "ready" },
  ready: { label: "Prête", color: "bg-green-100 text-green-800", icon: CheckCircle, nextStatus: "on_delivery" },
  on_delivery: { label: "En livraison", color: "bg-purple-100 text-purple-800", icon: Package },
  delivered: { label: "Livrée", color: "bg-green-600 text-white", icon: CheckCircle },
  cancelled: { label: "Annulée", color: "bg-red-100 text-red-800", icon: XCircle },
};

export default function RestaurantOrdersPage() {
  // TODO: Get from auth context
  const RESTAURANT_ID = "resto-1";
  
  const { getOrdersByRestaurant, updateOrderStatus } = useOrders();
  const orders = getOrdersByRestaurant(RESTAURANT_ID);
  
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders
    .filter(order => filterStatus === "all" || order.status === filterStatus)
    .filter(order => 
      searchQuery === "" ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Commande mise à jour : ${statusConfig[newStatus].label}`);
  };

  const ordersByStatus = {
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    ready: orders.filter(o => o.status === "ready").length,
  };

  return (
    <DashboardShell title="Commandes" navItems={navItems} badge="Restaurant">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestion des Commandes</h2>
          <p className="text-sm text-slate-600">{orders.length} commande{orders.length > 1 ? 's' : ''} au total</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-4">
            <p className="text-sm text-slate-600">En attente</p>
            <p className="text-2xl font-bold text-yellow-600">{ordersByStatus.pending}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-slate-600">Confirmées</p>
            <p className="text-2xl font-bold text-blue-600">{ordersByStatus.confirmed}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-slate-600">En préparation</p>
            <p className="text-2xl font-bold text-orange-600">{ordersByStatus.preparing}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-slate-600">Prêtes</p>
            <p className="text-2xl font-bold text-green-600">{ordersByStatus.ready}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par numéro ou client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "all")}
            className="rounded-lg border border-slate-300 px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmées</option>
            <option value="preparing">En préparation</option>
            <option value="ready">Prêtes</option>
            <option value="on_delivery">En livraison</option>
            <option value="delivered">Livrées</option>
            <option value="cancelled">Annulées</option>
          </select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-slate-600">Aucune commande trouvée</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const config = statusConfig[order.status];
              const Icon = config.icon;
              
              return (
                <div key={order.id} className="card p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900">{order.orderNumber}</span>
                        <span className={`pill ${config.color} flex items-center gap-1.5`}>
                          <Icon className="h-3.5 w-3.5" />
                          {config.label}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-slate-600">
                        <p>
                          <span className="font-semibold">Client:</span> {order.clientName}
                        </p>
                        <p>
                          <span className="font-semibold">Articles:</span> {order.items.length} article{order.items.length > 1 ? 's' : ''}
                        </p>
                        <p>
                          <span className="font-semibold">Total:</span> {order.total.toLocaleString()} FCFA
                        </p>
                        <p className="text-xs">
                          {order.createdAt.toLocaleDateString('fr-FR', { 
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {config.nextStatus && order.status !== "delivered" && order.status !== "cancelled" && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, config.nextStatus!)}
                          className="btn btn-accent text-sm"
                        >
                          {config.nextStatus === "confirmed" && "Confirmer"}
                          {config.nextStatus === "preparing" && "Préparer"}
                          {config.nextStatus === "ready" && "Marquer prête"}
                          {config.nextStatus === "on_delivery" && "En livraison"}
                        </button>
                      )}
                      {order.status === "pending" && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "cancelled")}
                          className="btn btn-ghost text-sm text-red-600"
                        >
                          Annuler
                        </button>
                      )}
                      <Link
                        href={`/orders/${order.id}`}
                        className="btn btn-ghost text-sm"
                      >
                        Détails
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
