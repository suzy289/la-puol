"use client";

import Link from "next/link";
import { SiteShell } from "@/components/layouts/SiteShell";
import { useCart } from "@/store/useCart";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { items, totals, updateQuantity, removeItem, clear, restaurant } = useCart();
  const { subtotal } = totals();
  const deliveryFee = subtotal > 0 ? 500 : 0;
  const serviceFee = subtotal > 0 ? 100 : 0;
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
              Panier
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Vos articles</h1>
          </div>
          <Link href="/restaurants" className="btn btn-ghost text-sm">
            Continuer mes achats
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="card flex flex-col items-center justify-center p-12 text-center">
                <ShoppingBag className="h-16 w-16 text-slate-300" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  Votre panier est vide
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Explorez nos restaurants et ajoutez des plats délicieux !
                </p>
                <Link href="/restaurants" className="btn btn-accent mt-6">
                  Découvrir les restaurants
                </Link>
              </div>
            ) : (
              <>
                {/* Restaurant Header */}
                {restaurant && (
                  <div className="card p-4">
                    <div className="flex items-center gap-3">
                      {restaurant.logo && (
                        <img 
                          src={restaurant.logo} 
                          alt={restaurant.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h2 className="font-semibold text-slate-900">{restaurant.name}</h2>
                        {restaurant.cuisine && (
                          <p className="text-sm text-slate-500">{restaurant.cuisine}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {items.length} article{items.length > 1 ? 's' : ''} dans votre panier
                  </h2>
                  <button
                    onClick={() => {
                      if (confirm("Voulez-vous vraiment vider le panier ?")) {
                        clear();
                      }
                    }}
                    className="text-sm text-slate-500 hover:text-red-600"
                  >
                    Vider le panier
                  </button>
                </div>
                
                <div className="card divide-y divide-[var(--color-border)]">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4">
                      {/* Image */}
                      {item.image && (
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.name}</h3>
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <div className="mt-1 space-y-0.5">
                              {item.selectedOptions.map((opt, i) => (
                                <p key={i} className="text-xs text-slate-500">
                                  <span className="font-medium">{opt.name}:</span> {opt.value}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Quantity controls */}
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-1">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="rounded p-1 hover:bg-slate-100 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="rounded p-1 hover:bg-slate-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="flex flex-col items-end justify-between">
                        <p className="text-sm font-medium text-slate-500">
                          {item.price.toLocaleString()} FCFA
                        </p>
                        <p className="text-lg font-bold text-[var(--color-primary)]">
                          {(item.price * item.quantity).toLocaleString()} FCFA
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className="card p-5 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Récapitulatif</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Sous-total ({items.reduce((sum, item) => sum + item.quantity, 0)} articles)</span>
                  <span className="font-medium">{subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span className="font-medium">{deliveryFee.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de service</span>
                  <span className="font-medium">{serviceFee.toLocaleString()} FCFA</span>
                </div>
              </div>
              <div className="h-px bg-[var(--color-border)]" />
              <div className="flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span className="text-[var(--color-primary)]">{total.toLocaleString()} FCFA</span>
              </div>
              {items.length > 0 && (
                <Link
                  href="/checkout"
                  className="btn btn-accent w-full justify-center gap-2 text-sm"
                >
                  Passer la commande
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            
            {items.length > 0 && (
              <div className="card bg-slate-50 p-4">
                <p className="text-xs text-slate-600">
                  💡 <strong>Bon à savoir :</strong> Les frais de livraison sont fixes à 500 FCFA
                  pour toute commande.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

