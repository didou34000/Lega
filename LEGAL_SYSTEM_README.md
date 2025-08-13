# Pack Légal + Flows de questions

## 🎯 Objectif

Système de règles légales avec moteur de questions dynamique pour l'application "Formalités France" (Next.js + TypeScript + Tailwind).

## 🏗️ Architecture

### Structure des fichiers

```
legal/
├── rules.ts          # Définition des règles légales et types
└── engine.ts         # Moteur de validation et calculs

hooks/
└── useLegalRules.ts  # Hook React pour gérer les règles

components/
├── LegalPanel.tsx    # Panneau d'informations légales
├── LegalSummary.tsx  # Résumé et calculs automatiques
├── SmartForm.tsx     # Formulaire intelligent avec validation
└── LegalDemo.tsx     # Page de démonstration complète
```

## 📋 Types et interfaces

### FieldReq (Champ de formulaire)
```typescript
export type FieldReq = {
  name: string;                // Identifiant unique
  label: string;               // Libellé en français
  type: 'text'|'select'|'date'|'radio'|'textarea'|'file';
  required?: boolean | { when: { field: string; equals?: string; in?: string[] } };
  options?: string[];          // Pour select/radio
  placeholder?: string;         // Placeholder du champ
  help?: string;               // Aide contextuelle
  pattern?: string;            // Regex de validation
  maxLength?: number;          // Longueur maximale
};
```

### ComputeRule (Règle de calcul)
```typescript
export type ComputeRule = {
  name: string;                // Nom du résultat calculé
  from: string[];              // Champs sources
  fn: string;                  // Code de calcul (exécuté côté client)
  label: string;               // Libellé du résultat
  disclaimer?: string;         // Avertissement "indicatif"
};
```

### AttachmentReq (Justificatif requis)
```typescript
export type AttachmentReq = {
  label: string;               // Libellé du justificatif
  when?: { field: string; equals?: string; in?: string[] };
  accepted: string[];          // Types de fichiers acceptés
  required?: boolean;          // Obligatoire ou non
  help?: string;               // Aide contextuelle
};
```

## 🚀 Fonctionnalités

### 1. Validation conditionnelle
- Champs requis selon les valeurs d'autres champs
- Validation en temps réel avec messages d'erreur
- Support des patterns regex (ex: IBAN)

### 2. Calculs automatiques
- Dates d'effet, préavis, délais
- Fonctions utilitaires : `addDays()`, `addMonths()`, `addYears()`
- Exécution sécurisée côté client

### 3. Gestion des justificatifs
- Affichage conditionnel selon les réponses
- Validation des types de fichiers
- Interface de drag & drop

### 4. Interface utilisateur
- Panneau latéral avec informations légales
- Formulaire intelligent avec validation
- Aperçu des calculs en temps réel
- Design responsive et accessible

## 🎨 Règles prêtes à l'emploi

### A) Télécom — Résiliation Internet/Mobile
- **ID** : `resiliation-internet`, `resiliation-mobile`
- **Champs** : Opérateur, type d'accès, numéro client, motif, portabilité
- **Calculs** : Date d'effet (préavis ≤ 10 jours)
- **Justificatifs** : Motif légitime, hausse tarifaire

### B) Assurance — Habitation / Auto
- **ID** : `assurance-habitation-resiliation`, `assurance-auto-resiliation`
- **Champs** : Assureur, contrat, motif, dates
- **Calculs** : Prise d'effet (Loi Hamon vs. changement situation)
- **Justificatifs** : Changement de situation, cession véhicule

### C) Logement — Préavis
- **ID** : `logement-preavis`
- **Champs** : Type de bail, zone tendue, motifs spéciaux
- **Calculs** : Durée de préavis (1 ou 3 mois)
- **Justificatifs** : Santé, emploi, mutation, RSA/AAH

### D) Banque — Clôture de compte
- **ID** : `banque-cloture`
- **Champs** : Banque, IBAN, mobilité bancaire, transfert
- **Validation** : Pattern IBAN
- **Tips** : Clôture gratuite, mobilité bancaire

### E) Énergie — Déménagement / Changement
- **ID** : `energie-demenagement`
- **Champs** : Type de démarche, fournisseur, compteur
- **Calculs** : Résiliation automatique vs. manuelle
- **Justificatifs** : Relevé de compteur

## 🔧 Utilisation

### 1. Dans un composant React
```typescript
import { useLegalRules } from '../hooks/useLegalRules';

const MyComponent = () => {
  const {
    rule,
    values,
    validationResult,
    computedResults,
    updateValue,
    isValid
  } = useLegalRules('resiliation-internet');

  // Utiliser les valeurs et résultats...
};
```

### 2. Validation d'un formulaire
```typescript
import { validateForm } from '../legal/engine';

const result = validateForm(rule, formValues);
if (result.isValid) {
  // Soumettre le formulaire
} else {
  // Afficher les erreurs
  console.log(result.errors);
}
```

### 3. Calculs automatiques
```typescript
import { computeValues } from '../legal/engine';

const results = computeValues(rule, formValues);
// results contient les valeurs calculées
```

## 🎯 Tests rapides

### Télécom Internet
1. Sélectionner "Motif légitime" → Justificatif requis
2. Choisir "Portabilité = Oui" → Champ RIO requis
3. Date d'envoi → Date d'effet calculée J+10

### Assurance Habitation
1. "Loi Hamon (>12 mois)" → Effet immédiat
2. "Changement de situation" → Justificatif + effet 1 mois

### Logement
1. "Meublé" → Préavis 1 mois
2. "Vide + zone tendue" → Préavis 1 mois
3. "Vide + motif spécial" → Préavis 1 mois + justificatif

### Banque
1. IBAN invalide → Erreur de validation
2. "Mobilité = Oui" → Pas d'IBAN destination requis

### Énergie
1. "Changement fournisseur" → Info "résiliation automatique"
2. "Déménagement" → Relevé de compteur requis

## 🚨 Sécurité

- Exécution sécurisée des fonctions de calcul
- Validation côté client ET serveur
- Pas d'injection de code malveillant
- Sanitisation des entrées utilisateur

## 📱 Responsive Design

- Interface adaptée mobile/desktop
- Animations fluides avec Framer Motion
- Thème clair/sombre
- Accessibilité (ARIA labels, navigation clavier)

## 🔮 Extensions futures

- **Règles dynamiques** : Chargement depuis une API
- **IA intégrée** : Suggestions automatiques de champs
- **Workflow** : Étapes multiples avec progression
- **Export** : Génération de PDF avec calculs
- **Historique** : Sauvegarde des formulaires remplis

## 📄 Mentions légales

> ⚠️ **Important** : Les informations fournies sont à titre indicatif sur la base de sources officielles. Elles ne constituent pas un conseil juridique. Vérifiez vos conditions contractuelles et la réglementation applicable.

## 🎉 Démonstration

Visitez `/legal-demo` pour tester le système complet avec toutes les familles de règles !

---

**Développé avec ❤️ pour Formalités France**
