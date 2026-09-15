import { SiteShell } from "@/components/layouts/SiteShell";

export default function ProfilePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Profil
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Mes informations</h1>
          <p className="text-sm text-slate-600">Mettez à jour vos coordonnées et sécurité.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card p-4 space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Identité</h3>
            <input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Nom complet" />
            <input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Email" />
            <input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Téléphone" />
            <button className="btn btn-primary w-full justify-center text-sm">Enregistrer</button>
          </div>
          <div className="card p-4 space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">Sécurité</h3>
            <input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Nouveau mot de passe" />
            <input className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" placeholder="Confirmer" />
            <button className="btn btn-ghost w-full justify-center text-sm">Mettre à jour</button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

