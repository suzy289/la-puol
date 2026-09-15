"use client";

import { DashboardShell } from "@/components/layouts/DashboardShell";
import { useState } from "react";
import { Plus, Edit, Trash2, X, Image as ImageIcon, Settings } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRestaurants } from "@/store/useRestaurants";

const navItems = [
  { href: "/restaurant/dashboard", label: "Tableau de bord" },
  { href: "/restaurant/orders", label: "Commandes" },
  { href: "/restaurant/menu", label: "Menu" },
  { href: "/restaurant/settings", label: "Paramètres" },
];

const categories = ["Plats", "Fast Food", "Boissons", "Desserts", "Entrées"];

type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  available: boolean;
  image?: string;
  options?: any[];
};

export default function RestaurantMenuPage() {
  // TODO: Get from auth context
  const RESTAURANT_ID = "resto-1";
  
  const { getMenuByRestaurant, addMenuItem, updateMenuItem, deleteMenuItem } = useRestaurants();
  const menuItems = getMenuByRestaurant(RESTAURANT_ID);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Plats",
    image: "",
    available: true,
  });

  const openAddModal = () => {
    setEditingDish(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "Plats",
      image: "",
      available: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (dish: MenuItem) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      price: dish.price.toString(),
      description: dish.description,
      category: dish.category,
      image: dish.image || "",
      available: dish.available,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    const dishData = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category,
      image: formData.image,
      available: formData.available,
      restaurantId: RESTAURANT_ID,
      options: editingDish?.options || [],
    };

    if (editingDish) {
      updateMenuItem(editingDish.id, dishData);
      toast.success("Plat modifié avec succès !");
    } else {
      addMenuItem(dishData);
      toast.success("Plat ajouté avec succès !");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce plat ?")) {
      deleteMenuItem(id);
      toast.success("Plat supprimé");
    }
  };

  const toggleAvailability = (id: string) => {
    const item = menuItems.find(d => d.id === id);
    if (item) {
      updateMenuItem(id, { available: !item.available });
    }
  };

  const filteredDishes = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(d => d.category === selectedCategory);

  const dishesByCategory = categories.reduce((acc, cat) => {
    acc[cat] = menuItems.filter(d => d.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <DashboardShell title="Menu" navItems={navItems} badge="Restaurant">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Gestion du Menu</h2>
            <p className="text-sm text-slate-600">
              {menuItems.length} plat{menuItems.length > 1 ? 's' : ''} au total
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/restaurant/menu/options" className="btn btn-ghost gap-2">
              <Settings className="h-4 w-4" />
              Options
            </Link>
            <button onClick={openAddModal} className="btn btn-accent gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un plat
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`card p-4 text-left transition-all hover:shadow-md ${
              selectedCategory === "all" ? "ring-2 ring-[var(--color-primary)]" : ""
            }`}
          >
            <p className="text-sm text-slate-600">Total</p>
            <p className="text-2xl font-bold text-slate-900">{menuItems.length}</p>
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`card p-4 text-left transition-all hover:shadow-md ${
                selectedCategory === cat ? "ring-2 ring-[var(--color-primary)]" : ""
              }`}
            >
              <p className="text-sm text-slate-600">{cat}</p>
              <p className="text-2xl font-bold text-slate-900">{dishesByCategory[cat] || 0}</p>
            </button>
          ))}
        </div>

        {/* Dishes List */}
        <div className="card">
          {filteredDishes.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <p>Aucun plat dans cette catégorie</p>
              <button onClick={openAddModal} className="btn btn-ghost mt-4">
                Ajouter le premier plat
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {filteredDishes.map((dish) => (
                <div key={dish.id} className="flex gap-4 p-4 hover:bg-slate-50">
                  {/* Image */}
                  {dish.image ? (
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-100">
                      <ImageIcon className="h-8 w-8 text-slate-400" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">{dish.name}</h3>
                          <p className="text-xs text-slate-500">{dish.category}</p>
                        </div>
                        <p className="text-lg font-bold text-[var(--color-primary)]">
                          {dish.price.toLocaleString()} FCFA
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 line-clamp-1">{dish.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAvailability(dish.id)}
                        className={`pill text-xs ${
                          dish.available 
                            ? "bg-green-100 text-green-700" 
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {dish.available ? "Disponible" : "Indisponible"}
                      </button>
                      <button
                        onClick={() => openEditModal(dish)}
                        className="btn btn-ghost text-xs gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(dish.id)}
                        className="btn btn-ghost text-xs gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900">
                {editingDish ? "Modifier le plat" : "Ajouter un plat"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nom du plat *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[var(--color-primary)] focus:outline-none"
                    placeholder="Ex: Poulet DG"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Prix (FCFA) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[var(--color-primary)] focus:outline-none"
                    placeholder="4800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[var(--color-primary)] focus:outline-none"
                    placeholder="Décrivez votre plat..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Catégorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[var(--color-primary)] focus:outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Disponibilité
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="h-4 w-4 rounded accent-[var(--color-primary)]"
                    />
                    <span className="text-sm text-slate-700">Plat disponible</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[var(--color-primary)] focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image && (
                    <img 
                      src={formData.image} 
                      alt="Aperçu"
                      className="mt-2 h-32 w-32 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        toast.error("Image invalide");
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-accent">
                  {editingDish ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

