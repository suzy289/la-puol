import { DashboardShell } from "@/components/layouts/DashboardShell";

const navItems = [
  { href: "/livreur/dashboard", label: "Tableau de bord" },
  { href: "/livreur/available", label: "Livraisons dispo" },
  { href: "/livreur/deliveries", label: "Mes livraisons" },
  { href: "/livreur/history", label: "Historique" },
  { href: "/livreur/settings", label: "Paramètres" },
];

export default function LivreurSettingsPage() {
  return (
    <DashboardShell title="Paramètres" navItems={navItems} badge="Livreur">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Profil livreur</h3>
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Nom complet" />
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Téléphone" />
          <select className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm">
            <option>Type de véhicule</option>
            <option>Moto</option>
            <option>Vélo</option>
            <option>Voiture</option>
          </select>
          <button className="btn btn-primary text-sm">Sauvegarder</button>
        </div>
        <div className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Paiement</h3>
          <input className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Mobile Money / IBAN" />
          <button className="btn btn-ghost text-sm">Mettre à jour</button>
        </div>
      </div>
    </DashboardShell>
  );
}

