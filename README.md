# MenuFood

MenuFood est une application web de commande et livraison de repas, pensée comme une plateforme multi-rôles pour les clients, restaurants, livreurs et administrateurs. Le projet est construit avec Next.js 16 et suit une architecture App Router avec un design moderne inspiré des plateformes de livraison de repas.

Le projet sert de base pour un MVP de marketplace alimentaire locale, avec mock data côté front, flux de commande simulés et dashboards par rôle.

## Sommaire

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Scripts disponibles](#scripts-disponibles)
- [Variables d’environnement](#variables-denvironnement)
- [Architecture fonctionnelle](#architecture-fonctionnelle)
- [Rôles et parcours utilisateurs](#rôles-et-parcours-utilisateurs)
- [Développement et bonnes pratiques](#développement-et-bonnes-pratiques)
- [Prochaines améliorations](#prochaines-améliorations)
- [Remarques importantes](#remarques-importantes)

## Présentation

MenuFood propose un écosystème de commande en ligne composé de :

- une vitrine publique avec liste de restaurants,
- un parcours client pour explorer les menus, ajouter des produits au panier et passer commande,
- un espace restaurant pour gérer les menus, les commandes et les paramètres,
- un espace livreur pour gérer les livraisons,
- un dashboard admin pour piloter l’activité globale.

L’application est actuellement une maquette fonctionnelle / MVP de démonstration, avec données localement stockées dans les stores Zustand et interface entièrement front-end.

## Fonctionnalités

### 1. Côté client

- Exploration des restaurants par ville / catégorie,
- Affichage des détails d’un restaurant et de son menu,
- Sélection de produits avec options et suppléments,
- Gestion du panier et du checkout,
- Suivi du statut des commandes,
- Historique des commandes,
- Gestion des adresses,
- Réservations de table,
- Authentification simulée (mock login/signup).

### 2. Côté restaurant

- Dashboard de gestion,
- Suivi des commandes en cours,
- Gestion du menu (ajout, modification, suppression d’articles),
- Gestion des options et variantes de plats,
- Statistiques de performance,
- Paramètres de restaurant.

### 3. Côté livreur

- Disponibilité / statut du livreur,
- Liste des livraisons disponibles,
- Acceptation / refus d’une livraison,
- Suivi de l’état : picked_up → delivering → delivered,
- Historique des livraisons.

### 4. Côté admin

- Vue d’ensemble sur les performances,
- Gestion des restaurants,
- Gestion des livreurs,
- Suivi des commandes,
- Suivi des clients,
- Transactions et commissions,
- Paramètres système.

## Stack technique

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Zustand pour la gestion d’état
- React Hook Form + Zod pour les formulaires
- Lucide React pour les icônes
- Sonner pour les notifications
- App Router de Next.js

## Structure du projet

```text
menufood/
├── public/                     # Ressources statiques
├── src/
│   ├── app/                    # Routes Next.js (App Router)
│   │   ├── admin/              # Dashboard admin
│   │   ├── cart/               # Panier
│   │   ├── checkout/           # Paiement / commande
│   │   ├── livreur/            # Espace livreur
│   │   ├── login/              # Connexion
│   │   ├── orders/             # Commandes
│   │   ├── profile/            # Profil client
│   │   ├── reservations/       # Réservations
│   │   ├── restaurant/        # Espace restaurant
│   │   ├── restaurants/        # Liste des restaurants
│   │   ├── reset-password/     # Réinitialisation mot de passe
│   │   ├── signup/             # Inscription
│   │   ├── globals.css         # Styles globaux + tokens de couleur
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Page d’accueil
│   │
│   ├── components/
│   │   ├── auth/               # Formulaires auth
│   │   ├── layouts/            # Shells de navigation
│   │   └── ProductModal.tsx    # Modale produit
│   │
│   ├── lib/
│   │   └── firebase.ts         # Placeholder Firebase
│   │
│   ├── store/
│   │   ├── useActivityHistory.ts
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useOrders.ts
│   │   └── useRestaurants.ts
│   └──
├── .gitignore
├── DEMARRAGE.md
├── eslint.config.mjs
├── FRONTEND_IMPROVEMENTS.md
├── next.config.ts
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── ...
```

## Prérequis

Avant de lancer le projet, assurez-vous d’avoir installé :

- Node.js 20+
- npm, pnpm ou yarn
- Git

## Installation

1. Clonez le dépôt :

```bash
git clone <url-du-repo>
cd menufood
```

2. Installez les dépendances :

```bash
npm install
```

3. Démarrez le serveur de développement :

```bash
npm run dev
```

4. Ouvrez le projet dans le navigateur :

```text
http://localhost:3000
```

## Scripts disponibles

Dans `package.json`, les scripts principaux sont :

```bash
npm run dev
```
Lance le serveur Next.js en mode développement.

```bash
npm run build
```
Construit l’application pour la production.

```bash
npm run start
```
Démarre le serveur de production.

```bash
npm run lint
```
Vérifie le code avec ESLint.

## Variables d’environnement

Le projet contient une préparation pour Firebase et d’autres secrets backend, mais dans la version actuelle, l’application fonctionne principalement avec des données mockées en front.

Fichier d’exemple à créer : `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Note : la configuration Firebase est actuellement désactivée / remplacée par un placeholder dans `src/lib/firebase.ts`.

## Architecture fonctionnelle

### Gestion de l’état

Le projet utilise Zustand avec plusieurs stores :

- `useAuth` : gestion de la session utilisateur et du rôle,
- `useCart` : gestion du panier,
- `useRestaurants` : restaurants et menus,
- `useOrders` : commandes,
- `useActivityHistory` : historique d’activité.

### Données actuelles

Les données de test sont définies directement dans les stores. Les restaurants et menus initiaux sont pré-remplis dans `src/store/useRestaurants.ts` pour simuler un environnement réel sans backend.

### Composants clés

- `SiteShell` : layout public de navigation du site,
- `DashboardShell` : layout des tableaux de bord internes,
- `AuthForm` : formulaire de connexion / inscription,
- `ProductModal` : modale de détail produit.

## Rôles et parcours utilisateurs

### Client

- Choisir un restaurant,
- Consulter menu et options,
- Ajouter des produits,
- Passer commande,
- Suivre livraison,
- Consulter historique.

### Restaurant

- Gérer ses plats,
- Valider commande,
- Passer d’un statut “pending” à “ready”,
- Contrôler ses paramètres.

### Livreur

- Gérer sa disponibilité,
- Prendre une livraison,
- Mettre à jour le statut,
- Consulter le récapitulatif historique.

### Admin

- Supervision globale,
- Gestion du catalogue et des comptes,
- Pilotage des transactions.

## Développement et bonnes pratiques

### Conventions du projet

- Code en TypeScript strict,
- Composants fonctionnels React,
- Utilisation de l’App Router de Next.js,
- Styles via Tailwind CSS,
- Utilisation de composants réutilisables dans `src/components`,
- Modèle de données centralisé côté store Zustand.

### Ajout d’une nouvelle page

Les pages sont organisées dans `src/app/` selon les modules fonctionnels. Pour ajouter une fonctionnalité :

1. créer la route dans `src/app/.../page.tsx`,
2. réutiliser les layouts existants (`SiteShell` ou `DashboardShell`),
3. ajouter les données nécessaires dans les stores Zustand,
4. si besoin, créer un composant spécifique dans `src/components`.

### Qualité du code

Avant de livrer des modifications :

```bash
npm run lint
npm run build
```

## Prochaines améliorations

Voici les évolutions recommandées pour transformer ce MVP en application complète :

- Intégration Firebase Auth / Firestore / Storage,
- Base de données réelle (PostgreSQL, Supabase ou Firebase backend),
- API REST ou GraphQL,
- Paiement en ligne,
- Notifications temps réel,
- GPS / suivi livraison en direct,
- Système de réservation avancé,
- Gestion des rôles plus stricte côté serveur,
- Tests unitaires et de composants,
- SEO et optimisation UI/UX,
- Déploiement sur Vercel / Docker / infrastructure cloud.

## Remarques importantes

- La version actuelle est un prototype front-end fonctionnel avec données simulées.
- Le fichier `src/lib/firebase.ts` est un placeholder : il ne contient pas une vraie configuration de production.
- L’application a une logique de navigation et de rôles inspirée des plateformes de livraison modernes.
- Les écrans sont prêts pour extension, mais pas tous branchés à un backend réel.

## Licence

Ce projet n’a pas encore de licence explicite définie dans le dépôt. Vérifiez avec le propriétaire du projet avant toute mise en production ou redistribution.

## Contact / contributon

Pour toute modification ou évolution du projet, il est recommandé de travailler via les modules suivants :

- `src/app` pour les écrans,
- `src/store` pour la logique métier locale,
- `src/components` pour les blocs UI réutilisables.

---

Documentation générée pour le projet MenuFood.
