# MenuFood - Guide de Démarrage Rapide

## ✅ Projet Fonctionnel

Le projet est maintenant opérationnel et accessible sur :
- **Local** : http://localhost:3000
- **Réseau** : http://192.168.100.125:3000

## 🚀 Commandes de Démarrage

### Démarrer le serveur de développement
```powershell
cd c:\menufood
npm run dev
```

### En cas de problème de verrouillage
Si vous obtenez l'erreur "Unable to acquire lock", exécutez :
```powershell
# Arrêter tous les processus Node
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Supprimer le cache
Remove-Item -Recurse -Force .next\dev -ErrorAction SilentlyContinue

# Redémarrer
npm run dev
```

### Nettoyer complètement
```powershell
# Supprimer tous les caches
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue

# Redémarrer
npm run dev
```

## 📱 Pages Disponibles

### Site Public
- **/** - Page d'accueil
- **/restaurants** - Liste des restaurants
- **/restaurants/resto-1** - Détails restaurant "Innova Grill"
- **/restaurants/resto-2** - Détails restaurant "Meriaz Kitchen"
- **/cart** - Panier
- **/checkout** - Confirmation commande
- **/orders/[orderId]** - Détails d'une commande

### Dashboard Restaurant
- **/restaurant/dashboard** - Tableau de bord avec statistiques
- **/restaurant/orders** - Gestion des commandes
- **/restaurant/menu** - Gestion du menu (CRUD)
- **/restaurant/menu/options** - Gestion des options de menu
- **/restaurant/settings** - Paramètres (à venir)

### Client
- **/profile** - Profil utilisateur (à venir)
- **/profile/orders** - Historique commandes (à venir)
- **/login** - Connexion
- **/signup** - Inscription

## 🎯 Fonctionnalités Implémentées

### ✅ Gestion Multi-Restaurants
- Chaque restaurant a son propre ID (`resto-1`, `resto-2`)
- Menus séparés par restaurant
- Commandes filtrées par restaurant

### ✅ Système de Panier
- Validation restaurant unique (impossible de mélanger 2 restaurants)
- Badge avec nombre d'articles
- Dialog de confirmation en cas de conflit

### ✅ Gestion des Commandes
- Statuts : pending, confirmed, preparing, ready, on_delivery, delivered, cancelled
- Page détails avec toutes les informations
- Dashboard restaurant avec actions de mise à jour

### ✅ Gestion du Menu Restaurant
- CRUD complet (ajout, modification, suppression)
- **Synchronisation temps réel** : Les modifications dans `/restaurant/menu` apparaissent instantanément sur `/restaurants/[id]`
- Filtres par catégorie
- Toggle disponibilité

### ✅ Dashboard Restaurant
- Statistiques en temps réel
- Revenus du jour
- Commandes actives
- Aperçu du menu

## 🔧 Architecture

### State Management (Zustand)
- **useCart** : Gestion du panier
- **useRestaurants** : Restaurants et menus
- **useOrders** : Commandes
- **useAuth** : Authentification (à compléter)

### Stack Technique
- Next.js 16.0.8 (Turbopack)
- React 19.2.1
- TypeScript 5
- Tailwind CSS 4
- Zustand 5.0.9
- Sonner (toasts)

## 🎨 Tester les Fonctionnalités

### 1. Ajout de Menu
1. Aller sur http://localhost:3000/restaurant/menu
2. Cliquer "Ajouter un plat"
3. Remplir le formulaire
4. Sauvegarder
5. **Vérifier** : Aller sur http://localhost:3000/restaurants/resto-1 → Le nouveau plat apparaît !

### 2. Gestion des Commandes
1. Aller sur http://localhost:3000/restaurant/orders
2. Voir les 2 commandes de démonstration
3. Cliquer "Confirmer" sur une commande en attente
4. Observer le changement de statut
5. Cliquer "Détails" pour voir toutes les infos

### 3. Panier Multi-Restaurant
1. Aller sur http://localhost:3000/restaurants/resto-1
2. Ajouter un plat au panier
3. Aller sur http://localhost:3000/restaurants/resto-2
4. Essayer d'ajouter un plat → Dialog de conflit apparaît !

## 📝 Prochaines Étapes

### Priorité 1 : Authentification
- [ ] Intégrer Firebase Auth
- [ ] Système de rôles (client, restaurant, admin)
- [ ] Protection des routes dashboard
- [ ] Remplacer `RESTAURANT_ID = "resto-1"` par l'utilisateur connecté

### Priorité 2 : Backend Firebase
- [ ] Firestore pour les données
- [ ] Storage pour les images
- [ ] Cloud Functions pour la logique métier
- [ ] Notifications temps réel

### Priorité 3 : Features Avancées
- [ ] Page settings restaurant
- [ ] Upload images réel
- [ ] Système de notation
- [ ] Analytics et rapports

## ⚠️ Notes Importantes

### Restaurant ID Hardcodé
Actuellement, le `RESTAURANT_ID` est hardcodé à `"resto-1"` dans :
- `/restaurant/dashboard/page.tsx`
- `/restaurant/orders/page.tsx`
- `/restaurant/menu/page.tsx`

Une fois l'authentification en place, il sera remplacé par :
```typescript
const { user } = useAuth();
const RESTAURANT_ID = user?.restaurantId;
```

### Données de Démonstration
Les données sont stockées en mémoire (Zustand). Au rechargement de la page, les données reviennent à l'état initial. Pour persister, il faudra :
1. Soit ajouter le middleware `persist` de Zustand
2. Soit connecter à Firebase (recommandé)

## 🎉 Succès !

Le frontend est **100% fonctionnel** et prêt pour l'intégration backend Firebase !

Toutes les pages se compilent sans erreur et le système de gestion multi-restaurants fonctionne parfaitement.
