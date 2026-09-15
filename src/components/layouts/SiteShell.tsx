"use client";

import Link from "next/link";
import { Menu, ShoppingCart, User } from "lucide-react";
import { PropsWithChildren } from "react";
import { useCart } from "@/store/useCart";

export function SiteShell({ children }: PropsWithChildren) {
  const items = useCart((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="h-3 w-3 rounded-full bg-[var(--color-primary)]" />
            <span>Innova</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
            <Link href="/restaurants">Restaurants</Link>
            <Link href="/reservations">Réservations</Link>
            <Link href="/about">À propos</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn btn-ghost text-sm">
              Connexion
            </Link>
            <Link href="/signup" className="btn btn-accent text-sm">
              Créer un compte
            </Link>
            <Link
              href="/cart"
              className="relative hidden rounded-full border border-[var(--color-border)] p-2 text-slate-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] md:inline-flex"
              aria-label="Panier"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="inline-flex rounded-full border border-[var(--color-border)] p-2 text-slate-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-lg font-bold">
                <div className="h-3 w-3 rounded-full bg-[var(--color-primary)]" />
                Innova
              </div>
              <p className="text-sm text-slate-600">
                Commandez, réservez et suivez vos repas en temps réel.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-800">Liens</h4>
              <div className="flex flex-col text-sm text-slate-600">
                <Link href="/restaurants">Restaurants</Link>
                <Link href="/profile/orders">Mes commandes</Link>
                <Link href="/profile/history">Mon historique</Link>
                <Link href="/profile/reservations">Mes réservations</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} Innova. Tous droits réservés.</span>
            <div className="flex items-center gap-4">
              <Link href="/legal">Mentions légales</Link>
              <Link href="/privacy">Confidentialité</Link>
              <Link href="/terms">CGU</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

