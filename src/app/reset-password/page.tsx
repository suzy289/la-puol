import { SiteShell } from "@/components/layouts/SiteShell";

export default function ResetPasswordPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-md space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Réinitialisation
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Mot de passe oublié</h1>
          <p className="text-sm text-slate-600">
            Saisissez votre email, nous vous enverrons un lien de réinitialisation.
          </p>
        </div>
        <div className="card space-y-4 p-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
              placeholder="email@example.com"
            />
          </div>
          <button className="btn btn-primary w-full justify-center text-sm">
            Envoyer le lien
          </button>
        </div>
      </div>
    </SiteShell>
  );
}

