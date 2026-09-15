"use client";

import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { SiteShell } from "@/components/layouts/SiteShell";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { useRestaurants } from "@/store/useRestaurants";
import { useActivityHistory } from "@/store/useActivityHistory";
import { useEffect } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const restaurantId = searchParams.get("restaurantId");
  const { setAuth, userId, restaurantId: userRestaurantId } = useAuth();
  const getRestaurantById = useRestaurants((state) => state.getRestaurantById);
  const { addActivity } = useActivityHistory();
  
  const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;

  useEffect(() => {
    // Si l'utilisateur est déjà connecté avec la bonne entreprise, rediriger
    if (userId && userRestaurantId && restaurantId && userRestaurantId === restaurantId) {
      router.push(`/restaurants/${restaurantId}`);
    } else if (userId && userRestaurantId && !restaurantId) {
      // Si connecté sans restaurantId, rediriger vers son restaurant
      router.push(`/restaurants/${userRestaurantId}`);
    }
  }, [userId, userRestaurantId, restaurantId, router]);

  const handleLogin = async (values: { email: string; password: string }) => {
    // Simulation de connexion - vérifier si le compte existe et correspond à l'entreprise
    if (restaurantId && userRestaurantId && userRestaurantId !== restaurantId) {
      alert("Ce compte est associé à une autre entreprise. Veuillez vous connecter avec le compte correspondant.");
      return;
    }

    // Simuler la connexion avec les données existantes ou créer une nouvelle session
    const currentUserId = userId || `user-${Date.now()}`;
    const finalRestaurantId = restaurantId || userRestaurantId || null;
    const finalRestaurant = finalRestaurantId ? getRestaurantById(finalRestaurantId) : null;
    
    setAuth({
      userId: currentUserId,
      role: "client",
      displayName: values.email.split("@")[0],
      restaurantId: finalRestaurantId ?? undefined,
      email: values.email,
    });

    // Enregistrer l'activité
    addActivity({
      userId: currentUserId,
      type: "login",
      description: `Connexion${finalRestaurant ? ` à ${finalRestaurant.name}` : ""}`,
      restaurantId: finalRestaurantId || undefined,
      restaurantName: finalRestaurant?.name,
      metadata: { email: values.email },
    });

    // Rediriger vers le menu de l'entreprise
    if (restaurantId) {
      router.push(`/restaurants/${restaurantId}`);
    } else if (userRestaurantId) {
      router.push(`/restaurants/${userRestaurantId}`);
    } else {
      router.push("/restaurants");
    }
  };

  return (
    <SiteShell>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            Connexion
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            {restaurant ? `Connexion - ${restaurant.name}` : "Rejoignez votre espace Innova"}
          </h1>
          <p className="text-sm text-slate-600">
            {restaurant 
              ? `Connectez-vous pour accéder aux menus de ${restaurant.name}`
              : "Accédez à vos commandes, réservations et dashboards selon votre rôle."}
          </p>
        </div>
        {restaurant && (
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
        )}
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div className="text-sm text-slate-600">
          Pas encore de compte ?{" "}
          <Link 
            href={restaurantId ? `/signup?restaurantId=${restaurantId}` : "/signup"} 
            className="font-semibold text-[var(--color-primary)]"
          >
            Créer un compte
          </Link>
        </div>
        <Link href="/reset-password" className="text-xs text-[var(--color-primary)]">
          Mot de passe oublié ?
        </Link>
      </div>
    </SiteShell>
  );
}

