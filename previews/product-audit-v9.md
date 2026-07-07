# Le Top - audit produit critique v9

## Corrige maintenant

- La page Recherche répétait quatre onglets déjà présents dans la tab bar. Remplacé par l'objectif cinéma actif.
- Les recommandations reçues pouvaient pousser tout le contenu hors écran. Elles restent persistantes, mais seules deux sont développées par défaut.
- Les confirmations natives du navigateur cassaient l'immersion. Remplacées par une sheet cohérente avec l'app.
- Un badge gagné n'affichait qu'un toast. Il possède maintenant une célébration, une file d'attente et un accès direct aux films associés.
- Le menu contextuel historique du classement restait dans le HTML alors que le drag mobile l'avait remplacé. Supprimé.
- Six libellés permanents forçaient la tab bar à employer du texte minuscule. Seul l'onglet actif affiche maintenant un libellé lisible.
- Les écrans de création et d'onboarding mélangeaient SVG et emojis. Les contrôles sont maintenant cohérents.

## Mauvaises idées à ne pas ajouter maintenant

- **XP sans économie de récompense** : un nombre qui monte n'améliore pas la motivation à lui seul.
- **Quêtes hebdomadaires avant mesure d'usage** : sans analytics, on ne sait pas si elles motivent ou fatiguent.
- **Trop de badges secrets** : ils cacheraient la valeur au lieu de guider vers un film.
- **Récap mensuel avant historique fiable** : il faut d'abord garantir les dates, les durées et la synchronisation multi-appareils.

## Nécessaire avant une publication publique

- Ajouter une vraie authentification et une propriété des comptes. Le prénom seul n'est pas une sécurité.
- Fermer les règles Firestore publiques et valider les écritures par utilisateur.
- Protéger et limiter le Worker de notifications contre les abus.
- Ajouter politique de confidentialité, conditions, consentement et procédure de suppression vérifiable.
- Ajouter une télémétrie minimale respectueuse de la vie privée : activation, recherche, ajout, note, retour à 7 jours.
- Tester VoiceOver/TalkBack, contraste, tailles de texte et navigation clavier.

## Prochaine étape produit recommandée

Mesurer pendant une courte période la boucle actuelle : recherche -> fiche film -> vu/Top/À voir -> progression -> badge. Ensuite seulement, choisir entre quêtes hebdomadaires, titres équipables ou récap mensuel selon ce qui fait réellement revenir les utilisateurs.
