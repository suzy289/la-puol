"use client";

import Link from "next/link";
import { SiteShell } from "@/components/layouts/SiteShell";
import { useActivityHistory } from "@/store/useActivityHistory";
import { useAuth } from "@/store/useAuth";
import { Clock, ShoppingCart, User, LogIn, LogOut, Eye, Plus, Trash2, Package, XCircle } from "lucide-react";
import { ActivityType } from "@/store/useActivityHistory";

const activityIcons: Record<ActivityType, typeof Clock> = {
  account_created: User,
  login: LogIn,
  logout: LogOut,
  menu_viewed: Eye,
  item_added_to_cart: Plus,
  item_removed_from_cart: Trash2,
  order_placed: ShoppingCart,
  order_cancelled: XCircle,
  order_viewed: Package,
  profile_updated: User,
};

const activityLabels: Record<ActivityType, string> = {
  account_created: "Compte créé",
  login: "Connexion",
  logout: "Déconnexion",
  menu_viewed: "Menu consulté",
  item_added_to_cart: "Article ajouté au panier",
  item_removed_from_cart: "Article retiré du panier",
  order_placed: "Commande passée",
  order_cancelled: "Commande annulée",
  order_viewed: "Commande consultée",
  profile_updated: "Profil mis à jour",
};

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days < 7) return `Il y a ${days} jour${days > 1 ? "s" : ""}`;
  
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ProfileHistoryPage() {
  const { userId } = useAuth();
  const { getActivitiesByUser } = useActivityHistory();
  
  const activities = userId ? getActivitiesByUser(userId) : [];

  if (!userId) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
          <div className="card p-12 text-center">
            <p className="text-lg font-semibold text-slate-900">Accès non autorisé</p>
            <p className="mt-2 text-sm text-slate-600">Veuillez vous connecter pour voir votre historique.</p>
            <Link href="/login" className="btn btn-accent mt-4">
              Se connecter
            </Link>
          </div>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              Historique
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Mes actions</h1>
            <p className="text-sm text-slate-600">
              Toutes vos activités sur la plateforme
            </p>
          </div>
          <Link href="/restaurants" className="btn btn-ghost text-sm">
            Nouvelle commande
          </Link>
        </div>

        {activities.length === 0 ? (
          <div className="card p-12 text-center">
            <Clock className="h-12 w-12 mx-auto text-slate-400 mb-4" />
            <p className="text-lg font-semibold text-slate-900">Aucune activité</p>
            <p className="mt-2 text-sm text-slate-600">
              Votre historique d'activités apparaîtra ici.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type] || Clock;
              return (
                <div
                  key={activity.id}
                  className="card p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="rounded-full bg-[var(--color-primary)]/10 p-2 flex-shrink-0">
                    <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">
                          {activityLabels[activity.type]}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {activity.description}
                        </p>
                        {activity.restaurantName && (
                          <p className="text-xs text-slate-500 mt-1">
                            Restaurant: {activity.restaurantName}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(activity.timestamp)}
                      </div>
                    </div>
                    {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <details className="text-xs text-slate-500">
                          <summary className="cursor-pointer hover:text-slate-700">
                            Détails
                          </summary>
                          <pre className="mt-2 text-xs bg-slate-50 p-2 rounded overflow-auto">
                            {JSON.stringify(activity.metadata, null, 2)}
                          </pre>
                        </details>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
