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

export default function AdminDashboard() {
  return (
    <DashboardShell title="Admin" navItems={navItems} badge="Admin">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Restaurants actifs", value: "18" },
          { label: "Livreurs actifs", value: "45" },
          { label: "Commandes du jour", value: "126" },
          { label: "Revenus jour", value: "1 450 000 FCFA" },
        ].map((kpi) => (
          <div key={kpi.label} className="card p-4">
            <p className="text-sm text-slate-600">{kpi.label}</p>
            <p className="text-xl font-bold text-slate-900">{kpi.value}</p>
          </div>
        ))}
      </div>
      <div className="card p-5 space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">Alertes</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-center justify-between">
            <span>2 restaurants en attente d&apos;activation</span>
            <button className="btn btn-ghost text-xs">Voir</button>
          </li>
          <li className="flex items-center justify-between">
            <span>3 livreurs à valider</span>
            <button className="btn btn-ghost text-xs">Gérer</button>
          </li>
        </ul>
      </div>
    </DashboardShell>
  );
}

