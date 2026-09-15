"use client";

import Link from "next/link";
import { SiteShell } from "@/components/layouts/SiteShell";
import { useRestaurants } from "@/store/useRestaurants";
import { useAuth } from "@/store/useAuth";
import { Clock, Star, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RestaurantsPage() {
  const restaurants = useRestaurants((state) => state.restaurants);
  const { userId, restaurantId } = useAuth();
  const router = useRouter();

  const handleRestaurantClick = (restoId: string) => {
    // Si l'utilisateur n'est pas connecté, rediriger vers signup avec l'entreprise
    if (!userId) {
      router.push(`/signup?restaurantId=${restoId}`);
      return;
    }
    
    // Si l'utilisateur est connecté mais avec une autre entreprise, demander confirmation
    if (restaurantId && restaurantId !== restoId) {
      if (confirm("Vous avez déjà un compte avec une autre entreprise. Voulez-vous changer d'entreprise ?")) {
        router.push(`/signup?restaurantId=${restoId}&change=true`);
        return;
      }
    }
    
    // Sinon, rediriger vers le menu
    router.push(`/restaurants/${restoId}`);
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Restaurants
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-slate-900">Sélectionnez votre entreprise</h1>
            <p className="text-slate-600">
              {restaurants.filter(r => r.isOpen).length} restaurant{restaurants.filter(r => r.isOpen).length > 1 ? 's' : ''} ouvert{restaurants.filter(r => r.isOpen).length > 1 ? 's' : ''}
            </p>
          </div>
          <p className="text-sm text-slate-600">
            Sélectionnez une entreprise pour créer votre compte et accéder aux menus
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((resto) => (
            <div
              key={resto.id}
              onClick={() => handleRestaurantClick(resto.id)}
              className="card group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                {resto.cover ? (
                  <img 
                    src={resto.cover} 
                    alt={resto.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10" />
                )}
                {!resto.isOpen && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                      Fermé
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-[var(--color-primary)]">
                      {resto.name}
                    </h3>
                    <p className="text-sm text-slate-600">{resto.cuisine}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                    <Star className="h-3 w-3 fill-current" />
                    {resto.rating}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {resto.eta}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {resto.deliveryFee} FCFA
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}

