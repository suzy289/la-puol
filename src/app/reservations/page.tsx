import { SiteShell } from "@/components/layouts/SiteShell";

export default function ReservationCreatePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Réserver une table
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Planifiez votre venue</h1>
          <p className="text-sm text-slate-600">
            Sélectionnez la date, l&apos;heure et le nombre de personnes.
          </p>
        </div>
        <div className="card space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Heure</label>
              <input
                type="time"
                className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Personnes</label>
              <input
                type="number"
                min={1}
                className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                placeholder="4"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium text-slate-700">Notes</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                placeholder="Allergies, préférences, occasion..."
              />
            </div>
          </div>
          <button className="btn btn-accent w-full justify-center text-sm">Confirmer la réservation</button>
        </div>
      </div>
    </SiteShell>
  );
}

