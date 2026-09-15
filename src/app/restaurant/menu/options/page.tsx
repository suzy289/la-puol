"use client";

import { DashboardShell } from "@/components/layouts/DashboardShell";
import { useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const navItems = [
  { href: "/restaurant/dashboard", label: "Tableau de bord" },
  { href: "/restaurant/orders", label: "Commandes" },
  { href: "/restaurant/menu", label: "Menu" },
  { href: "/restaurant/settings", label: "Paramètres" },
];

type OptionChoice = {
  id: string;
  label: string;
  priceOffset: number;
};

type MenuOption = {
  id: string;
  name: string;
  type: "radio" | "checkbox";
  required: boolean;
  choices: OptionChoice[];
};

const initialOptions: MenuOption[] = [
  {
    id: "opt1",
    name: "Cuisson",
    type: "radio",
    required: true,
    choices: [
      { id: "c1", label: "Bien cuit", priceOffset: 0 },
      { id: "c2", label: "À point", priceOffset: 0 },
      { id: "c3", label: "Fumé", priceOffset: 500 },
    ],
  },
  {
    id: "opt2",
    name: "Accompagnement",
    type: "radio",
    required: true,
    choices: [
      { id: "c4", label: "Frites", priceOffset: 0 },
      { id: "c5", label: "Riz", priceOffset: -500 },
      { id: "c6", label: "Plantain", priceOffset: 0 },
    ],
  },
];

export default function MenuOptionsPage() {
  const [options, setOptions] = useState<MenuOption[]>(initialOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<MenuOption | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "radio" as "radio" | "checkbox",
    required: true,
  });

  const [choices, setChoices] = useState<OptionChoice[]>([
    { id: "1", label: "", priceOffset: 0 },
  ]);

  const openAddModal = () => {
    setEditingOption(null);
    setFormData({ name: "", type: "radio", required: true });
    setChoices([{ id: "1", label: "", priceOffset: 0 }]);
    setIsModalOpen(true);
  };

  const openEditModal = (option: MenuOption) => {
    setEditingOption(option);
    setFormData({
      name: option.name,
      type: option.type,
      required: option.required,
    });
    setChoices(option.choices);
    setIsModalOpen(true);
  };

  const addChoice = () => {
    setChoices([...choices, { id: Date.now().toString(), label: "", priceOffset: 0 }]);
  };

  const updateChoice = (id: string, field: keyof OptionChoice, value: string | number) => {
    setChoices(choices.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeChoice = (id: string) => {
    if (choices.length > 1) {
      setChoices(choices.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Veuillez entrer un nom pour l'option");
      return;
    }

    const validChoices = choices.filter(c => c.label.trim() !== "");
    if (validChoices.length < 2) {
      toast.error("Veuillez ajouter au moins 2 choix");
      return;
    }

    const newOption: MenuOption = {
      id: editingOption ? editingOption.id : `opt${Date.now()}`,
      name: formData.name,
      type: formData.type,
      required: formData.required,
      choices: validChoices,
    };

    if (editingOption) {
      setOptions(options.map(o => o.id === editingOption.id ? newOption : o));
      toast.success("Option modifiée avec succès !");
    } else {
      setOptions([...options, newOption]);
      toast.success("Option ajoutée avec succès !");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette option ?")) {
      setOptions(options.filter(o => o.id !== id));
      toast.success("Option supprimée");
    }
  };

  return (
    <DashboardShell title="Options du Menu" navItems={navItems} badge="Restaurant">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/restaurant/menu" className="text-slate-500 hover:text-slate-700">
                ← Retour au menu
              </Link>
            </div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Options de personnalisation</h2>
            <p className="text-sm text-slate-600">
              Créez des options réutilisables (cuisson, taille, accompagnement, etc.)
            </p>
          </div>
          <button onClick={openAddModal} className="btn btn-accent gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle option
          </button>
        </div>

        {/* Options List */}
        <div className="grid gap-4">
          {options.length === 0 ? (
            <div className="card p-12 text-center text-slate-500">
              <p>Aucune option créée</p>
              <button onClick={openAddModal} className="btn btn-ghost mt-4">
                Créer la première option
              </button>
            </div>
          ) : (
            options.map((option) => (
              <div key={option.id} className="card p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{option.name}</h3>
                      <span className="pill text-xs">
                        {option.type === "radio" ? "Choix unique" : "Choix multiples"}
                      </span>
                      {option.required && (
                        <span className="pill bg-red-100 text-xs text-red-700">Obligatoire</span>
                      )}
                    </div>
                    <div className="mt-3 space-y-2">
                      {option.choices.map((choice) => (
                        <div key={choice.id} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="h-2 w-2 rounded-full bg-slate-400" />
                          <span>{choice.label}</span>
                          {choice.priceOffset !== 0 && (
                            <span className="text-xs text-slate-500">
                              ({choice.priceOffset > 0 ? "+" : ""}{choice.priceOffset} FCFA)
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(option)}
                      className="btn btn-ghost text-sm gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(option.id)}
                      className="btn btn-ghost text-sm gap-1 text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-6">
              <h3 className="text-xl font-bold text-slate-900">
                {editingOption ? "Modifier l'option" : "Nouvelle option"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nom de l'option *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[var(--color-primary)] focus:outline-none"
                    placeholder="Ex: Cuisson, Taille, Accompagnement"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Type de sélection
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as "radio" | "checkbox" })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[var(--color-primary)] focus:outline-none"
                    >
                      <option value="radio">Choix unique (radio)</option>
                      <option value="checkbox">Choix multiples (checkbox)</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Obligatoire
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.required}
                        onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                        className="h-4 w-4 rounded accent-[var(--color-primary)]"
                      />
                      <span className="text-sm text-slate-700">Client doit choisir</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Choix disponibles *
                    </label>
                    <button
                      type="button"
                      onClick={addChoice}
                      className="btn btn-ghost text-xs gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Ajouter un choix
                    </button>
                  </div>
                  <div className="space-y-3">
                    {choices.map((choice, index) => (
                      <div key={choice.id} className="flex gap-2">
                        <input
                          type="text"
                          value={choice.label}
                          onChange={(e) => updateChoice(choice.id, "label", e.target.value)}
                          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                          placeholder={`Choix ${index + 1}`}
                        />
                        <input
                          type="number"
                          value={choice.priceOffset}
                          onChange={(e) => updateChoice(choice.id, "priceOffset", parseFloat(e.target.value) || 0)}
                          className="w-28 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                          placeholder="+ FCFA"
                        />
                        <button
                          type="button"
                          onClick={() => removeChoice(choice.id)}
                          disabled={choices.length === 1}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    💡 Entrez un supplément de prix (ex: +500) ou une réduction (ex: -500)
                  </p>
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
                  {editingOption ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
