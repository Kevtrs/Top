# Le Top - Proposition de gamification

## Intention

La gamification doit donner envie de découvrir des films sans transformer Le Top en jeu mobile bruyant. Les récompenses viennent uniquement d'actions utiles et vérifiables : voir, noter, compléter une collection, réussir une quête ou participer à un objectif commun.

Principes :

- aucune série quotidienne punitive ;
- aucun XP gagné en supprimant puis ajoutant le même film ;
- aucune compétition obligatoire entre proches ;
- une progression lisible, mais discrète dans l'interface ;
- chaque récompense doit ouvrir un choix, un titre ou un souvenir visible.

## 1. Accueil de progression

Un bandeau compact apparaît en haut de l'onglet Badges :

- niveau actuel ;
- titre équipé ;
- XP actuel et XP requis ;
- prochaine récompense ;
- accès aux quêtes de la semaine.

Exemple : `Niveau 8 - Explorateur du grand écran - 620 / 760 XP`.

## 2. Quêtes hebdomadaires personnalisées

Chaque lundi, trois quêtes sont générées à partir du Top, des films vus, des badges proches du déblocage et des genres peu explorés. Elles expirent le dimanche soir. Une seule quête peut être remplacée gratuitement chaque semaine.

Types de quêtes :

- **Continuer une collection** : voir un épisode manquant d'une saga commencée ;
- **Explorer un goût** : voir un film d'un genre apprécié ;
- **Sortir de sa zone** : découvrir un genre peu présent ;
- **Rattraper un classique** : voir un film reconnu antérieur à une décennie donnée ;
- **Faire vivre le groupe** : noter un film recommandé par un proche ;
- **Donner une chance** : choisir un film déjà placé dans À voir.

Récompenses proposées :

- quête courte : 40 XP ;
- quête moyenne : 60 XP ;
- quête collection : 80 XP ;
- trois quêtes terminées : coffre hebdomadaire de 60 XP et un jeton de changement de quête.

## 3. Niveaux et XP

Actions récompensées une seule fois :

| Action | XP |
| --- | ---: |
| Noter un nouveau film | 10 |
| Ajouter pour la première fois un film au Top | 5 |
| Terminer une quête | 40 à 80 |
| Débloquer un badge normal | 100 |
| Débloquer un badge de saga | 150 |
| Débloquer une collection légendaire | 300 |
| Terminer un défi familial | 120 |
| Une recommandation envoyée reçoit au moins 8/10 | 40 |

Les changements de note, réorganisations et suppressions ne donnent jamais de nouvel XP.

Paliers :

- niveaux 1 à 5 : découverte ;
- niveaux 6 à 10 : explorateur ;
- niveaux 11 à 20 : cinéphile ;
- niveaux 21 à 30 : archiviste ;
- au-delà : niveaux prestige sans plafond visuel agressif.

Chaque niveau offre au moins une récompense visible : nouveau titre, nouvel emplacement de vitrine temporaire, variante de cadre ou résumé enrichi.

## 4. Trois badges épinglés

Chaque profil choisit trois badges à exposer. Ils apparaissent sur sa fiche dans Amis, juste sous son avatar et son titre.

Interactions :

- toucher un emplacement ouvre la collection ;
- seuls les badges débloqués peuvent être épinglés ;
- un appui permet de remplacer ou réordonner les trois badges ;
- les badges légendaires utilisent un cadre distinct, sans animation permanente.

## 5. Défis familiaux collectifs

Un défi commun est proposé chaque mois. Tous les profils contribuent au même compteur.

Exemples :

- voir ensemble 12 films différents dans le mois ;
- trois profils notent le même film ;
- terminer collectivement une trilogie ;
- voir cinq films provenant de cinq décennies ;
- donner une note à trois recommandations reçues.

La récompense est commune : 120 XP par participant actif et un badge familial daté. La contribution de chacun est visible, mais il n'y a pas de classement gagnant-perdant.

## 6. Badges secrets

Les badges secrets apparaissent sous forme de silhouette avec un indice court. Le nom et le visuel ne sont révélés qu'au déblocage.

Exemples d'indices :

- `La réponse était dans la boîte.`
- `Trois films, trois décennies, un même réalisateur.`
- `Tu as survécu à une nuit très sombre.`
- `Le film recommandé valait vraiment le détour.`

Ils récompensent des combinaisons naturelles, jamais des actions répétitives artificielles.

## 7. Récap mensuel

Le premier jour du mois, chaque profil reçoit un récap en quatre pages :

1. films vus, temps estimé et note moyenne ;
2. genre, réalisateur et décennie dominants ;
3. meilleur ajout au Top et recommandation la mieux notée ;
4. XP gagné, badges débloqués et progression familiale.

Le récap reste consultable dans le profil et peut être exporté sous forme d'image, sans données privées sur les autres profils.

## 8. Titres déblocables

Un seul titre est équipé à la fois et apparaît sous le prénom.

Exemples :

- **Maître du suspense** : huit thrillers notés au moins 8/10 ;
- **Gardien de la chronologie** : badge Retour vers le futur ;
- **Archiviste du temps** : films vus sur sept décennies ;
- **Explorateur du grand écran** : cinq genres différents ;
- **Baba Yaga** : collection John Wick complète ;
- **Conseiller officiel** : cinq recommandations notées au moins 8/10 ;
- **Au service secret** : collection James Bond complète.

## 9. Données et sécurité anti-abus

Champs possibles :

- `profiles/{id}` : `xp`, `level`, `equippedTitle`, `pinnedBadges` ;
- `profileProgress/{id}` : actions XP déjà créditées ;
- `weeklyQuests/{weekId}/profiles/{id}` : quêtes et progression ;
- `familyChallenges/{monthId}` : objectif et contributions ;
- `monthlyRecaps/{profileId}/months/{monthId}` : récap figé.

L'XP doit être idempotent : chaque action possède une clé unique, par exemple `watched:movieId`, `badge:badgeId` ou `quest:weekId:questId`.

## 10. Ordre d'intégration conseillé

1. vitrine de profil avec trois badges et titres ;
2. XP et niveaux calculés sur les actions existantes ;
3. quêtes hebdomadaires ;
4. défis familiaux ;
5. récap mensuel ;
6. badges secrets.

Cet ordre donne rapidement une récompense visible, puis ajoute progressivement les mécaniques plus coûteuses en données.
