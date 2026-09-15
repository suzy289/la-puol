import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Innova | Commande & Réservation",
  description:
    "Plateforme Innova pour commander, réserver et gérer les menus en ligne.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen`}
      >
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
