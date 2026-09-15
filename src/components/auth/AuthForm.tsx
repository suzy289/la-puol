 "use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "6 caractères minimum"),
});

type AuthFormProps = {
  mode: "login" | "signup";
  onSubmit?: (values: z.infer<typeof schema>) => Promise<void> | void;
};

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const submit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      // Simulation d'une action asynchrone (ex: appel API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await onSubmit?.(values);
      toast.success(
        mode === "login" ? "Connexion réussie (Frontend only)" : "Compte créé (Frontend only)"
      );
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="card w-full max-w-md space-y-4 p-6"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900">
          {mode === "login" ? "Connexion" : "Créer un compte"}
        </h2>
        <p className="text-sm text-slate-600">
          {mode === "login"
            ? "Accédez à votre espace Innova."
            : "Rejoignez la plateforme Innova pour commander et gérer vos menus."}
        </p>
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none ring-[var(--color-primary)]/10 focus:ring-2"
            {...register("email")}
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Mot de passe</label>
          <input
            type="password"
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm outline-none ring-[var(--color-primary)]/10 focus:ring-2"
            {...register("password")}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-accent w-full"
        disabled={loading}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {mode === "login" ? "Se connecter" : "Créer un compte"}
      </button>
    </form>
  );
}

