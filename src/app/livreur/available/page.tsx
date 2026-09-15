import { DashboardShell } from "@/components/layouts/DashboardShell";

const navItems = [
  { href: "/livreur/dashboard", label: "Tableau de bord" },
  { href: "/livreur/available", label: "Livraisons dispo" },
  { href: "/livreur/deliveries", label: "Mes livraisons" },
  { href: "/livreur/history", label: "Historique" },
  { href: "/livreur/settings", label: "Paramètres" },
];

const available = [
  { id: "INN-20251211-001", restaurant: "Innova Grill", address: "Business, Yaoundé", fee: 800 },
  { id: "INN-20251211-002", restaurant: "Meriaz Kitchen", address: "Centre-ville", fee: 700 },
];

export default function LivreurAvailablePage() {
  return (
    <DashboardShell title="Livraisons disponibles" navItems={navItems} badge="Livreur">
      <div className="card divide-y divide-[var(--color-border)]">
        {available.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-slate-900">{order.id}</p>
              <p className="text-sm text-slate-600">
                {order.restaurant} • {order.address}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="pill text-[var(--color-secondary)]">
                Gain {order.fee.toLocaleString()} FCFA
              </span>
              <button className="btn btn-primary">Accepter</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

