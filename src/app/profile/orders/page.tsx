import Link from "next/link";
import { SiteShell } from "@/components/layouts/SiteShell";

const mockOrders = [
  { id: "INN-20251211-001", total: 9800, status: "delivered", date: "11/12/2025" },
  { id: "INN-20251210-004", total: 7200, status: "preparing", date: "10/12/2025" },
];

export default function ProfileOrdersPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              Mes commandes
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Historique</h1>
          </div>
          <Link href="/restaurants" className="btn btn-ghost text-sm">
            Nouvelle commande
          </Link>
        </div>
        <div className="card divide-y divide-[var(--color-border)]">
          {mockOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold text-slate-900">{order.id}</p>
                <p className="text-sm text-slate-600">{order.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="pill capitalize">{order.status}</span>
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  {order.total.toLocaleString()} FCFA
                </span>
                <Link href={`/orders/${order.id}`} className="btn btn-primary text-xs">
                  Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

