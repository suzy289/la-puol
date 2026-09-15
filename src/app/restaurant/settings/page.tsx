import { DashboardShell } from "@/components/layouts/DashboardShell";

const navItems = [
  { href: "/restaurant/dashboard", label: "Tableau de bord" },
  { href: "/restaurant/orders", label: "Commandes" },
  { href: "/restaurant/menu", label: "Menu" },
  { href: "/restaurant/settings", label: "Paramètres" },
];

export default function RestaurantSettingsPage() {
  return (
    <DashboardShell title="Paramètres" navItems={navItems} badge="Restaurant">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Informations générales</h3>
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Nom du restaurant" />
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Téléphone" />
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Email" />
          <textarea className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Description" />
          <button className="btn btn-primary text-sm">Sauvegarder</button>
        </div>
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Horaires</h3>
          <div className="space-y-2 text-sm text-slate-700">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
              <div key={day} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white px-3 py-2">
                <span>{day}</span>
                <input className="w-28 rounded border border-[var(--color-border)] px-2 py-1 text-xs" placeholder="08:00 - 22:00" />
              </div>
            ))}
          </div>
          <button className="btn btn-ghost text-sm">Mettre à jour</button>
        </div>
      </div>
    </DashboardShell>
  );
}

