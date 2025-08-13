# Guide de Test et Vérification

Ce document décrit comment tester les différentes fonctionnalités de l'application "Formalités France".

## Prérequis

1. Assurez-vous que toutes les dépendances sont installées :
   ```bash
   npm install
   ```

2. Vérifiez que la compilation fonctionne :
   ```bash
   npm run build
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## Tests des Composants Principaux

### 1. Page d'Accueil (`/`)

**Fonctionnalités à tester :**
- [ ] Affichage de la page d'accueil
- [ ] Carte "Analyse IA de contrats" visible
- [ ] Bouton "Essayer l'analyse IA" fonctionne
- [ ] Grille des catégories avec icônes
- [ ] Boutons "Commencer" et "Parcourir les modèles"
- [ ] Responsive design (mobile/desktop)

**Tests de navigation :**
- [ ] Clic sur "Parcourir les modèles" → redirection vers `/modeles`
- [ ] Clic sur "Essayer l'analyse IA" → redirection vers `/modeles/resiliation-internet`

### 2. Page des Modèles (`/modeles`)

**Fonctionnalités à tester :**
- [ ] Affichage de la liste des 26+ formalités
- [ ] Filtres par catégorie fonctionnent
- [ ] Filtre par type d'acteur fonctionne
- [ ] Recherche textuelle fonctionne
- [ ] Tri par popularité/récence fonctionne
- [ ] Bouton "Effacer les filtres" fonctionne
- [ ] Responsive design

**Tests des filtres :**
- [ ] Sélection d'une catégorie → filtrage correct
- [ ] Sélection d'un type d'acteur → filtrage correct
- [ ] Combinaison de filtres → résultats corrects
- [ ] Recherche + filtres → résultats corrects

### 3. Page Modèle Spécifique (`/modeles/[slug]`)

**Fonctionnalités à tester :**
- [ ] Affichage du formulaire dynamique
- [ ] Champs conditionnels s'affichent/masquent selon les valeurs
- [ ] Validation des champs requis
- [ ] Prévisualisation de la lettre en temps réel
- [ ] Informations légales affichées
- [ ] Bouton "Analyser mon contrat" fonctionne
- [ ] Responsive design (2 colonnes sur desktop, 1 sur mobile)

**Tests du formulaire :**
- [ ] Remplissage des champs → mise à jour de la prévisualisation
- [ ] Champs conditionnels → affichage/masquage correct
- [ ] Validation → messages d'erreur appropriés
- [ ] Persistance locale → valeurs conservées après rechargement

### 4. Composant SmartForm

**Fonctionnalités à tester :**
- [ ] Rendu des différents types de champs (text, select, date, radio, checkbox, textarea)
- [ ] Logique conditionnelle (`dependsOn`)
- [ ] Validation Zod
- [ ] Persistance localStorage
- [ ] Pré-remplissage IA
- [ ] Champs calculés (`compute`)

**Tests des champs :**
- [ ] Champs texte → saisie et validation
- [ ] Champs select → sélection et changement
- [ ] Champs date → sélection de date
- [ ] Champs radio → sélection unique
- [ ] Champs checkbox → sélection multiple
- [ ] Champs textarea → saisie longue

### 5. Composant TemplatePreview

**Fonctionnalités à tester :**
- [ ] Rendu Markdown → HTML
- [ ] Remplacement des variables `{{variable}}`
- [ ] Mise en évidence des variables non remplies
- [ ] Statistiques (variables remplies/non remplies)
- [ ] Bouton d'expansion/réduction
- [ ] Actions (télécharger, générer PDF)

**Tests du rendu :**
- [ ] Variables remplies → affichage correct
- [ ] Variables manquantes → mise en évidence
- [ ] Markdown → conversion HTML correcte
- [ ] Responsive design

### 6. Composant AiBar (Barre IA)

**Fonctionnalités à tester :**
- [ ] Ouverture/fermeture de la slide-over
- [ ] Upload de fichiers (PDF, DOCX, TXT, images)
- [ ] Affichage du ParsingProgress
- [ ] Analyse IA simulée
- [ ] Affichage des résultats (Résumé, Acteur, Clauses, Dates, Frais, Risques)
- [ ] Composant AiChip (niveau de confiance)
- [ ] Actions (Pré-remplir, Générer lettre, Exporter)

**Tests de l'analyse :**
- [ ] Upload de fichier → progression des étapes
- [ ] Analyse terminée → affichage des résultats
- [ ] Pré-remplissage → mise à jour du formulaire
- [ ] Export JSON → téléchargement du fichier

### 7. Composant ContractDropzone

**Fonctionnalités à tester :**
- [ ] Drag & drop de fichiers
- [ ] Sélection de fichiers via bouton
- [ ] Validation des types de fichiers
- [ ] Limite de taille (10 Mo)
- [ ] États visuels (idle, drag, upload, error)
- [ ] Actions (Reprocesser, Supprimer)

**Tests des fichiers :**
- [ ] Fichiers valides → acceptation
- [ ] Fichiers invalides → rejet avec message d'erreur
- [ ] Fichiers trop volumineux → rejet
- [ ] Types de fichiers → acceptation des formats supportés

### 8. Composant LegalHint

**Fonctionnalités à tester :**
- [ ] Affichage du titre, bullets et disclaimer
- [ ] Variantes (info, warning)
- [ ] Styling approprié selon la variante
- [ ] Responsive design

### 9. Composant ComputedBar

**Fonctionnalités à tester :**
- [ ] Affichage des valeurs calculées
- [ ] Types de valeurs (date, address, calculation, info)
- [ ] Icônes et couleurs appropriées
- [ ] Note de disclaimer

### 10. Composant ActorSelect

**Fonctionnalités à tester :**
- [ ] Adaptation selon le type d'acteur
- [ ] Placeholders contextuels
- [ ] Ouverture/fermeture de la liste
- [ ] Sélection d'un acteur
- [ ] Validation des champs requis
- [ ] Accessibilité (clavier, ARIA)

### 11. Composant ConsentModal

**Fonctionnalités à tester :**
- [ ] Ouverture/fermeture de la modal
- [ ] Affichage du contenu de consentement
- [ ] Checkboxes de lecture des conditions
- [ ] Boutons d'action (Continuer sans IA, Activer IA)
- [ ] Validation des checkboxes avant consentement

### 12. Système de Toasts

**Fonctionnalités à tester :**
- [ ] Affichage des notifications
- [ ] Types de toasts (success, warning, info, error)
- [ ] Auto-fermeture
- [ ] Fermeture manuelle
- [ ] Position et z-index

## Tests de Responsive Design

### Mobile (< 768px)
- [ ] Navigation adaptée
- [ ] Formulaires en une colonne
- [ ] Barre IA en plein écran
- [ ] Boutons et interactions tactiles

### Desktop (≥ 1024px)
- [ ] Navigation étendue
- [ ] Formulaires en deux colonnes
- [ ] Barre IA en slide-over
- [ ] Grilles et layouts optimisés

## Tests de Dark Mode

- [ ] Basculement automatique selon les préférences système
- [ ] Couleurs appropriées en mode sombre
- [ ] Contrastes suffisants
- [ ] Icônes et éléments visuels adaptés

## Tests de Performance

- [ ] Temps de chargement des pages
- [ ] Rendu des composants
- [ ] Animations fluides
- [ ] Gestion de la mémoire

## Tests d'Accessibilité

- [ ] Navigation au clavier
- [ ] Lecteurs d'écran
- [ ] Contrastes de couleurs
- [ ] Labels et descriptions ARIA
- [ ] Focus visible

## Tests de Sécurité

- [ ] Aucune requête réseau non autorisée
- [ ] Validation des entrées utilisateur
- [ ] Protection contre les injections
- [ ] Gestion des erreurs

## Tests de Compatibilité

### Navigateurs
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Edge (dernière version)

### Systèmes d'exploitation
- [ ] Windows 10/11
- [ ] macOS
- [ ] Linux
- [ ] Mobile (iOS/Android)

## Procédure de Test Complète

1. **Test de compilation** : `npm run build`
2. **Test de développement** : `npm run dev`
3. **Navigation manuelle** à travers toutes les pages
4. **Test des formulaires** avec différentes données
5. **Test de l'analyse IA** avec différents fichiers
6. **Test responsive** sur différentes tailles d'écran
7. **Test du dark mode** et des thèmes
8. **Test des composants** individuellement
9. **Test des interactions** utilisateur
10. **Vérification des fonctionnalités** selon les spécifications

## Résolution des Problèmes

### Erreurs de compilation
- Vérifiez les types TypeScript
- Vérifiez les imports
- Vérifiez la syntaxe JSX

### Erreurs d'exécution
- Vérifiez la console du navigateur
- Vérifiez les logs du serveur
- Vérifiez les dépendances

### Problèmes de style
- Vérifiez les classes Tailwind
- Vérifiez la hiérarchie CSS
- Vérifiez les variables CSS

## Support

En cas de problème, consultez :
1. La console du navigateur
2. Les logs du serveur de développement
3. La documentation des composants
4. Les issues GitHub du projet
