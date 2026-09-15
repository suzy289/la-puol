import { DashboardShell } from "@/components/layouts/DashboardShell";

const navItems = [
  { href: "/livreur/dashboard", label: "Tableau de bord" },
  { href: "/livreur/available", label: "Livraisons dispo" },
  { href: "/livreur/deliveries", label: "Mes livraisons" },
  { href: "/livreur/history", label: "Historique" },
  { href: "/livreur/settings", label: "Paramètres" },
];

export default function LivreurDashboard() {
  return (
    <DashboardShell title="Livreur" navItems={navItems} badge="Livreur">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Livraisons aujourd'hui", value: "6" },
          { label: "En cours", value: "2" },
          { label: "Revenus jour", value: "18 400 FCFA" },
          { label: "Note moyenne", value: "4.8★" },
        ].map((kpi) => (
          <div key={kpi.label} className="card p-4">
            <p className="text-sm text-slate-600">{kpi.label}</p>
            <p className="text-xl font-bold text-slate-900">{kpi.value}</p>
          </div>
        ))}
      </div>
      <div className="card p-5 space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">Disponibilité</h3>
        <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white px-4 py-3">
          <p className="text-sm text-slate-700">Basculer en ligne/hors ligne</p>
          <button className="btn btn-accent text-sm">Disponible</button>
        </div>
      </div>
    </DashboardShell>
  );
}

