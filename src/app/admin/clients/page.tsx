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

const clients = [
  { id: "cli-1", name: "Sarah K", phone: "+237 XXX", orders: 14, spent: 126000 },
  { id: "cli-2", name: "Marc T", phone: "+237 XXX", orders: 6, spent: 42000 },
];

export default function AdminClientsPage() {
  return (
    <DashboardShell title="Clients" navItems={navItems} badge="Admin">
      <div className="card divide-y divide-[var(--color-border)]">
        {clients.map((client) => (
          <div key={client.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-slate-900">{client.name}</p>
              <p className="text-sm text-slate-600">{client.phone}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="pill">{client.orders} commandes</span>
              <span className="font-semibold text-[var(--color-primary)]">
                {client.spent.toLocaleString()} FCFA
              </span>
              <button className="btn btn-ghost">Voir profil</button>
              <button className="btn btn-ghost text-red-600">Désactiver</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

