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

export default function AdminSettingsPage() {
  return (
    <DashboardShell title="Paramètres" navItems={navItems} badge="Admin">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Tarification</h3>
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Commission par défaut (%)" />
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Frais de service (FCFA)" />
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Frais de livraison (forfait ou km)" />
          <button className="btn btn-primary text-sm">Enregistrer</button>
        </div>
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Notifications & rôles</h3>
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Template notification FCM" />
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Ajouter un admin (email)" />
          <button className="btn btn-ghost text-sm">Mettre à jour</button>
        </div>
      </div>
    </DashboardShell>
  );
}

