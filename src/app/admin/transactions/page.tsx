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

const transactions = [
  { id: "txn-1", orderId: "INN-20251211-001", total: 9800, commission: 980, restaurant: 7840 },
  { id: "txn-2", orderId: "INN-20251211-002", total: 12400, commission: 1240, restaurant: 9920 },
];

export default function AdminTransactionsPage() {
  return (
    <DashboardShell title="Transactions" navItems={navItems} badge="Admin">
      <div className="card divide-y divide-[var(--color-border)]">
        {transactions.map((txn) => (
          <div key={txn.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-slate-900">{txn.orderId}</p>
              <p className="text-sm text-slate-600">Transaction : {txn.id}</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex flex-col text-right">
                <span>Total {txn.total.toLocaleString()} FCFA</span>
                <span>Commission {txn.commission.toLocaleString()} FCFA</span>
                <span>Restaurant {txn.restaurant.toLocaleString()} FCFA</span>
              </div>
              <button className="btn btn-ghost">Exporter</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

