"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteShell } from "@/components/layouts/SiteShell";
import { useCart } from "@/store/useCart";
import { useOrders } from "@/store/useOrders";
import { useAuth } from "@/store/useAuth";
import { useActivityHistory } from "@/store/useActivityHistory";
import { useRestaurants } from "@/store/useRestaurants";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totals, restaurant, clear } = useCart();
  const { addOrder } = useOrders();
  const { userId, displayName, restaurantId } = useAuth();
  const { addActivity } = useActivityHistory();
  const getRestaurantById = useRestaurants((state) => state.getRestaurantById);
  
  const [formData, setFormData] = useState({
    name: displayName || "",
    phone: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  
  const { subtotal } = totals();
  const deliveryFee = subtotal > 0 ? 500 : 0;
  const serviceFee = subtotal > 0 ? 100 : 0;
  const total = subtotal + deliveryFee + serviceFee;

  if (!userId) {
    router.push("/login");
    return null;
  }

  if (!restaurant || items.length === 0) {
    router.push("/restaurants");
    return null;
  }

  const restaurantDetails = getRestaurantById(restaurant.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    try {
      // Créer la commande
      const orderId = addOrder({
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        clientName: formData.name,
        clientPhone: formData.phone,
        clientAddress: formData.address,
        items: items,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        serviceFee: serviceFee,
        total: total,
        paymentMethod: "cash",
        notes: formData.notes || undefined,
        status: "pending",
      });

      // Enregistrer l'activité
      addActivity({
        userId,
        type: "order_placed",
        description: `Commande passée chez ${restaurant.name} - ${total.toLocaleString()} FCFA`,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        metadata: {
          orderId,
          total,
          itemsCount: items.length,
        },
      });

      toast.success("Commande passée avec succès !");
      clear();
      router.push(`/orders/${orderId}`);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la création de la commande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              Checkout
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Confirmation de commande</h1>
          </div>
          <Link href="/cart" className="btn btn-ghost text-sm">
            Modifier le panier
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <form onSubmit={handleSubmit} className="card p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Coordonnées</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                placeholder="Nom complet"
              />
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                placeholder="Téléphone"
              />
              <input
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm sm:col-span-2"
                placeholder="Adresse de livraison"
              />
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="sm:col-span-2 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
                placeholder="Notes pour le livreur"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-slate-800">Paiement</h4>
              <div className="flex flex-col gap-2 text-sm text-slate-700">
                <label className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2">
                  <input type="radio" name="payment" defaultChecked /> Cash à la livraison (MVP)
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-dashed border-[var(--color-border)] px-3 py-2 text-slate-400">
                  <input type="radio" name="payment" disabled /> Mobile Money (bientôt)
                </label>
              </div>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="btn btn-accent w-full justify-center text-sm"
            >
              {loading ? "Traitement..." : "Confirmer la commande"}
            </button>
          </form>

          <div className="card p-5 space-y-4">            {/* Restaurant Header */}
            {restaurant && (
              <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-4">
                {restaurant.logo && (
                  <img 
                    src={restaurant.logo} 
                    alt={restaurant.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{restaurant.name}</h3>
                  {restaurant.cuisine && (
                    <p className="text-xs text-slate-500">{restaurant.cuisine}</p>
                  )}
                </div>
              </div>
            )}
                        <h3 className="text-lg font-semibold text-slate-900">Récapitulatif</h3>
            <div className="space-y-2 text-sm text-slate-700">
              {items.length === 0 ? (
                <p className="text-slate-500">Aucun article. Ajoutez des plats.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
                  </div>
                ))
              )}
            </div>
            <div className="h-px bg-[var(--color-border)]" />
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span>{deliveryFee.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de service</span>
                <span>{serviceFee.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>{total.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

