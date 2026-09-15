import { ArrowRight, Clock3, MapPin, Shield, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/layouts/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      <section className="bg-gradient-to-b from-white via-white to-[var(--color-background)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
              Livraison locale • Réservation en ligne • Temps réel
            </div>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Innova, commandez vos menus{" "}
              <span className="text-[var(--color-accent)]">en un clic</span>
            </h1>
            <p className="text-lg text-slate-600">
              Découvrez les restaurants de votre ville, passez commande, suivez vos
              livraisons ou réservez une table. Une seule plateforme pour les clients,
              restaurateurs et livreurs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/restaurants" className="btn btn-accent">
                Explorer les restaurants <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/signup" className="btn btn-ghost">
                Créer un compte
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-700 sm:text-base">
              <div className="card space-y-2 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <UtensilsCrossed className="h-5 w-5 text-[var(--color-primary)]" />
                  Restaurants partenaires
                </div>
                <p className="text-slate-600">Menus vérifiés, photos et options.</p>
              </div>
              <div className="card space-y-2 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Clock3 className="h-5 w-5 text-[var(--color-accent)]" />
                  Suivi en temps réel
                </div>
                <p className="text-slate-600">Statuts de commande mis à jour en live.</p>
              </div>
            </div>
          </div>
          <div className="card relative overflow-hidden p-6">
            <div className="absolute right-8 top-8 rounded-full bg-[var(--color-primary)]/10 px-4 py-1 text-xs font-semibold text-[var(--color-primary)]">
              Nouvelle commande
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Commande #INN-20251211</span>
                <span className="pill bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  En préparation
                </span>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Restaurant</span>
                  <span className="font-semibold">Innova Grill</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Client</span>
                  <span className="font-semibold">Sarah K.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="font-semibold text-[var(--color-primary)]">9 800 FCFA</span>
                </div>
              </div>
              <div className="h-px bg-[var(--color-border)]" />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Shield className="h-4 w-4 text-[var(--color-secondary)]" />
                  Paiement : Cash à la livraison
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                  Livraison : 25 min estimées
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
                Pourquoi Innova ?
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                Une plateforme unique pour clients, restaurants et livreurs.
              </h2>
              <p className="text-slate-600">
                Interface publique inspirée de UberEats/Glovo, dashboards dédiés pour chaque rôle,
                notifications temps réel et flux de paiement évolutifs.
              </p>
            </div>
            <div className="card p-5 space-y-2">
              <div className="pill bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                Clients
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Commander & réserver</h3>
              <p className="text-sm text-slate-600">
                Recherche, filtres, panier, checkout cash, suivi live, historique, adresses et
                réservations.
              </p>
            </div>
            <div className="card p-5 space-y-2">
              <div className="pill bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
                Restaurants
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Dashboard complet</h3>
              <p className="text-sm text-slate-600">
                Commandes (pending → ready), menu CRUD, horaires, taux de commission, stats jour/mois.
              </p>
            </div>
            <div className="card p-5 space-y-2">
              <div className="pill bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                Livreurs
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Livraisons en temps réel</h3>
              <p className="text-sm text-slate-600">
                Disponibilité, livraisons disponibles, acceptation, suivi picked_up → delivering → delivered.
              </p>
            </div>
            <div className="card p-5 space-y-2">
              <div className="pill bg-slate-100 text-slate-700">Admin</div>
              <h3 className="text-lg font-semibold text-slate-900">Pilotage global</h3>
              <p className="text-sm text-slate-600">
                Restaurants, livreurs, clients, commandes, transactions, commissions, paramètres.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[var(--color-primary)]/5 via-white to-[var(--color-secondary)]/10">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                Fonctionnalités MVP
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                De la découverte au suivi livraison, tout est prêt.
              </h2>
              <ul className="grid gap-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  Routing Next.js App Router pour les 4 rôles et toutes les pages clés.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  Tailwind v4 + ShadCN-ready utilitaires + tokens couleurs Meriaz + orangered CTA.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  Firebase (Auth/Firestore/Storage) préconfiguré via env NEXT_PUBLIC_*.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                  Stores Zustand pour auth et panier, composants formulaires RHF + Zod.
                </li>
              </ul>
              <div className="flex gap-3">
                <Link href="/restaurants" className="btn btn-primary">
                  Lancer une commande
                </Link>
                <Link href="/restaurant/dashboard" className="btn btn-ghost">
                  Espace restaurant
                </Link>
              </div>
            </div>
            <div className="card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">Statuts</p>
                  <h3 className="text-lg font-semibold text-slate-900">Flux commande</h3>
                </div>
                <div className="pill bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  Temps réel
                </div>
              </div>
              <div className="grid gap-3 text-sm">
                {[
                  { label: "pending", desc: "Nouvelle commande" },
                  { label: "accepted", desc: "Validée par le restaurant" },
                  { label: "preparing", desc: "En cuisine" },
                  { label: "ready", desc: "Prête pour le livreur" },
                  { label: "picked_up", desc: "Récupérée" },
                  { label: "delivering", desc: "En route" },
                  { label: "delivered", desc: "Livrée" },
                ].map((step) => (
                  <div
                    key={step.label}
                    className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-white px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
                      <div>
                        <p className="font-semibold text-slate-900">{step.label}</p>
                        <p className="text-xs text-slate-600">{step.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
