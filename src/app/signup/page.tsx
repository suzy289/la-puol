"use client";

import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { SiteShell } from "@/components/layouts/SiteShell";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { useRestaurants } from "@/store/useRestaurants";
import { useActivityHistory } from "@/store/useActivityHistory";
import { useEffect } from "react";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const restaurantId = searchParams.get("restaurantId");
  const change = searchParams.get("change");
  const { setAuth, userId } = useAuth();
  const getRestaurantById = useRestaurants((state) => state.getRestaurantById);
  const { addActivity } = useActivityHistory();
  
  const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;

  useEffect(() => {
    // Si l'utilisateur est déjà connecté et qu'il a déjà cette entreprise, rediriger vers le menu
    if (userId && restaurantId) {
      const { restaurantId: userRestaurantId } = useAuth.getState();
      if (userRestaurantId === restaurantId) {
        router.push(`/restaurants/${restaurantId}`);
      }
    }
  }, [userId, restaurantId, router]);

  const handleSignup = async (values: { email: string; password: string }) => {
    if (!restaurantId) {
      alert("Veuillez sélectionner une entreprise d'abord");
      router.push("/restaurants");
      return;
    }

    // Simulation de création de compte
    const newUserId = `user-${Date.now()}`;
    setAuth({
      userId: newUserId,
      role: "client",
      displayName: values.email.split("@")[0],
      restaurantId: restaurantId,
      email: values.email,
    });

    // Enregistrer l'activité
    addActivity({
      userId: newUserId,
      type: "account_created",
      description: `Compte créé pour ${restaurant?.name || restaurantId}`,
      restaurantId: restaurantId,
      restaurantName: restaurant?.name,
      metadata: { email: values.email },
    });

    // Rediriger vers le menu de l'entreprise
    router.push(`/restaurants/${restaurantId}`);
  };

  return (
    <SiteShell>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Création de compte
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            {restaurant ? `Créez votre compte - ${restaurant.name}` : "Bienvenue sur Innova"}
          </h1>
          <p className="text-sm text-slate-600">
            {restaurant 
              ? `Créez votre compte pour accéder aux menus de ${restaurant.name}`
              : "Sélectionnez d'abord une entreprise depuis la liste des restaurants."}
          </p>
          {!restaurant && (
            <Link href="/restaurants" className="text-[var(--color-primary)] hover:underline">
              Voir les restaurants →
            </Link>
          )}
        </div>
        {restaurant ? (
          <>
            <div className="card w-full max-w-md p-4 mb-2">
              <div className="flex items-center gap-3">
                {restaurant.logo && (
                  <img src={restaurant.logo} alt={restaurant.name} className="h-12 w-12 rounded-lg object-cover" />
                )}
                <div>
                  <p className="font-semibold text-slate-900">{restaurant.name}</p>
                  <p className="text-xs text-slate-600">{restaurant.cuisine}</p>
                </div>
              </div>
            </div>
            <AuthForm mode="signup" onSubmit={handleSignup} />
          </>
        ) : (
          <div className="card w-full max-w-md p-6 text-center">
            <p className="text-slate-600 mb-4">
              Veuillez sélectionner une entreprise depuis la page des restaurants.
            </p>
            <Link href="/restaurants" className="btn btn-accent">
              Voir les restaurants
            </Link>
          </div>
        )}
        <div className="text-sm text-slate-600">
          Déjà inscrit ?{" "}
          <Link 
            href={restaurantId ? `/login?restaurantId=${restaurantId}` : "/login"} 
            className="font-semibold text-[var(--color-primary)]"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}

