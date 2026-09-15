"use client";

import { use } from "react";
import { notFound, useRouter } from "next/navigation";
import { SiteShell } from "@/components/layouts/SiteShell";
import { useOrders } from "@/store/useOrders";
import { ArrowLeft, MapPin, Phone, User, CreditCard, Clock, Package } from "lucide-react";
import Link from "next/link";

const statusConfig = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "Confirmée", color: "bg-blue-100 text-blue-800", icon: Package },
  preparing: { label: "En préparation", color: "bg-orange-100 text-orange-800", icon: Package },
  ready: { label: "Prête", color: "bg-green-100 text-green-800", icon: Package },
  on_delivery: { label: "En livraison", color: "bg-purple-100 text-purple-800", icon: Package },
  delivered: { label: "Livrée", color: "bg-green-600 text-white", icon: Package },
  cancelled: { label: "Annulée", color: "bg-red-100 text-red-800", icon: Package },
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const router = useRouter();
  const order = useOrders((state) => state.getOrderById(orderId));

  if (!order) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-4xl px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Commande introuvable</h1>
          <Link href="/profile/orders" className="btn btn-ghost mt-4">
            Retour aux commandes
          </Link>
        </div>
      </SiteShell>
    );
  }

  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-full p-2 hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <p className="text-sm text-slate-500">Commande</p>
            <h1 className="text-2xl font-bold text-slate-900">{order.orderNumber}</h1>
          </div>
          <span className={`pill ${config.color} flex items-center gap-2`}>
            <StatusIcon className="h-4 w-4" />
            {config.label}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Restaurant */}
            <div className="card p-5">
              <h3 className="mb-4 font-semibold text-slate-900">Restaurant</h3>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">
                  🍽️
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{order.restaurantName}</p>
                  <p className="text-sm text-slate-500">
                    {order.createdAt.toLocaleDateString('fr-FR', { 
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="card">
              <div className="border-b border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900">Articles commandés</h3>
              </div>
              <div className="divide-y divide-slate-200">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-5">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <div className="mt-1 space-y-0.5">
                              {item.selectedOptions.map((opt, i) => (
                                <p key={i} className="text-xs text-slate-500">
                                  {opt.name}: {opt.value}
                                </p>
                              ))}
                            </div>
                          )}
                          <p className="mt-1 text-sm text-slate-600">
                            {item.price.toLocaleString()} FCFA × {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-slate-900">
                          {(item.price * item.quantity).toLocaleString()} FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="card p-5">
                <h3 className="mb-2 font-semibold text-slate-900">Notes</h3>
                <p className="text-sm text-slate-600">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <div className="card p-5 space-y-4">
              <h3 className="font-semibold text-slate-900">Informations client</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-700">{order.clientName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <a href={`tel:${order.clientPhone}`} className="text-[var(--color-primary)] hover:underline">
                    {order.clientPhone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                  <span className="text-slate-700">{order.clientAddress}</span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="card p-5 space-y-4">
              <h3 className="font-semibold text-slate-900">Paiement</h3>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">
                  {order.paymentMethod === "cash" ? "Espèces à la livraison" : "Mobile Money"}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="card p-5 space-y-3">
              <h3 className="font-semibold text-slate-900">Récapitulatif</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Sous-total</span>
                  <span>{order.subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Livraison</span>
                  <span>{order.deliveryFee.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Frais de service</span>
                  <span>{order.serviceFee.toLocaleString()} FCFA</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex justify-between text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>{order.total.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <Link href="/profile/orders" className="btn btn-ghost w-full">
              Mes commandes
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
