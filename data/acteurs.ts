export const OPERATEURS = [
  'Orange',
  'SFR', 
  'Bouygues Telecom',
  'Free',
  'RED by SFR',
  'Sosh',
  'B&You'
];

export const ASSUREURS = [
  'MAIF',
  'MACIF', 
  'GMF',
  'AXA',
  'Allianz',
  'Groupama',
  'Matmut',
  'Direct Assurance'
];

export const BANQUES = [
  'BNP Paribas',
  'Société Générale',
  'Crédit Agricole',
  'La Banque Postale',
  'LCL',
  'Crédit Mutuel',
  'Hello bank!',
  'Boursorama'
];

export const ENERGIE = [
  'EDF',
  'Engie',
  'TotalEnergies',
  'OHM Énergie',
  'Iberdrola',
  'Ekwateur'
];

export const BAILLEURS_TYPE = [
  'Bailleur privé',
  'Agence immobilière',
  'Bailleur social'
];

export const ADMIN_SERVICES = [
  'CAF',
  'CPAM',
  'URSSAF',
  'DGFiP',
  'Préfecture',
  'Mairie',
  'Pôle emploi'
];

// Adresses destinataires mock par acteur
export const ACTOR_ADDRESSES: Record<string, string> = {
  'SFR': 'TSA 73917, 62978 Arras Cedex 9',
  'Free': 'Free – Service Résiliation, 75371 Paris Cedex 08',
  'Orange': 'Orange – Service Résiliation, 75015 Paris',
  'Bouygues Telecom': 'Bouygues Telecom – Service Client, 92000 Nanterre',
  'EDF': 'EDF – Service Client, 75008 Paris',
  'Engie': 'Engie – Service Client, 92400 Courbevoie',
  'AXA': 'AXA France – Service Client, 75008 Paris',
  'MAIF': 'MAIF – Service Client, 79000 Niort',
  'BNP Paribas': 'BNP Paribas – Service Client, 75009 Paris',
  'Crédit Agricole': 'Crédit Agricole – Service Client, 75001 Paris'
};

// Types pour TypeScript
export type Operateur = typeof OPERATEURS[number];
export type Assureur = typeof ASSUREURS[number];
export type Banque = typeof BANQUES[number];
export type FournisseurEnergie = typeof ENERGIE[number];
export type TypeBailleur = typeof BAILLEURS_TYPE[number];
export type ServiceAdmin = typeof ADMIN_SERVICES[number];

export type ActorType = 'Operateur' | 'Assureur' | 'Banque' | 'FournisseurEnergie' | 'Bailleur' | 'Employeur' | 'Administration';

