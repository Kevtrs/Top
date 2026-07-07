# Audit UX - Le Top

## 1. Statut des films dans la recherche

- Défaut : il fallait ouvrir un résultat pour découvrir qu'il était déjà dans le Top, les Vus ou À voir.
- Correction : badge de statut directement sur l'affiche.
- Bon point : moins de doublons et de taps inutiles.
- Limite : un seul statut est affiché en priorité quand un film appartient à plusieurs listes.

## 2. Actions contextuelles

- Défaut : les commandes déjà exécutées semblaient encore disponibles et les emojis ne correspondaient pas au langage visuel de l'app.
- Correction : boutons SVG, libellés explicites, état terminé visible et désactivé.
- Bon point : l'utilisateur sait immédiatement ce qui est déjà fait.
- Limite : « Vu » reste actif afin de permettre de modifier une note existante.

## 3. Écrans vides

- Défaut : les messages constataient le vide mais ne permettaient pas d'en sortir.
- Correction : une action directe et contextualisée dans Top, Vus et À voir.
- Bon point : le parcours ne s'arrête plus sur une impasse.
- Limite : les CTA conduisent à la recherche générale, pas encore à une sélection éditoriale.

## 4. Réorganisation du Top

- Défaut : le déplacement par appui long était invisible avant de connaître le geste.
- Correction : poignée SVG discrète à droite de chaque film de son propre Top.
- Bon point : l'interaction devient découvrable sans texte d'aide permanent.
- Limite : le geste reste un appui long sur mobile; un micro-retour haptique natif demanderait une app native.

## 5. Galerie de badges

- Défaut : la liste complète devenait longue et diluait les objectifs proches.
- Correction : filtres À finir, Gagnés, Sagas et Tous; À finir montre les huit progressions les plus proches.
- Bon point : la page répond d'abord à « quel badge puis-je débloquer maintenant ? ».
- Limite : huit objectifs est un choix éditorial; il faudra observer si six serait plus efficace sur petit écran.

## 6. Accessibilité et sémantique

- Défaut : onglets, accordéons et réglages avaient une information visuelle non annoncée correctement.
- Correction : `aria-current`, `aria-label`, vrais boutons et `aria-expanded` synchronisé.
- Bon point : meilleure utilisation au clavier, avec VoiceOver et avec les outils d'assistance.
- Limite : un audit VoiceOver complet sur iPhone réel restera nécessaire avant de considérer l'accessibilité terminée.

## Indicateurs conseillés

- Taux de première action après création du profil.
- Temps moyen entre recherche et ajout d'un film.
- Taux de sortie des écrans vides.
- Nombre de badges consultés puis de films associés ajoutés.
- Nombre d'actions répétées ou de doublons évités.
