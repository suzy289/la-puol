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

const livreurs = [
  { id: "liv-1", name: "Paul N.", vehicle: "Moto", status: "actif" },
  { id: "liv-2", name: "Anna B.", vehicle: "Vélo", status: "en attente" },
];

export default function AdminLivreursPage() {
  return (
    <DashboardShell title="Livreurs" navItems={navItems} badge="Admin">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Liste</h3>
        <button className="btn btn-accent text-sm">Ajouter un livreur</button>
      </div>
      <div className="card divide-y divide-[var(--color-border)]">
        {livreurs.map((liv) => (
          <div key={liv.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-slate-900">{liv.name}</p>
              <p className="text-sm text-slate-600">{liv.vehicle}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="pill capitalize">{liv.status}</span>
              <button className="btn btn-ghost">Activer/Désactiver</button>
              <button className="btn btn-ghost text-red-600">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

