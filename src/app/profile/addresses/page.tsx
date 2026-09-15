import { SiteShell } from "@/components/layouts/SiteShell";

const addresses = [
  { id: "home", label: "Maison", details: "Quartier Business, Yaoundé", isDefault: true },
  { id: "office", label: "Bureau", details: "Centre-ville, Immeuble Bleu", isDefault: false },
];

export default function AddressesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              Adresses
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Mes points de livraison</h1>
          </div>
          <button className="btn btn-primary text-sm">Ajouter</button>
        </div>
        <div className="grid gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="card flex items-center justify-between p-4">
              <div>
                <p className="font-semibold text-slate-900">{addr.label}</p>
                <p className="text-sm text-slate-600">{addr.details}</p>
                {addr.isDefault ? (
                  <span className="pill mt-2 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                    Adresse par défaut
                  </span>
                ) : null}
              </div>
              <div className="flex gap-2 text-sm">
                <button className="btn btn-ghost">Modifier</button>
                <button className="btn btn-ghost text-red-600">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

