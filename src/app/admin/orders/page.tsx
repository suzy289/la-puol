import { DashboardShell } from "@/components/layouts/DashboardShell";

const navItems = [
  { href: "/admin/dashboard", label: "Tableau de bord" },
  { href: "/admin/restaurants", label: "Restaurants" },
  { href: "/admin/livreurs", label: "Livreurs" },
  { href: "/admin/orders", label: "Commandes" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/transactions", label: "Transactions" },
  { href: "/admin/settings", label: "Paramètres" },
];

const orders = [
  { id: "INN-20251211-001", restaurant: "Innova Grill", status: "pending", total: 9800 },
  { id: "INN-20251211-002", restaurant: "Meriaz Kitchen", status: "delivering", total: 12400 },
];

export default function AdminOrdersPage() {
  return (
    <DashboardShell title="Commandes" navItems={navItems} badge="Admin">
      <div className="card divide-y divide-[var(--color-border)]">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-slate-900">{order.id}</p>
              <p className="text-sm text-slate-600">{order.restaurant}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="pill capitalize">{order.status}</span>
              <span className="font-semibold text-[var(--color-primary)]">
                {order.total.toLocaleString()} FCFA
              </span>
              <button className="btn btn-ghost">Détails</button>
              <button className="btn btn-primary">Override statut</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

