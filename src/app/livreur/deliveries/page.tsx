import { DashboardShell } from "@/components/layouts/DashboardShell";

const navItems = [
  { href: "/livreur/dashboard", label: "Tableau de bord" },
  { href: "/livreur/available", label: "Livraisons dispo" },
  { href: "/livreur/deliveries", label: "Mes livraisons" },
  { href: "/livreur/history", label: "Historique" },
  { href: "/livreur/settings", label: "Paramètres" },
];

const current = [
  { id: "INN-20251211-002", status: "picked_up", client: "Sarah K", address: "Quartier Business" },
  { id: "INN-20251210-004", status: "delivering", client: "Marc T", address: "Centre-ville" },
];

export default function LivreurDeliveriesPage() {
  return (
    <DashboardShell title="Mes livraisons" navItems={navItems} badge="Livreur">
      <div className="card divide-y divide-[var(--color-border)]">
        {current.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold text-slate-900">{order.id}</p>
              <p className="text-sm text-slate-600">
                Client : {order.client} • {order.address}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="pill capitalize">{order.status}</span>
              <button className="btn btn-primary">Mettre à jour</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

