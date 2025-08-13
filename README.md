# Formalités France - Générateur de Lettres Administratives

Une application Next.js moderne pour générer des lettres administratives, résiliations et démarches en toute simplicité, avec analyse IA de contrats.

## 🚀 Fonctionnalités

### ✨ Fonctionnalités Principales
- **24+ modèles de lettres** couvrant tous les domaines (Résiliation, Assurance, Banque, Logement, Travail, Administratif)
- **Formulaires intelligents** avec validation Zod et champs conditionnels
- **Aperçu en temps réel** des lettres avec remplacement automatique des variables
- **Analyse IA de contrats** (simulation locale) pour pré-remplir automatiquement les formulaires
- **Drag & Drop** pour l'upload de contrats (PDF, DOCX, TXT, images)
- **Mode sombre** natif et design responsive

### 🧠 Analyse IA (Simulation)
- **Parsing de contrats** : Support PDF, DOCX, TXT, images
- **Détection d'acteurs** : Opérateurs, assureurs, banques, fournisseurs d'énergie
- **Extraction intelligente** : Dates, frais, clauses clés, risques
- **Pré-remplissage automatique** des formulaires
- **Export d'analyse** au format JSON

### 📝 Types de Lettres Disponibles
- **Résiliations** : Internet, Mobile, Salle de sport, Assurance
- **Banque** : Clôture de compte, Opposition carte, Demande de crédit
- **Logement** : Préavis, État des lieux, Demande de travaux
- **Travail** : Démission, Demande d'attestation, Congés
- **Administratif** : RGPD, Réclamations, Demandes de renseignements

## 🛠️ Technologies Utilisées

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS, Framer Motion
- **Validation** : Zod
- **Upload** : React Dropzone
- **Icons** : Phosphor React
- **PDF** : pdfjs-dist (fallback)

## 📁 Structure du Projet

```
legam/
├── app/                    # Pages Next.js
│   ├── page.tsx          # Page d'accueil
│   ├── modeles/          # Liste des modèles
│   └── modeles/[slug]/   # Page modèle individuel
├── components/            # Composants React
│   ├── SmartForm.tsx     # Formulaire intelligent
│   ├── TemplatePreview.tsx # Aperçu des lettres
│   ├── LegalHint.tsx     # Informations légales
│   ├── AiBar.tsx         # Barre d'analyse IA
│   ├── ContractDropzone.tsx # Upload de contrats
│   └── ui/               # Composants UI de base
├── data/                  # Données et schémas
│   ├── acteurs.ts        # Listes d'acteurs
│   ├── catalog.ts        # Catalogue des formalités
│   ├── schemas.ts        # Schémas Zod + UI
│   ├── templates.ts      # Modèles de lettres
│   └── legalHints.ts     # Conseils légaux
├── services/              # Services métier
│   ├── contract/         # Parsing de contrats
│   └── ai/               # Analyse IA
└── types/                 # Types TypeScript
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd legam

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build de production
npm run build

# Lancer en production
npm start
```

### Variables d'Environnement
```bash
# .env.local
NEXT_PUBLIC_APP_NAME="Formalités France"
```

## 🎯 Utilisation

### 1. Navigation
- **Page d'accueil** : Vue d'ensemble et accès rapide à l'analyse IA
- **Catalogue** : Parcourir tous les modèles disponibles
- **Modèle individuel** : Formulaire + aperçu en temps réel

### 2. Analyse IA de Contrats
1. Cliquer sur "Analyser mon contrat" dans une page modèle
2. Glisser-déposer ou sélectionner un fichier (PDF, DOCX, TXT, image)
3. Attendre l'analyse (simulation locale)
4. Cliquer sur "Pré-remplir le formulaire"
5. Les champs sont automatiquement remplis et marqués "IA"

### 3. Génération de Lettres
1. Remplir le formulaire (manuellement ou via IA)
2. Voir l'aperçu en temps réel
3. Télécharger en HTML ou générer en PDF
4. Envoyer en recommandé (fonctionnalité à venir)

## 🔧 Configuration

### Schémas de Formulaires
Les schémas sont définis dans `data/schemas.ts` avec :
- **Validation Zod** : Règles de validation
- **Métadonnées UI** : Configuration des champs
- **Logique conditionnelle** : Champs qui apparaissent selon les valeurs
- **Fonctions de calcul** : Valeurs dérivées automatiques

### Templates de Lettres
Les templates utilisent la syntaxe `{{variable}}` et sont en Markdown :
```markdown
# Lettre de résiliation

**{{nom}} {{prenom}}**
{{adresse}}

**{{operateur}}**
{{adresseDest}}
```

### Analyse IA
L'analyse est simulée localement avec :
- **Détection d'acteurs** basée sur les mots-clés
- **Extraction de dates** via regex
- **Identification de frais** et montants
- **Mapping intelligent** vers les champs de formulaire

## 🎨 Personnalisation

### Thème
- **Couleurs** : Modifiables dans `tailwind.config.js`
- **Mode sombre** : Géré automatiquement
- **Composants** : Extensibles via Tailwind CSS

### Nouveaux Modèles
1. Ajouter le schéma dans `data/schemas.ts`
2. Créer le template dans `data/templates.ts`
3. Ajouter les conseils légaux dans `data/legalHints.ts`
4. Enregistrer dans `data/catalog.ts`

### Extension IA
- **Parsing réel** : Remplacer les mocks dans `services/`
- **API externe** : Intégrer OpenAI/GPT dans `services/ai/AiBridge.ts`
- **Nouveaux formats** : Étendre `ContractParser.ts`

## 📱 Responsive Design

- **Mobile** : Layout en une colonne, barre IA plein écran
- **Tablet** : Adaptation progressive
- **Desktop** : Layout en deux colonnes, barre IA latérale

## 🔒 Sécurité et Confidentialité

- **Analyse locale** : Aucune donnée envoyée à l'extérieur
- **Consentement** : Modal préparée pour future IA distante
- **Validation** : Toutes les entrées utilisateur sont validées
- **Sanitisation** : Protection XSS sur les templates

## 🚧 Fonctionnalités à Venir

- [ ] **Génération PDF** réelle
- [ ] **Envoi en recommandé** automatisé
- [ ] **IA distante** (OpenAI/GPT)
- [ ] **Historique** des lettres générées
- [ ] **Templates personnalisés** utilisateur
- [ ] **Notifications** et rappels
- [ ] **API publique** pour intégrations

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- **Issues** : Utiliser les GitHub Issues
- **Discussions** : GitHub Discussions
- **Email** : [votre-email@example.com]

## 🙏 Remerciements

- **Phosphor Icons** pour les icônes
- **Tailwind CSS** pour le framework CSS
- **Framer Motion** pour les animations
- **Zod** pour la validation
- **Next.js** pour le framework React

---

**Formalités France** - Simplifiez vos démarches administratives ! 🎯
