# Mise en service du socle sécurisé Popcorn

1. Dans Firebase Console, ouvrir **Authentication > Sign-in method** et activer **Anonymous**.
2. Déployer d'abord l'application HTML. À la première ouverture, chaque appareil transforme son ancien profil local en compte Firebase UID sans supprimer les anciennes données.
3. Installer les dépendances de `functions/`, puis déployer les fonctions `sendRecommendation` et `deleteAccount` dans `europe-west1`.
4. Déployer `firestore.rules` et `firestore.indexes.json` après validation de la migration sur les appareils de test.
5. Avant le 1er août 2026, vérifier que les profils actifs possèdent un document `users/{uid}`, puis retirer la règle de lecture temporaire des anciennes collections.

Commandes Firebase CLI :

```sh
npm install -g firebase-tools
cd functions && npm install && cd ..
firebase deploy --only functions,firestore:rules,firestore:indexes
```

Le compte anonyme est adapté au test grandeur nature. Pour l'App Store, il pourra être lié à Apple ou Google sans changer l'UID ni perdre les films.
