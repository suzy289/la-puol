import { SiteShell } from "@/components/layouts/SiteShell";

const reservations = [
  { id: "res-01", date: "12/12/2025", time: "19:30", people: 4, status: "confirmed" },
  { id: "res-02", date: "15/12/2025", time: "12:00", people: 2, status: "pending" },
];

export default function ReservationsPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              Réservations
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Mes réservations</h1>
          </div>
          <button className="btn btn-accent text-sm">Nouvelle réservation</button>
        </div>
        <div className="card divide-y divide-[var(--color-border)]">
          {reservations.map((resa) => (
            <div key={resa.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold text-slate-900">
                  {resa.date} • {resa.time} • {resa.people} pers.
                </p>
                <p className="text-sm text-slate-600">Restaurant : Innova Grill</p>
              </div>
              <span className="pill capitalize">{resa.status}</span>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

