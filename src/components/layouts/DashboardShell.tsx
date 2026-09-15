import Link from "next/link";
import { PropsWithChildren } from "react";

type NavItem = { href: string; label: string };

interface DashboardShellProps extends PropsWithChildren {
  title: string;
  navItems: NavItem[];
  badge?: string;
}

export function DashboardShell({
  title,
  navItems,
  badge,
  children,
}: DashboardShellProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr] bg-slate-50 text-slate-900">
      <aside className="border-r border-[var(--color-border)] bg-white">
        <div className="px-5 py-6">
          <Link href="/" className="text-lg font-bold text-[var(--color-primary)]">
            Innova
          </Link>
          {badge ? (
            <div className="mt-2 rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
              {badge}
            </div>
          ) : null}
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-600">
            Tableau de bord et outils clés pour votre rôle.
          </p>
        </div>
        <div className="grid gap-4">{children}</div>
      </main>
    </div>
  );
}

