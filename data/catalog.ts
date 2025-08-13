import { 
  EnvelopeSimpleOpen, 
  ShieldCheck, 
  Bank, 
  House, 
  Briefcase, 
  FileText,
  FileArrowDown,
  PencilSimple,
  MagnifyingGlass
} from 'phosphor-react';

export type Formalite = {
  id: string;
  slug: string;
  categorie: 'Résiliation' | 'Assurance' | 'Banque' | 'Logement' | 'Travail' | 'Administratif';
  sousCategorie?: string;
  acteurType?: 'Operateur' | 'Assureur' | 'Banque' | 'FournisseurEnergie' | 'Bailleur' | 'Employeur' | 'Administration';
  acteurs?: string[];
  titre: string;
  description: string;
  tags: string[];
  niveau: 'Gratuit' | 'Pro';
  schemaId: string;
  templateId: string;
  legalHintsId?: string;
};

export const CATALOG: Formalite[] = [
  // RÉSILIATION (6)
  {
    id: '1',
    slug: 'resiliation-internet',
    categorie: 'Résiliation',
    sousCategorie: 'Internet',
    acteurType: 'Operateur',
    acteurs: ['Orange', 'SFR', 'Bouygues Telecom', 'Free', 'RED by SFR', 'Sosh', 'B&You'],
    titre: 'Résiliation Fournisseur Internet',
    description: 'Lettre de résiliation pour votre abonnement internet',
    tags: ['Internet', 'Télécom', 'Résiliation'],
    niveau: 'Gratuit',
    schemaId: 'resiliation-internet',
    templateId: 'resiliation-internet',
    legalHintsId: 'resiliation-internet'
  },
  {
    id: '2',
    slug: 'resiliation-telephonie',
    categorie: 'Résiliation',
    sousCategorie: 'Mobile',
    acteurType: 'Operateur',
    acteurs: ['Orange', 'SFR', 'Bouygues Telecom', 'Free', 'RED by SFR', 'Sosh', 'B&You'],
    titre: 'Résiliation Téléphonie Mobile',
    description: 'Résiliez votre forfait mobile en toute simplicité',
    tags: ['Mobile', 'Télécom', 'Résiliation'],
    niveau: 'Gratuit',
    schemaId: 'resiliation-telephonie',
    templateId: 'resiliation-telephonie',
    legalHintsId: 'resiliation-telephonie'
  },
  {
    id: '3',
    slug: 'resiliation-salle-sport',
    categorie: 'Résiliation',
    sousCategorie: 'Sport',
    titre: 'Résiliation Salle de Sport',
    description: 'Lettre de résiliation pour votre abonnement fitness',
    tags: ['Sport', 'Abonnement', 'Résiliation'],
    niveau: 'Gratuit',
    schemaId: 'resiliation-salle-sport',
    templateId: 'resiliation-salle-sport'
  },
  {
    id: '4',
    slug: 'resiliation-assurance-habitation',
    categorie: 'Résiliation',
    sousCategorie: 'Assurance',
    acteurType: 'Assureur',
    acteurs: ['MAIF', 'MACIF', 'GMF', 'AXA', 'Allianz', 'Groupama', 'Matmut', 'Direct Assurance'],
    titre: 'Résiliation Assurance Habitation',
    description: 'Résiliez votre assurance habitation',
    tags: ['Assurance', 'Habitation', 'Résiliation'],
    niveau: 'Gratuit',
    schemaId: 'resiliation-assurance-habitation',
    templateId: 'resiliation-assurance-habitation',
    legalHintsId: 'resiliation-assurance-habitation'
  },
  {
    id: '5',
    slug: 'resiliation-assurance-auto',
    categorie: 'Résiliation',
    sousCategorie: 'Assurance',
    acteurType: 'Assureur',
    acteurs: ['MAIF', 'MACIF', 'GMF', 'AXA', 'Allianz', 'Groupama', 'Matmut', 'Direct Assurance'],
    titre: 'Résiliation Assurance Auto',
    description: 'Résiliez votre assurance automobile',
    tags: ['Assurance', 'Auto', 'Résiliation'],
    niveau: 'Gratuit',
    schemaId: 'resiliation-assurance-auto',
    templateId: 'resiliation-assurance-auto'
  },
  {
    id: '6',
    slug: 'resiliation-energie',
    categorie: 'Résiliation',
    sousCategorie: 'Énergie',
    acteurType: 'FournisseurEnergie',
    acteurs: ['EDF', 'Engie', 'TotalEnergies', 'OHM Énergie', 'Iberdrola', 'Ekwateur'],
    titre: 'Résiliation Fournisseur Énergie',
    description: 'Changez de fournisseur d\'électricité ou de gaz',
    tags: ['Énergie', 'Électricité', 'Gaz', 'Résiliation'],
    niveau: 'Gratuit',
    schemaId: 'resiliation-energie',
    templateId: 'resiliation-energie'
  },

  // ASSURANCE (4)
  {
    id: '7',
    slug: 'declaration-sinistre',
    categorie: 'Assurance',
    sousCategorie: 'Sinistre',
    acteurType: 'Assureur',
    acteurs: ['MAIF', 'MACIF', 'GMF', 'AXA', 'Allianz', 'Groupama', 'Matmut', 'Direct Assurance'],
    titre: 'Déclaration de Sinistre',
    description: 'Déclarez un sinistre à votre assurance',
    tags: ['Assurance', 'Sinistre', 'Déclaration'],
    niveau: 'Gratuit',
    schemaId: 'declaration-sinistre',
    templateId: 'declaration-sinistre'
  },
  {
    id: '8',
    slug: 'demande-remboursement',
    categorie: 'Assurance',
    sousCategorie: 'Remboursement',
    acteurType: 'Assureur',
    acteurs: ['MAIF', 'MACIF', 'GMF', 'AXA', 'Allianz', 'Groupama', 'Matmut', 'Direct Assurance'],
    titre: 'Demande de Remboursement',
    description: 'Demandez le remboursement de frais médicaux',
    tags: ['Assurance', 'Santé', 'Remboursement'],
    niveau: 'Gratuit',
    schemaId: 'demande-remboursement',
    templateId: 'demande-remboursement'
  },
  {
    id: '9',
    slug: 'contestation-expertise',
    categorie: 'Assurance',
    sousCategorie: 'Expertise',
    acteurType: 'Assureur',
    acteurs: ['MAIF', 'MACIF', 'GMF', 'AXA', 'Allianz', 'Groupama', 'Matmut', 'Direct Assurance'],
    titre: 'Contestation d\'Expertise',
    description: 'Contestez une expertise d\'assurance',
    tags: ['Assurance', 'Expertise', 'Contestation'],
    niveau: 'Gratuit',
    schemaId: 'contestation-expertise',
    templateId: 'contestation-expertise'
  },
  {
    id: '10',
    slug: 'demande-extension-garantie',
    categorie: 'Assurance',
    sousCategorie: 'Garantie',
    acteurType: 'Assureur',
    acteurs: ['MAIF', 'MACIF', 'GMF', 'AXA', 'Allianz', 'Groupama', 'Matmut', 'Direct Assurance'],
    titre: 'Demande d\'Extension de Garantie',
    description: 'Demandez l\'extension d\'une garantie d\'assurance',
    tags: ['Assurance', 'Garantie', 'Extension'],
    niveau: 'Gratuit',
    schemaId: 'demande-extension-garantie',
    templateId: 'demande-extension-garantie'
  },

  // BANQUE (4)
  {
    id: '11',
    slug: 'cloture-compte',
    categorie: 'Banque',
    sousCategorie: 'Compte',
    acteurType: 'Banque',
    acteurs: ['BNP Paribas', 'Société Générale', 'Crédit Agricole', 'La Banque Postale', 'LCL', 'Crédit Mutuel', 'Hello bank!', 'Boursorama'],
    titre: 'Clôture de Compte Bancaire',
    description: 'Demande de clôture de votre compte bancaire',
    tags: ['Compte', 'Clôture', 'Banque'],
    niveau: 'Gratuit',
    schemaId: 'cloture-compte',
    templateId: 'cloture-compte',
    legalHintsId: 'cloture-compte'
  },
  {
    id: '12',
    slug: 'opposition-carte',
    categorie: 'Banque',
    sousCategorie: 'Carte',
    acteurType: 'Banque',
    acteurs: ['BNP Paribas', 'Société Générale', 'Crédit Agricole', 'La Banque Postale', 'LCL', 'Crédit Mutuel', 'Hello bank!', 'Boursorama'],
    titre: 'Opposition Carte Bancaire',
    description: 'Faites opposition à votre carte bancaire',
    tags: ['Carte', 'Opposition', 'Banque'],
    niveau: 'Gratuit',
    schemaId: 'opposition-carte',
    templateId: 'opposition-carte'
  },
  {
    id: '13',
    slug: 'demande-credit',
    categorie: 'Banque',
    sousCategorie: 'Crédit',
    acteurType: 'Banque',
    acteurs: ['BNP Paribas', 'Société Générale', 'Crédit Agricole', 'La Banque Postale', 'LCL', 'Crédit Mutuel', 'Hello bank!', 'Boursorama'],
    titre: 'Demande de Crédit',
    description: 'Demandez un prêt personnel ou immobilier',
    tags: ['Crédit', 'Prêt', 'Banque'],
    niveau: 'Gratuit',
    schemaId: 'demande-credit',
    templateId: 'demande-credit'
  },
  {
    id: '14',
    slug: 'reclamation-bancaire',
    categorie: 'Banque',
    sousCategorie: 'Réclamation',
    acteurType: 'Banque',
    acteurs: ['BNP Paribas', 'Société Générale', 'Crédit Agricole', 'La Banque Postale', 'LCL', 'Crédit Mutuel', 'Hello bank!', 'Boursorama'],
    titre: 'Réclamation Bancaire',
    description: 'Portez plainte contre votre banque',
    tags: ['Réclamation', 'Banque', 'Litige'],
    niveau: 'Gratuit',
    schemaId: 'reclamation-bancaire',
    templateId: 'reclamation-bancaire'
  },

  // LOGEMENT (4)
  {
    id: '15',
    slug: 'preavis-location',
    categorie: 'Logement',
    sousCategorie: 'Location',
    acteurType: 'Bailleur',
    titre: 'Préavis de Résiliation Location',
    description: 'Donnez votre préavis de départ à votre propriétaire',
    tags: ['Location', 'Préavis', 'Logement'],
    niveau: 'Gratuit',
    schemaId: 'preavis-location',
    templateId: 'preavis-location',
    legalHintsId: 'preavis-location'
  },
  {
    id: '16',
    slug: 'etat-des-lieux',
    categorie: 'Logement',
    sousCategorie: 'Location',
    acteurType: 'Bailleur',
    titre: 'État des Lieux de Sortie',
    description: 'Réalisez l\'état des lieux de sortie',
    tags: ['Location', 'État des lieux', 'Logement'],
    niveau: 'Gratuit',
    schemaId: 'etat-des-lieux',
    templateId: 'etat-des-lieux'
  },
  {
    id: '17',
    slug: 'demarche-edf-engie',
    categorie: 'Logement',
    sousCategorie: 'Énergie',
    acteurType: 'FournisseurEnergie',
    acteurs: ['EDF', 'Engie', 'TotalEnergies', 'OHM Énergie', 'Iberdrola', 'Ekwateur'],
    titre: 'Démarches EDF/Engie',
    description: 'Lettres pour vos démarches énergétiques',
    tags: ['Énergie', 'Fournisseur', 'Logement'],
    niveau: 'Gratuit',
    schemaId: 'demarche-edf-engie',
    templateId: 'demarche-edf-engie'
  },
  {
    id: '18',
    slug: 'demande-travaux',
    categorie: 'Logement',
    sousCategorie: 'Travaux',
    acteurType: 'Bailleur',
    titre: 'Demande de Travaux',
    description: 'Demandez des travaux à votre propriétaire',
    tags: ['Travaux', 'Logement', 'Bail'],
    niveau: 'Gratuit',
    schemaId: 'demande-travaux',
    templateId: 'demande-travaux'
  },

  // TRAVAIL (4)
  {
    id: '19',
    slug: 'lettre-demission',
    categorie: 'Travail',
    sousCategorie: 'Démission',
    acteurType: 'Employeur',
    titre: 'Lettre de Démission',
    description: 'Rédigez votre lettre de démission',
    tags: ['Démission', 'Emploi', 'Travail'],
    niveau: 'Gratuit',
    schemaId: 'lettre-demission',
    templateId: 'lettre-demission',
    legalHintsId: 'lettre-demission'
  },
  {
    id: '20',
    slug: 'demande-attestation',
    categorie: 'Travail',
    sousCategorie: 'Attestation',
    acteurType: 'Employeur',
    titre: 'Demande d\'Attestation',
    description: 'Demandez une attestation à votre employeur',
    tags: ['Attestation', 'Emploi', 'Travail'],
    niveau: 'Gratuit',
    schemaId: 'demande-attestation',
    templateId: 'demande-attestation'
  },
  {
    id: '21',
    slug: 'demande-conges',
    categorie: 'Travail',
    sousCategorie: 'Congés',
    acteurType: 'Employeur',
    titre: 'Demande de Congés',
    description: 'Demandez des congés payés',
    tags: ['Congés', 'Emploi', 'Travail'],
    niveau: 'Gratuit',
    schemaId: 'demande-conges',
    templateId: 'demande-conges'
  },
  {
    id: '22',
    slug: 'contestation-sanction',
    categorie: 'Travail',
    sousCategorie: 'Sanction',
    acteurType: 'Employeur',
    titre: 'Contestation de Sanction',
    description: 'Contestez une sanction disciplinaire',
    tags: ['Sanction', 'Emploi', 'Travail'],
    niveau: 'Gratuit',
    schemaId: 'contestation-sanction',
    templateId: 'contestation-sanction'
  },

  // ADMINISTRATIF (4)
  {
    id: '23',
    slug: 'lettre-recommandee',
    categorie: 'Administratif',
    sousCategorie: 'Recommandé',
    titre: 'Lettre Recommandée',
    description: 'Modèle de lettre recommandée',
    tags: ['Recommandé', 'Administration', 'Modèle'],
    niveau: 'Gratuit',
    schemaId: 'lettre-recommandee',
    templateId: 'lettre-recommandee'
  },
  {
    id: '24',
    slug: 'reclamation',
    categorie: 'Administratif',
    sousCategorie: 'Réclamation',
    acteurType: 'Administration',
    acteurs: ['CAF', 'CPAM', 'URSSAF', 'DGFiP', 'Préfecture', 'Mairie', 'Pôle emploi'],
    titre: 'Réclamation',
    description: 'Rédigez une lettre de réclamation',
    tags: ['Réclamation', 'Litige', 'Administration'],
    niveau: 'Gratuit',
    schemaId: 'reclamation',
    templateId: 'reclamation',
    legalHintsId: 'reclamation'
  },
  {
    id: '25',
    slug: 'droit-acces-rgpd',
    categorie: 'Administratif',
    sousCategorie: 'RGPD',
    titre: 'Droit d\'Accès RGPD',
    description: 'Demande d\'accès à vos données personnelles',
    tags: ['RGPD', 'Données personnelles', 'Administration'],
    niveau: 'Gratuit',
    schemaId: 'droit-acces-rgpd',
    templateId: 'droit-acces-rgpd',
    legalHintsId: 'droit-acces-rgpd'
  },
  {
    id: '26',
    slug: 'demande-renseignements',
    categorie: 'Administratif',
    sousCategorie: 'Renseignements',
    acteurType: 'Administration',
    acteurs: ['CAF', 'CPAM', 'URSSAF', 'DGFiP', 'Préfecture', 'Mairie', 'Pôle emploi'],
    titre: 'Demande de Renseignements',
    description: 'Demandez des informations administratives',
    tags: ['Renseignements', 'Administration', 'Information'],
    niveau: 'Gratuit',
    schemaId: 'demande-renseignements',
    templateId: 'demande-renseignements'
  }
];

export const categories = {
  'Résiliation': { name: 'Résiliation', icon: EnvelopeSimpleOpen, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  'Assurance': { name: 'Assurance', icon: ShieldCheck, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  'Banque': { name: 'Banque', icon: Bank, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  'Logement': { name: 'Logement', icon: House, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  'Travail': { name: 'Travail', icon: Briefcase, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  'Administratif': { name: 'Administratif', icon: FileText, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' }
};

// Fonction utilitaire pour obtenir une formalité par slug
export const getFormaliteBySlug = (slug: string): Formalite | undefined => {
  return CATALOG.find(f => f.slug === slug);
};

// Fonction utilitaire pour filtrer par catégorie
export const getFormalitesByCategory = (categorie: string): Formalite[] => {
  return CATALOG.filter(f => f.categorie === categorie);
};

// Fonction utilitaire pour rechercher dans les formalités
export const searchFormalites = (query: string): Formalite[] => {
  const lowerQuery = query.toLowerCase();
  return CATALOG.filter(f => 
    f.titre.toLowerCase().includes(lowerQuery) ||
    f.description.toLowerCase().includes(lowerQuery) ||
    f.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    f.categorie.toLowerCase().includes(lowerQuery) ||
    (f.sousCategorie && f.sousCategorie.toLowerCase().includes(lowerQuery))
  );
};

