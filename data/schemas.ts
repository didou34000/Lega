import { z } from 'zod';
import { OPERATEURS, ASSUREURS, BANQUES, ENERGIE, BAILLEURS_TYPE, ADMIN_SERVICES, ACTOR_ADDRESSES } from './acteurs';

// Types pour les champs UI
export type UiField =
  | { type: 'text'; name: string; label: string; placeholder?: string; required?: boolean; help?: string; dependsOn?: { field: string; equals?: string; in?: string[] } }
  | { type: 'select'; name: string; label: string; options: string[]; required?: boolean; help?: string; dependsOn?: { field: string; equals?: string; in?: string[] } }
  | { type: 'date'; name: string; label: string; required?: boolean; help?: string; dependsOn?: { field: string; equals?: string; in?: string[] } }
  | { type: 'radio'; name: string; label: string; options: string[]; required?: boolean; dependsOn?: { field: string; equals?: string; in?: string[] } }
  | { type: 'checkbox'; name: string; label: string; dependsOn?: { field: string; equals?: string; in?: string[] } }
  | { type: 'textarea'; name: string; label: string; placeholder?: string; rows?: number; required?: boolean; dependsOn?: { field: string; equals?: string; in?: string[] } };

export type UiSchema = {
  zod: any;
  ui: UiField[];
  compute?: (values: any) => Record<string, any>;
};

// Schémas de résiliation
export const resiliationInternetSchema: UiSchema = {
  zod: z.object({
    operateur: z.string().min(1, "Sélectionnez un opérateur"),
    numeroClient: z.string().min(1, "Numéro client requis"),
    offre: z.enum(['ADSL', 'Fibre']),
    motif: z.enum(['fin_engagement', 'loi_chatel', 'demenagement', 'hausse_tarifaire']),
    dateSouscription: z.string().min(1, "Date de souscription requise"),
    adresseInstallation: z.string().min(1, "Adresse d'installation requise"),
    portabilite: z.enum(['Oui', 'Non']),
    engagementInitial: z.string().optional(),
    dateEnvoi: z.string().min(1, "Date d'envoi requise")
  }),
  ui: [
    { type: 'select', name: 'operateur', label: 'Opérateur', options: OPERATEURS, required: true, help: 'Sélectionnez votre fournisseur internet' },
    { type: 'text', name: 'numeroClient', label: 'Numéro client', placeholder: 'Numéro client SFR', required: true },
    { type: 'radio', name: 'offre', label: 'Type d\'offre', options: ['ADSL', 'Fibre'], required: true },
    { type: 'radio', name: 'motif', label: 'Motif de résiliation', options: ['fin_engagement', 'loi_chatel', 'demenagement', 'hausse_tarifaire'], required: true },
    { type: 'date', name: 'dateSouscription', label: 'Date de souscription', required: true },
    { type: 'textarea', name: 'adresseInstallation', label: 'Adresse d\'installation', rows: 3, required: true },
    { type: 'radio', name: 'portabilite', label: 'Souhaitez-vous conserver votre numéro ?', options: ['Oui', 'Non'], required: true },
    { type: 'radio', name: 'engagementInitial', label: 'Votre engagement initial était-il supérieur à 12 mois ?', options: ['Oui', 'Non'], dependsOn: { field: 'motif', equals: 'loi_chatel' } },
    { type: 'date', name: 'dateEnvoi', label: 'Date d\'envoi de la lettre', required: true }
  ],
  compute: (values) => {
    const adresseDest = ACTOR_ADDRESSES[values.operateur] || 'À vérifier sur le site de l\'opérateur';
    const dateFinPreavis = values.dateEnvoi ? new Date(values.dateEnvoi) : null;
    if (dateFinPreavis) {
      dateFinPreavis.setDate(dateFinPreavis.getDate() + 30);
    }
    
    return {
      adresseDest,
      dateFinPreavis: dateFinPreavis?.toISOString().split('T')[0] || 'À calculer',
      preavisJours: 30
    };
  }
};

export const resiliationMobileSchema: UiSchema = {
  zod: z.object({
    operateur: z.string().min(1, "Sélectionnez un opérateur"),
    numeroClient: z.string().min(1, "Numéro client requis"),
    numeroLigne: z.string().min(1, "Numéro de ligne requis"),
    rio: z.string().optional(),
    resteEngagement: z.string().min(1, "Reste d'engagement requis"),
    motif: z.enum(['fin_engagement', 'loi_chatel', 'demenagement', 'hausse_tarifaire']),
    dateEnvoi: z.string().min(1, "Date d'envoi requise")
  }),
  ui: [
    { type: 'select', name: 'operateur', label: 'Opérateur', options: OPERATEURS, required: true },
    { type: 'text', name: 'numeroClient', label: 'Numéro client', required: true },
    { type: 'text', name: 'numeroLigne', label: 'Numéro de ligne', required: true },
    { type: 'text', name: 'rio', label: 'Code RIO (optionnel)', placeholder: 'Ex: 12345678901234567890' },
    { type: 'text', name: 'resteEngagement', label: 'Reste d\'engagement (mois)', placeholder: 'Ex: 6', required: true },
    { type: 'radio', name: 'motif', label: 'Motif de résiliation', options: ['fin_engagement', 'loi_chatel', 'demenagement', 'hausse_tarifaire'], required: true },
    { type: 'date', name: 'dateEnvoi', label: 'Date d\'envoi', required: true }
  ],
  compute: (values) => {
    const adresseDest = ACTOR_ADDRESSES[values.operateur] || 'À vérifier sur le site de l\'opérateur';
    return { adresseDest };
  }
};

export const resiliationSalleSportSchema: UiSchema = {
  zod: z.object({
    enseigne: z.string().min(1, "Enseigne requise"),
    dateContrat: z.string().min(1, "Date du contrat requise"),
    motif: z.enum(['demenagement', 'motif_legitime']),
    motifDetail: z.string().min(1, "Détail du motif requis"),
    dateEnvoi: z.string().min(1, "Date d'envoi requise")
  }),
  ui: [
    { type: 'text', name: 'enseigne', label: 'Enseigne de la salle de sport', required: true },
    { type: 'date', name: 'dateContrat', label: 'Date de signature du contrat', required: true },
    { type: 'radio', name: 'motif', label: 'Motif de résiliation', options: ['demenagement', 'motif_legitime'], required: true },
    { type: 'textarea', name: 'motifDetail', label: 'Détail du motif', rows: 3, required: true },
    { type: 'date', name: 'dateEnvoi', label: 'Date d\'envoi', required: true }
  ]
};

// Schémas d'assurance
export const resiliationAssuranceHabitationSchema: UiSchema = {
  zod: z.object({
    assureur: z.string().min(1, "Sélectionnez un assureur"),
    numContrat: z.string().min(1, "Numéro de contrat requis"),
    adresseAssuree: z.string().min(1, "Adresse assurée requise"),
    formule: z.string().min(1, "Formule d'assurance requise"),
    motif: z.enum(['echeance', 'loi_hamon', 'sinistre']),
    dateEffet: z.string().min(1, "Date d'effet requise"),
    dateEcheance: z.string().min(1, "Date d'échéance requise")
  }),
  ui: [
    { type: 'select', name: 'assureur', label: 'Assureur', options: ASSUREURS, required: true },
    { type: 'text', name: 'numContrat', label: 'Numéro de contrat', required: true },
    { type: 'textarea', name: 'adresseAssuree', label: 'Adresse assurée', rows: 3, required: true },
    { type: 'text', name: 'formule', label: 'Formule d\'assurance', placeholder: 'Ex: Tous risques, Vol + dégâts des eaux', required: true },
    { type: 'radio', name: 'motif', label: 'Motif de résiliation', options: ['echeance', 'loi_hamon', 'sinistre'], required: true },
    { type: 'date', name: 'dateEffet', label: 'Date d\'effet souhaitée', required: true },
    { type: 'date', name: 'dateEcheance', label: 'Date d\'échéance actuelle', required: true }
  ],
  compute: (values) => {
    const adresseAssureur = ACTOR_ADDRESSES[values.assureur] || 'À vérifier sur le site de l\'assureur';
    const dateEffetResiliation = values.dateEffet || 'À définir';
    
    return {
      adresseAssureur,
      dateEffetResiliation,
      loiHamonApplicable: values.motif === 'loi_hamon'
    };
  }
};

export const resiliationAssuranceAutoSchema: UiSchema = {
  zod: z.object({
    immatriculation: z.string().min(1, "Immatriculation requise"),
    conducteurPrincipal: z.string().min(1, "Conducteur principal requis"),
    bonusMalus: z.string().min(1, "Bonus/Malus requis"),
    assureur: z.string().min(1, "Sélectionnez un assureur"),
    motif: z.enum(['vente', 'echeance', 'hamon']),
    dateCession: z.string().min(1, "Date de cession requise")
  }),
  ui: [
    { type: 'text', name: 'immatriculation', label: 'Immatriculation du véhicule', required: true },
    { type: 'text', name: 'conducteurPrincipal', label: 'Conducteur principal', required: true },
    { type: 'text', name: 'bonusMalus', label: 'Bonus/Malus actuel', placeholder: 'Ex: 0.85', required: true },
    { type: 'select', name: 'assureur', label: 'Assureur', options: ASSUREURS, required: true },
    { type: 'radio', name: 'motif', label: 'Motif de résiliation', options: ['vente', 'echeance', 'hamon'], required: true },
    { type: 'date', name: 'dateCession', label: 'Date de cession/vente', required: true }
  ]
};

// Schémas bancaires
export const clotureCompteSchema: UiSchema = {
  zod: z.object({
    banque: z.string().min(1, "Sélectionnez une banque"),
    iban: z.string().min(1, "IBAN requis"),
    agence: z.string().min(1, "Agence requise"),
    ville: z.string().min(1, "Ville requise"),
    raison: z.string().min(1, "Raison de la clôture requise"),
    transfertSolde: z.enum(['Oui', 'Non']),
    ibanDestination: z.string().optional()
  }),
  ui: [
    { type: 'select', name: 'banque', label: 'Banque', options: BANQUES, required: true },
    { type: 'text', name: 'iban', label: 'IBAN du compte à clore', required: true },
    { type: 'text', name: 'agence', label: 'Agence', required: true },
    { type: 'text', name: 'ville', label: 'Ville de l\'agence', required: true },
    { type: 'textarea', name: 'raison', label: 'Raison de la clôture', rows: 3, required: true },
    { type: 'radio', name: 'transfertSolde', label: 'Souhaitez-vous transférer le solde ?', options: ['Oui', 'Non'], required: true },
    { type: 'text', name: 'ibanDestination', label: 'IBAN de destination', dependsOn: { field: 'transfertSolde', equals: 'Oui' } }
  ]
};

export const oppositionCarteSchema: UiSchema = {
  zod: z.object({
    banque: z.string().min(1, "Sélectionnez une banque"),
    typeCarte: z.enum(['Visa', 'Mastercard']),
    numeroTronque: z.string().min(4, "4 derniers chiffres requis"),
    motif: z.enum(['perte', 'vol', 'fraude']),
    dateIncident: z.string().min(1, "Date de l'incident requise")
  }),
  ui: [
    { type: 'select', name: 'banque', label: 'Banque', options: BANQUES, required: true },
    { type: 'radio', name: 'typeCarte', label: 'Type de carte', options: ['Visa', 'Mastercard'], required: true },
    { type: 'text', name: 'numeroTronque', label: '4 derniers chiffres', placeholder: 'Ex: 1234', required: true },
    { type: 'radio', name: 'motif', label: 'Motif de l\'opposition', options: ['perte', 'vol', 'fraude'], required: true },
    { type: 'date', name: 'dateIncident', label: 'Date de l\'incident', required: true }
  ]
};

// Schémas de logement
export const preavisLocationSchema: UiSchema = {
  zod: z.object({
    bailleurType: z.string().min(1, "Type de bailleur requis"),
    bailleurNom: z.string().min(1, "Nom du bailleur requis"),
    adresseLogement: z.string().min(1, "Adresse du logement requise"),
    typeBail: z.enum(['Vide', 'Meublé']),
    motif: z.enum(['zone_tendue', 'emploi', 'sante', 'autre']),
    dateEnvoi: z.string().min(1, "Date d'envoi requise"),
    dateDebutBail: z.string().min(1, "Date de début de bail requise")
  }),
  ui: [
    { type: 'select', name: 'bailleurType', label: 'Type de bailleur', options: BAILLEURS_TYPE, required: true },
    { type: 'text', name: 'bailleurNom', label: 'Nom du bailleur', required: true },
    { type: 'textarea', name: 'adresseLogement', label: 'Adresse du logement', rows: 3, required: true },
    { type: 'radio', name: 'typeBail', label: 'Type de bail', options: ['Vide', 'Meublé'], required: true },
    { type: 'radio', name: 'motif', label: 'Motif du préavis', options: ['zone_tendue', 'emploi', 'sante', 'autre'], required: true },
    { type: 'date', name: 'dateEnvoi', label: 'Date d\'envoi du préavis', required: true },
    { type: 'date', name: 'dateDebutBail', label: 'Date de début du bail', required: true }
  ],
  compute: (values) => {
    const dureePreavis = values.typeBail === 'Vide' ? 3 : 1;
    const dateFinPreavis = values.dateEnvoi ? new Date(values.dateEnvoi) : null;
    if (dateFinPreavis) {
      dateFinPreavis.setMonth(dateFinPreavis.getMonth() + dureePreavis);
    }
    
    return {
      dureePreavis,
      dateFinPreavis: dateFinPreavis?.toISOString().split('T')[0] || 'À calculer',
      zoneTendue: values.motif === 'zone_tendue'
    };
  }
};

export const contestationEDLSchema: UiSchema = {
  zod: z.object({
    dateEDL: z.string().min(1, "Date de l'EDL requise"),
    pointsContestes: z.string().min(1, "Points contestés requis")
  }),
  ui: [
    { type: 'date', name: 'dateEDL', label: 'Date de l\'état des lieux de sortie', required: true },
    { type: 'textarea', name: 'pointsContestes', label: 'Points contestés', rows: 5, placeholder: 'Détaillez les points que vous contestez...', required: true }
  ]
};

// Schémas de travail
export const demissionSchema: UiSchema = {
  zod: z.object({
    employeurNom: z.string().min(1, "Nom de l'employeur requis"),
    societeAdresse: z.string().min(1, "Adresse de la société requise"),
    poste: z.string().min(1, "Poste occupé requis"),
    dateEntree: z.string().min(1, "Date d'entrée requise"),
    preavis: z.string().min(1, "Préavis requis")
  }),
  ui: [
    { type: 'text', name: 'employeurNom', label: 'Nom de l\'employeur', required: true },
    { type: 'textarea', name: 'societeAdresse', label: 'Adresse de la société', rows: 3, required: true },
    { type: 'text', name: 'poste', label: 'Poste occupé', required: true },
    { type: 'date', name: 'dateEntree', label: 'Date d\'entrée dans l\'entreprise', required: true },
    { type: 'text', name: 'preavis', label: 'Préavis (en semaines)', placeholder: 'Ex: 4', required: true }
  ],
  compute: (values) => {
    const preavisSemaines = parseInt(values.preavis) || 0;
    const dateFinPreavis = values.dateEnvoi ? new Date(values.dateEnvoi) : null;
    if (dateFinPreavis) {
      dateFinPreavis.setDate(dateFinPreavis.getDate() + (preavisSemaines * 7));
    }
    
    return {
      preavisSemaines,
      dateFinPreavis: dateFinPreavis?.toISOString().split('T')[0] || 'À calculer'
    };
  }
};

export const demandeAttestationSchema: UiSchema = {
  zod: z.object({
    objet: z.string().min(1, "Objet de la demande requis"),
    dateLimite: z.string().min(1, "Date limite requise"),
    contactRH: z.string().min(1, "Contact RH requis")
  }),
  ui: [
    { type: 'text', name: 'objet', label: 'Objet de la demande', placeholder: 'Ex: Attestation de travail, Attestation de salaire', required: true },
    { type: 'date', name: 'dateLimite', label: 'Date limite souhaitée', required: true },
    { type: 'text', name: 'contactRH', label: 'Contact RH', placeholder: 'Ex: rh@entreprise.com', required: true }
  ]
};

// Schémas administratifs
export const droitAccesRGPDSchema: UiSchema = {
  zod: z.object({
    destinataire: z.string().min(1, "Destinataire requis"),
    dpoEmail: z.string().email("Email DPO invalide").optional(),
    typeDonnees: z.string().min(1, "Type de données requis")
  }),
  ui: [
    { type: 'text', name: 'destinataire', label: 'Destinataire de la demande', required: true },
    { type: 'text', name: 'dpoEmail', label: 'Email du DPO (optionnel)', placeholder: 'dpo@entreprise.com' },
    { type: 'textarea', name: 'typeDonnees', label: 'Type de données demandées', rows: 3, placeholder: 'Ex: Données personnelles, Historique des commandes, etc.', required: true }
  ]
};

export const reclamationAdminSchema: UiSchema = {
  zod: z.object({
    service: z.string().min(1, "Service requis"),
    numeroDossier: z.string().min(1, "Numéro de dossier requis"),
    objet: z.string().min(1, "Objet de la réclamation requis"),
    expose: z.string().min(1, "Exposé de la réclamation requis")
  }),
  ui: [
    { type: 'select', name: 'service', label: 'Service administratif', options: ADMIN_SERVICES, required: true },
    { type: 'text', name: 'numeroDossier', label: 'Numéro de dossier', required: true },
    { type: 'text', name: 'objet', label: 'Objet de la réclamation', required: true },
    { type: 'textarea', name: 'expose', label: 'Exposé de la réclamation', rows: 5, required: true }
  ]
};

// Export de tous les schémas
export const schemas = {
  'resiliation-internet': resiliationInternetSchema,
  'resiliation-telephonie': resiliationMobileSchema,
  'resiliation-salle-sport': resiliationSalleSportSchema,
  'resiliation-assurance-habitation': resiliationAssuranceHabitationSchema,
  'resiliation-assurance-auto': resiliationAssuranceAutoSchema,
  'cloture-compte': clotureCompteSchema,
  'opposition-carte': oppositionCarteSchema,
  'preavis-location': preavisLocationSchema,
  'etat-des-lieux': contestationEDLSchema,
  'lettre-demission': demissionSchema,
  'demande-attestation': demandeAttestationSchema,
  'droit-acces-rgpd': droitAccesRGPDSchema,
  'reclamation': reclamationAdminSchema
};

