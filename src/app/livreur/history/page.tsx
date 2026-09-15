import { DashboardShell } from "@/components/layouts/DashboardShell";

const navItems = [
  { href: "/livreur/dashboard", label: "Tableau de bord" },
  { href: "/livreur/available", label: "Livraisons dispo" },
  { href: "/livreur/deliveries", label: "Mes livraisons" },
  { href: "/livreur/history", label: "Historique" },
  { href: "/livreur/settings", label: "Paramètres" },
];

const history = [
  { id: "INN-20251209-010", amount: 700, date: "09/12/2025" },
  { id: "INN-20251208-006", amount: 850, date: "08/12/2025" },
];

export default function LivreurHistoryPage() {
  return (
    <DashboardShell title="Historique" navItems={navItems} badge="Livreur">
      <div className="card divide-y divide-[var(--color-border)]">
        {history.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-slate-900">{item.id}</p>
              <p className="text-sm text-slate-600">{item.date}</p>
            </div>
            <span className="text-sm font-semibold text-[var(--color-primary)]">
              +{item.amount.toLocaleString()} FCFA
            </span>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

