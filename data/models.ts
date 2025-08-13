// Icônes externes retirées pour compatibilité RSC

export interface Model {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  level: string;
  popular: boolean;
  slug: string;
  ruleId: string;
  fields: ModelField[];
}

export interface ModelField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'email' | 'tel';
  required: boolean;
  placeholder?: string;
  options?: string[];
  help?: string;
}

export const MODELS: Model[] = [
  {
    id: '1',
    title: 'Résiliation Internet',
    description: 'Lettre de résiliation pour votre abonnement internet',
    category: 'resiliation',
    tags: ['Internet', 'Télécom'],
    level: 'Gratuit',
    popular: true,
    
    slug: 'resiliation-internet',
    ruleId: 'resiliation-internet',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'numeroClient', label: 'Numéro client', type: 'text', required: true, placeholder: 'Votre numéro client' },
      { name: 'operateur', label: 'Opérateur', type: 'select', required: true, options: ['Orange', 'SFR', 'Bouygues Telecom', 'Free', 'Autre'] },
      { name: 'offre', label: 'Type d\'offre', type: 'select', required: true, options: ['ADSL', 'Fibre', '4G/5G', 'Autre'] },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Fin d\'engagement', 'Loi Chatel', 'Déménagement', 'Hausse tarifaire', 'Autre'] },
      { name: 'dateSouscription', label: 'Date de souscription', type: 'date', required: false },
      { name: 'adresseInstallation', label: 'Adresse d\'installation', type: 'textarea', required: true, placeholder: 'Adresse où le service est installé' }
    ]
  },
  {
    id: '2',
    title: 'Résiliation Assurance Habitation',
    description: 'Résiliez votre assurance habitation en toute simplicité',
    category: 'assurance',
    tags: ['Assurance', 'Habitation'],
    level: 'Gratuit',
    popular: true,
    
    slug: 'resiliation-assurance-habitation',
    ruleId: 'assurance-habitation-resiliation',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'numContrat', label: 'Numéro de contrat', type: 'text', required: true, placeholder: 'Numéro de votre contrat' },
      { name: 'assureur', label: 'Assureur', type: 'select', required: true, options: ['MAIF', 'MACIF', 'AXA', 'Allianz', 'Autre'] },
      { name: 'adresseAssuree', label: 'Adresse assurée', type: 'textarea', required: true, placeholder: 'Adresse du bien assuré' },
      { name: 'formule', label: 'Formule d\'assurance', type: 'text', required: true, placeholder: 'Nom de votre formule' },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Échéance', 'Loi Hamon', 'Sinistre', 'Changement d\'assureur', 'Autre'] },
      { name: 'dateEffet', label: 'Date d\'effet', type: 'date', required: false },
      { name: 'dateEcheance', label: 'Date d\'échéance', type: 'date', required: false }
    ]
  },
  {
    id: '3',
    title: 'Résiliation Mobile',
    description: 'Lettre de résiliation pour votre forfait mobile',
    category: 'resiliation',
    tags: ['Mobile', 'Télécom'],
    level: 'Gratuit',
    popular: true,
    
    slug: 'resiliation-mobile',
    ruleId: 'resiliation-mobile',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'numeroClient', label: 'Numéro client', type: 'text', required: true, placeholder: 'Votre numéro client' },
      { name: 'operateur', label: 'Opérateur', type: 'select', required: true, options: ['Orange', 'SFR', 'Bouygues Telecom', 'Free', 'Autre'] },
      { name: 'numeroMobile', label: 'Numéro mobile', type: 'tel', required: true, placeholder: 'Votre numéro mobile' },
      { name: 'forfait', label: 'Nom du forfait', type: 'text', required: true, placeholder: 'Nom de votre forfait' },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Fin d\'engagement', 'Loi Chatel', 'Changement d\'opérateur', 'Autre'] },
      { name: 'portabilite', label: 'Souhaitez-vous garder votre numéro ?', type: 'select', required: true, options: ['Oui', 'Non'] }
    ]
  },
  {
    id: '4',
    title: 'Résiliation Assurance Auto',
    description: 'Résiliez votre assurance automobile',
    category: 'assurance',
    tags: ['Assurance', 'Automobile'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'resiliation-assurance-auto',
    ruleId: 'assurance-auto-resiliation',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'numContrat', label: 'Numéro de contrat', type: 'text', required: true, placeholder: 'Numéro de votre contrat' },
      { name: 'assureur', label: 'Assureur', type: 'select', required: true, options: ['MAIF', 'MACIF', 'AXA', 'Allianz', 'Autre'] },
      { name: 'immatriculation', label: 'Immatriculation', type: 'text', required: true, placeholder: 'Plaque d\'immatriculation' },
      { name: 'marque', label: 'Marque du véhicule', type: 'text', required: true, placeholder: 'Marque de votre véhicule' },
      { name: 'modele', label: 'Modèle du véhicule', type: 'text', required: true, placeholder: 'Modèle de votre véhicule' },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Vente du véhicule', 'Échéance', 'Loi Hamon', 'Changement d\'assureur', 'Autre'] }
    ]
  },
  {
    id: '5',
    title: 'Clôture de compte bancaire',
    description: 'Lettre de clôture de compte bancaire',
    category: 'banque',
    tags: ['Banque', 'Compte'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'cloture-compte-bancaire',
    ruleId: 'banque-cloture',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'numeroCompte', label: 'Numéro de compte', type: 'text', required: true, placeholder: 'Numéro de votre compte' },
      { name: 'banque', label: 'Nom de la banque', type: 'text', required: true, placeholder: 'Nom de votre banque' },
      { name: 'agence', label: 'Agence', type: 'text', required: true, placeholder: 'Nom de votre agence' },
      { name: 'motif', label: 'Motif de clôture', type: 'select', required: true, options: ['Déménagement', 'Changement de banque', 'Fermeture d\'entreprise', 'Autre'] },
      { name: 'dateCloture', label: 'Date de clôture souhaitée', type: 'date', required: true }
    ]
  },
  {
    id: '6',
    title: 'Opposition carte bancaire',
    description: 'Lettre d\'opposition de carte bancaire',
    category: 'banque',
    tags: ['Banque', 'Carte'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'opposition-carte-bancaire',
    ruleId: 'opposition-carte-bancaire',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'numeroCarte', label: 'Numéro de carte', type: 'text', required: true, placeholder: 'Numéro de votre carte (4 derniers chiffres)' },
      { name: 'typeCarte', label: 'Type de carte', type: 'select', required: true, options: ['Visa', 'Mastercard', 'American Express', 'Autre'] },
      { name: 'motif', label: 'Motif de l\'opposition', type: 'select', required: true, options: ['Perte', 'Vol', 'Fraude', 'Autre'] },
      { name: 'dateOpposition', label: 'Date de l\'incident', type: 'date', required: true }
    ]
  },
  {
    id: '7',
    title: 'Résiliation Salle de sport',
    description: 'Résiliez votre abonnement de salle de sport',
    category: 'resiliation',
    tags: ['Sport', 'Abonnement'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'resiliation-salle-sport',
    ruleId: 'resiliation-salle-sport',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'numeroClient', label: 'Numéro client', type: 'text', required: true, placeholder: 'Votre numéro client' },
      { name: 'salle', label: 'Nom de la salle', type: 'text', required: true, placeholder: 'Nom de votre salle de sport' },
      { name: 'adresseSalle', label: 'Adresse de la salle', type: 'textarea', required: true, placeholder: 'Adresse de votre salle de sport' },
      { name: 'formule', label: 'Formule d\'abonnement', type: 'text', required: true, placeholder: 'Nom de votre formule' },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Fin d\'engagement', 'Déménagement', 'Problème de santé', 'Autre'] },
      { name: 'dateDerniereSeance', label: 'Date de dernière séance', type: 'date', required: false }
    ]
  },
  {
    id: '8',
    title: 'Résiliation Assurance Santé',
    description: 'Résiliez votre assurance santé',
    category: 'assurance',
    tags: ['Assurance', 'Santé'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'resiliation-assurance-sante',
    ruleId: 'resiliation-assurance-sante',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'numContrat', label: 'Numéro de contrat', type: 'text', required: true, placeholder: 'Numéro de votre contrat' },
      { name: 'assureur', label: 'Assureur', type: 'select', required: true, options: ['MAIF', 'MACIF', 'AXA', 'Allianz', 'Autre'] },
      { name: 'formule', label: 'Formule d\'assurance', type: 'text', required: true, placeholder: 'Nom de votre formule' },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Échéance', 'Loi Hamon', 'Changement d\'assureur', 'Autre'] },
      { name: 'dateEffet', label: 'Date d\'effet', type: 'date', required: false },
      { name: 'dateEcheance', label: 'Date d\'échéance', type: 'date', required: false }
    ]
  },
  {
    id: '9',
    title: 'Demande de prêt bancaire',
    description: 'Lettre de demande de prêt bancaire',
    category: 'banque',
    tags: ['Banque', 'Prêt'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'demande-pret-bancaire',
    ruleId: 'demande-pret-bancaire',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'banque', label: 'Nom de la banque', type: 'text', required: true, placeholder: 'Nom de votre banque' },
      { name: 'agence', label: 'Agence', type: 'text', required: true, placeholder: 'Nom de votre agence' },
      { name: 'montant', label: 'Montant demandé', type: 'text', required: true, placeholder: 'Montant du prêt souhaité' },
      { name: 'duree', label: 'Durée souhaitée', type: 'text', required: true, placeholder: 'Durée du prêt en années' },
      { name: 'motif', label: 'Motif du prêt', type: 'select', required: true, options: ['Achat immobilier', 'Travaux', 'Achat véhicule', 'Autre'] },
      { name: 'revenus', label: 'Revenus mensuels', type: 'text', required: true, placeholder: 'Vos revenus mensuels nets' }
    ]
  },
  {
    id: '10',
    title: 'Lettre de démission',
    description: 'Lettre de démission professionnelle',
    category: 'travail',
    tags: ['Travail', 'Démission'],
    level: 'Gratuit',
    popular: true,
    
    slug: 'lettre-demission',
    ruleId: 'lettre-demission',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'poste', label: 'Poste occupé', type: 'text', required: true, placeholder: 'Votre poste actuel' },
      { name: 'dateEntree', label: 'Date d\'entrée', type: 'date', required: true },
      { name: 'departement', label: 'Département', type: 'text', required: false, placeholder: 'Votre département' },
      { name: 'preavis', label: 'Préavis (en semaines)', type: 'text', required: true, placeholder: 'Durée de votre préavis' },
      { name: 'dateDepart', label: 'Date de départ souhaitée', type: 'date', required: true },
      { name: 'motif', label: 'Motif de démission', type: 'textarea', required: false, placeholder: 'Raison de votre démission (optionnel)' }
    ]
  },
  {
    id: '11',
    title: 'Demande de congés',
    description: 'Lettre de demande de congés payés',
    category: 'travail',
    tags: ['Travail', 'Congés'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'demande-conges',
    ruleId: 'demande-conges',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'poste', label: 'Poste occupé', type: 'text', required: true, placeholder: 'Votre poste actuel' },
      { name: 'departement', label: 'Département', type: 'text', required: false, placeholder: 'Votre département' },
      { name: 'dateDebut', label: 'Date de début des congés', type: 'date', required: true },
      { name: 'dateFin', label: 'Date de fin des congés', type: 'date', required: true },
      { name: 'nombreJours', label: 'Nombre de jours', type: 'text', required: true, placeholder: 'Nombre de jours de congés' },
      { name: 'motif', label: 'Motif des congés', type: 'textarea', required: false, placeholder: 'Raison de vos congés (optionnel)' }
    ]
  },
  {
    id: '12',
    title: 'Préavis de départ',
    description: 'Lettre de préavis pour votre logement',
    category: 'logement',
    tags: ['Logement', 'Préavis'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'preavis-depart',
    ruleId: 'preavis-depart',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'typeBail', label: 'Type de bail', type: 'select', required: true, options: ['Bail vide', 'Bail meublé', 'Bail étudiant', 'Autre'] },
      { name: 'adresseLogement', label: 'Adresse du logement', type: 'textarea', required: true, placeholder: 'Adresse du logement loué' },
      { name: 'dateDebutBail', label: 'Date de début de bail', type: 'date', required: true },
      { name: 'dureePreavis', label: 'Durée du préavis (en mois)', type: 'text', required: true, placeholder: 'Durée de votre préavis' },
      { name: 'dateDepart', label: 'Date de départ', type: 'date', required: true },
      { name: 'motif', label: 'Motif du départ', type: 'textarea', required: false, placeholder: 'Raison de votre départ (optionnel)' }
    ]
  },
  {
    id: '13',
    title: 'Contestation EDL',
    description: 'Lettre de contestation d\'état des lieux',
    category: 'logement',
    tags: ['Logement', 'EDL'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'contestation-edl',
    ruleId: 'contestation-edl',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'adresseLogement', label: 'Adresse du logement', type: 'textarea', required: true, placeholder: 'Adresse du logement loué' },
      { name: 'dateEDL', label: 'Date de l\'état des lieux', type: 'date', required: true },
      { name: 'typeEDL', label: 'Type d\'état des lieux', type: 'select', required: true, options: ['Entrée', 'Sortie', 'Intermédiaire'] },
      { name: 'motifContestation', label: 'Motif de la contestation', type: 'textarea', required: true, placeholder: 'Détaillez les points contestés' },
      { name: 'preuves', label: 'Preuves à l\'appui', type: 'textarea', required: false, placeholder: 'Photos, témoignages, etc.' },
      { name: 'dateLimite', label: 'Date limite de réponse', type: 'date', required: true }
    ]
  },
  {
    id: '14',
    title: 'Demande RGPD',
    description: 'Lettre de demande d\'accès aux données personnelles',
    category: 'administratif',
    tags: ['RGPD', 'Données'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'demande-rgpd',
    ruleId: 'demande-rgpd',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'organisme', label: 'Organisme concerné', type: 'text', required: true, placeholder: 'Nom de l\'organisme' },
      { name: 'adresseOrganisme', label: 'Adresse de l\'organisme', type: 'textarea', required: true, placeholder: 'Adresse de l\'organisme' },
      { name: 'typeDemande', label: 'Type de demande', type: 'select', required: true, options: ['Accès aux données', 'Rectification', 'Effacement', 'Portabilité', 'Autre'] },
      { name: 'donneesConcernees', label: 'Données concernées', type: 'textarea', required: true, placeholder: 'Décrivez les données concernées' },
      { name: 'periode', label: 'Période concernée', type: 'text', required: false, placeholder: 'Période des données demandées' },
      { name: 'justificatif', label: 'Justificatif d\'identité', type: 'select', required: true, options: ['Carte d\'identité', 'Passeport', 'Permis de conduire', 'Autre'] }
    ]
  },
  {
    id: '15',
    title: 'Réclamation administration',
    description: 'Lettre de réclamation administrative',
    category: 'administratif',
    tags: ['Administration', 'Réclamation'],
    level: 'Gratuit',
    popular: false,
    
    slug: 'reclamation-administration',
    ruleId: 'reclamation-administration',
    fields: [
      { name: 'nomPrenom', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
      { name: 'adresse', label: 'Adresse complète', type: 'textarea', required: true, placeholder: 'Votre adresse complète' },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: false, placeholder: 'Votre numéro de téléphone' },
      { name: 'email', label: 'Email', type: 'email', required: false, placeholder: 'Votre adresse email' },
      { name: 'administration', label: 'Administration concernée', type: 'text', required: true, placeholder: 'Nom de l\'administration' },
      { name: 'adresseAdmin', label: 'Adresse de l\'administration', type: 'textarea', required: true, placeholder: 'Adresse de l\'administration' },
      { name: 'objet', label: 'Objet de la réclamation', type: 'text', required: true, placeholder: 'Objet de votre réclamation' },
      { name: 'description', label: 'Description du problème', type: 'textarea', required: true, placeholder: 'Décrivez le problème rencontré' },
      { name: 'dateIncident', label: 'Date de l\'incident', type: 'date', required: true },
      { name: 'solution', label: 'Solution souhaitée', type: 'textarea', required: false, placeholder: 'Solution que vous souhaitez' }
    ]
  }
];

export const getModelBySlug = (slug: string): Model | undefined => {
  return MODELS.find(model => model.slug === slug);
};

export const getModelById = (id: string): Model | undefined => {
  return MODELS.find(model => model.id === id);
};

export const getModelsByCategory = (category: string): Model[] => {
  if (category === 'all') return MODELS;
  return MODELS.filter(model => model.category === category);
};

export const searchModels = (query: string): Model[] => {
  const lowercaseQuery = query.toLowerCase();
  return MODELS.filter(model => 
    model.title.toLowerCase().includes(lowercaseQuery) ||
    model.description.toLowerCase().includes(lowercaseQuery) ||
    model.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
