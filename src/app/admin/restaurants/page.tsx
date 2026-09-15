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

const restaurants = [
  { id: "resto-1", name: "Innova Grill", status: "actif", commission: "12%" },
  { id: "resto-2", name: "Meriaz Kitchen", status: "en attente", commission: "10%" },
];

export default function AdminRestaurantsPage() {
  return (
    <DashboardShell title="Restaurants" navItems={navItems} badge="Admin">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Liste</h3>
        <button className="btn btn-accent text-sm">Ajouter un restaurant</button>
      </div>
      <div className="card divide-y divide-[var(--color-border)]">
        {restaurants.map((resto) => (
          <div key={resto.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-slate-900">{resto.name}</p>
              <p className="text-sm text-slate-600">Commission : {resto.commission}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="pill capitalize">{resto.status}</span>
              <button className="btn btn-ghost">Activer/Désactiver</button>
              <button className="btn btn-ghost text-red-600">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

