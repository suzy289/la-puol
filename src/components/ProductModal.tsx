"use client";

import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useCart, RestaurantInfo } from "@/store/useCart";
import { useActivityHistory } from "@/store/useActivityHistory";
import { useAuth } from "@/store/useAuth";
import { toast } from "sonner";

export type ProductChoice = {
  id: string;
  label: string;
  priceOffset: number;
};

export type ProductOption = {
  id: string;
  name: string;
  type: "radio" | "checkbox";
  required: boolean;
  choices: ProductChoice[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  options?: ProductOption[];
};

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  restaurant: RestaurantInfo;
}

export function ProductModal({ product, isOpen, onClose, restaurant }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string | string[]>>({});
  const addItem = useCart((state) => state.addItem);
  const currentRestaurant = useCart((state) => state.restaurant);
  const clear = useCart((state) => state.clear);
  const { addActivity } = useActivityHistory();
  const { userId } = useAuth();

  // Reset state when modal opens with a new product
  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setSelectedChoices({});
    }
  }, [isOpen, product]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!product) return 0;
    let total = product.price;
    
    // Add options prices
    product.options?.forEach(option => {
      const selection = selectedChoices[option.id];
      if (!selection) return;

      if (Array.isArray(selection)) {
        // Checkbox (multiple)
        selection.forEach(choiceId => {
          const choice = option.choices.find(c => c.id === choiceId);
          if (choice) total += choice.priceOffset;
        });
      } else {
        // Radio (single)
        const choice = option.choices.find(c => c.id === selection);
        if (choice) total += choice.priceOffset;
      }
    });

    return total * quantity;
  }, [product, selectedChoices, quantity]);

  // Don't render if not open or no product
  if (!isOpen || !product) return null;

  const handleOptionChange = (optionId: string, choiceId: string, type: "radio" | "checkbox") => {
    setSelectedChoices(prev => {
      const current = prev[optionId];
      
      if (type === "radio") {
        return { ...prev, [optionId]: choiceId };
      } else {
        // Checkbox logic
        const currentArray = Array.isArray(current) ? current : [];
        if (currentArray.includes(choiceId)) {
          return { ...prev, [optionId]: currentArray.filter(id => id !== choiceId) };
        } else {
          return { ...prev, [optionId]: [...currentArray, choiceId] };
        }
      }
    });
  };

  const handleAddToCart = () => {
    // Validate required options
    const missingRequired = product.options?.filter(
      opt => opt.required && !selectedChoices[opt.id] && (!Array.isArray(selectedChoices[opt.id]) || (selectedChoices[opt.id] as string[]).length === 0)
    );

    if (missingRequired && missingRequired.length > 0) {
      toast.error(`Veuillez sélectionner : ${missingRequired.map(o => o.name).join(", ")}`);
      return;
    }

    // Check if trying to add from different restaurant
    if (currentRestaurant && currentRestaurant.id !== restaurant.id) {
      toast.error(
        <div className="space-y-2">
          <p className="font-semibold">Changer de restaurant ?</p>
          <p className="text-sm">Votre panier contient des articles de {currentRestaurant.name}. Voulez-vous le vider pour commander chez {restaurant.name} ?</p>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                clear();
                proceedWithAdd();
                toast.dismiss();
              }}
              className="btn btn-accent text-xs py-1 px-3"
            >
              Vider et continuer
            </button>
            <button 
              onClick={() => toast.dismiss()}
              className="btn btn-ghost text-xs py-1 px-3"
            >
              Annuler
            </button>
          </div>
        </div>,
        { duration: 10000 }
      );
      return;
    }

    proceedWithAdd();
  };

  const proceedWithAdd = () => {
    // Calculate price with options (unitary price)
    let unitPrice = product.price;
    product.options?.forEach(option => {
      const selection = selectedChoices[option.id];
      if (!selection) return;

      if (Array.isArray(selection)) {
        selection.forEach(choiceId => {
          const choice = option.choices.find(c => c.id === choiceId);
          if (choice) unitPrice += choice.priceOffset;
        });
      } else {
        const choice = option.choices.find(c => c.id === selection);
        if (choice) unitPrice += choice.priceOffset;
      }
    });

    // Prepare formatted options for cart
    const formattedOptions: { name: string; value: string }[] = [];
    product.options?.forEach(option => {
      const selection = selectedChoices[option.id];
      if (!selection) return;

      if (Array.isArray(selection)) {
        selection.forEach(choiceId => {
          const choice = option.choices.find(c => c.id === choiceId);
          if (choice) {
            formattedOptions.push({ name: option.name, value: choice.label });
          }
        });
      } else {
        const choice = option.choices.find(c => c.id === selection);
        if (choice) {
          formattedOptions.push({ name: option.name, value: choice.label });
        }
      }
    });

    const success = addItem({
      id: product.id,
      name: product.name,
      price: unitPrice,
      quantity: quantity,
      selectedOptions: formattedOptions.length > 0 ? formattedOptions : undefined,
      image: product.image
    }, restaurant);

    if (success) {
      // Enregistrer l'activité
      if (userId) {
        addActivity({
          userId,
          type: "item_added_to_cart",
          description: `${quantity} x ${product.name} ajouté${quantity > 1 ? 's' : ''} au panier`,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          metadata: {
            productId: product.id,
            productName: product.name,
            quantity,
            price: unitPrice,
            options: formattedOptions,
          },
        });
      }
      
      toast.success(`${quantity} x ${product.name} ajouté${quantity > 1 ? 's' : ''} au panier !`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row">
        
        {/* Product Image Section */}
        <div className="relative h-48 w-full bg-slate-100 md:h-auto md:w-1/2">
          {product.image ? (
             <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
              <span className="text-4xl">🍽️</span>
            </div>
          )}
          <button 
            onClick={onClose}
            className="absolute left-4 top-4 rounded-full bg-white/90 p-2 text-slate-900 shadow-sm hover:bg-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Details Section */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{product.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{product.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="hidden rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 md:block"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mt-6 flex-1 space-y-6">
            {/* Options Render */}
            {product.options?.map((option) => (
              <div key={option.id} className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold text-slate-900">
                    {option.name} {option.required && <span className="text-red-500">*</span>}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 uppercase">
                    {option.type === "radio" ? "1 choix" : "Plusieurs choix"}
                  </span>
                </div>
                <div className="grid gap-2">
                  {option.choices.map((choice) => (
                    <label 
                      key={choice.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-all ${
                        (option.type === "radio" && selectedChoices[option.id] === choice.id) ||
                        (option.type === "checkbox" && (selectedChoices[option.id] as string[])?.includes(choice.id))
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 ring-1 ring-[var(--color-primary)]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type={option.type}
                          name={option.id}
                          className="accent-[var(--color-primary)]"
                          checked={
                            option.type === "radio" 
                              ? selectedChoices[option.id] === choice.id
                              : (selectedChoices[option.id] as string[])?.includes(choice.id) || false
                          }
                          onChange={() => handleOptionChange(option.id, choice.id, option.type)}
                        />
                        <span className="text-sm font-medium text-slate-700">{choice.label}</span>
                      </div>
                      {choice.priceOffset > 0 && (
                        <span className="text-sm text-slate-500">+{choice.priceOffset} FCFA</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">Quantité</span>
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-md p-1 hover:bg-slate-100 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-md p-1 hover:bg-slate-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary w-full justify-between py-3 text-base"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart size={20} />
                Ajouter au panier
              </span>
              <span>{totalPrice.toLocaleString()} FCFA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
