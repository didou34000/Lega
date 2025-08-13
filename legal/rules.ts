// src/legal/rules.ts
export type FieldReq = {
  name: string;                // ex: "operateur", "numeroClient"
  label: string;               // FR end-user
  type: 'text'|'select'|'date'|'radio'|'textarea'|'file';
  required?: boolean | { when: { field: string; equals?: string; in?: string[] } };
  options?: string[];
  placeholder?: string;
  help?: string;
  pattern?: string;            // regex string si besoin
  maxLength?: number;
};

export type ComputeRule = {
  name: string;                // ex: "dateEffet", "dateFinPreavis"
  from: string[];              // champs sources
  fn: string;                  // code string (pure) exécuté côté client (ex: "addDays(values.dateEnvoi, 30)")
  label: string;
  disclaimer?: string;         // "indicatif"
};

export type AttachmentReq = {
  label: string;               // ex: "Justificatif déménagement"
  when?: { field: string; equals?: string; in?: string[] };
  accepted: string[];          // ex: ['.pdf','.jpg']
  required?: boolean;
  help?: string;
};

export type LegalRule = {
  id: string;                  // slug formality
  title: string;
  category: 'Télécom'|'Assurance'|'Logement'|'Banque'|'Énergie'|'Administratif';
  subcategory?: string;        // ex: "Internet", "Mobile", "Habitation"
  ask: FieldReq[];             // champs à poser
  attachments?: AttachmentReq[];
  compute?: ComputeRule[];
  tips?: string[];             // bullets pédagogiques
  destinations?: {             // adresses / liens utiles
    label: string;
    value: string;
  }[];
  sources?: { label: string; url: string }[]; // pour maintenance (non affiché si tu veux)
  disclaimer?: string;         // "Informations indicatives…"
};

// Règles prêtes à l'emploi (TOP 5 familles)

// A) Télécom — Résiliation Internet/Mobile
export const RULE_TELECOM_INTERNET: LegalRule = {
  id: 'resiliation-internet',
  title: 'Résiliation d\'un abonnement Internet',
  category: 'Télécom',
  subcategory: 'Internet',
  ask: [
    { name:'operateur', label:'Opérateur', type:'select', options:['Orange','SFR','Bouygues Telecom','Free','RED by SFR','Sosh','B&You'], required:true },
    { name:'service', label:'Type d\'accès', type:'radio', options:['ADSL','Fibre'], required:true },
    { name:'numeroClient', label:'Numéro client/contrat', type:'text', required:true, help:'Visible sur facture ou espace client' },
    { name:'adresseInstallation', label:'Adresse d\'installation', type:'text', required:true },
    { name:'dateSouscription', label:'Date de souscription', type:'date', required:true },
    { name:'motif', label:'Motif', type:'select',
      options:['Échéance/fin d\'engagement','Loi Chatel (après 12 mois sur 24)','Déménagement','Hausse tarifaire','Motif légitime (licenciement, hospitalisation longue, etc.)'],
      required:true
    },
    { name:'portabilite', label:'Souhaitez-vous garder votre numéro (RIO) ?', type:'radio', options:['Oui','Non'], required:true, help:'Composer 3179 pour obtenir le RIO mobile ; pour fixe, voir espace client' },
    { name:'rio', label:'Code RIO', type:'text', required:{ when:{ field:'portabilite', equals:'Oui' }}, help:'Saisir si portabilité' },
    { name:'dateEnvoi', label:'Date d\'envoi de la demande', type:'date', required:true }
  ],
  attachments: [
    { label:'Justificatif du motif légitime (si choisi)', when:{ field:'motif', equals:'Motif légitime (licenciement, hospitalisation longue, etc.)' }, accepted:['.pdf','.jpg','.png'], required:true },
    { label:'Preuve hausse tarifaire (si choisi)', when:{ field:'motif', equals:'Hausse tarifaire' }, accepted:['.pdf','.jpg'] }
  ],
  compute: [
    { name:'dateEffet', label:'Date d\'effet de résiliation (préavis ≤ 10 j.)', from:['dateEnvoi'], fn:'addDays(values.dateEnvoi, 10)', disclaimer:'Préavis max 10 jours (vous pouvez demander plus)' }
  ],
  tips: [
    'Contrat souscrit en ligne : résiliation possible en ligne (procédure opérateur).',
    'Préavis légal maximum 10 jours après réception par l\'opérateur ; vous pouvez demander un délai plus long.',
    'Portabilité du numéro possible (code RIO).'
  ],
  sources: [
    { label:'Service-public — Résiliation télécom', url:'https://www.service-public.fr/particuliers/vosdroits/F22486' },
    { label:'ARCEP — Résiliation : préavis ≤ 10 jours', url:'https://www.arcep.fr/mes-demarches-et-services/consommateurs/fiches-pratiques/quelles-sont-les-conditions-et-consequences-de-la-resiliation-du-contrat-par-le-consommateur.html' },
    { label:'ARCEP — Portabilité / RIO', url:'https://www.arcep.fr/la-regulation/grands-dossiers-thematiques-transverses/la-numerotation/portabilite-numeros-telephone-fixes-et-mobiles.html' }
  ],
  disclaimer:'Informations indicatives. Vérifiez votre contrat.'
};

export const RULE_TELECOM_MOBILE: LegalRule = {
  ...RULE_TELECOM_INTERNET,
  id:'resiliation-mobile',
  title:'Résiliation d\'un forfait Mobile',
  subcategory:'Mobile',
  ask: [
    { name:'operateur', label:'Opérateur', type:'select', options:['Orange','SFR','Bouygues Telecom','Free','RED by SFR','Sosh','B&You'], required:true },
    { name:'numeroLigne', label:'N° de ligne mobile', type:'text', required:true },
    { name:'rio', label:'Code RIO (si portabilité)', type:'text' },
    { name:'resteEngagement', label:'Mois d\'engagement restants', type:'text', help:'Indication pour estimer d\'éventuels frais' },
    { name:'motif', label:'Motif', type:'select', options:['Échéance','Loi Chatel (24 mois)','Motif légitime','Hausse tarifaire'], required:true },
    { name:'dateEnvoi', label:'Date d\'envoi', type:'date', required:true }
  ]
};

// B) Assurance — Habitation / Auto (Loi Hamon & événements)
export const RULE_ASSURANCE_HABITATION: LegalRule = {
  id:'assurance-habitation-resiliation',
  title:'Résiliation assurance habitation',
  category:'Assurance',
  subcategory:'Habitation',
  ask: [
    { name:'assureur', label:'Assureur', type:'select', options:['MAIF','MACIF','GMF','AXA','Allianz','Groupama','Matmut','Direct Assurance'], required:true },
    { name:'numContrat', label:'N° de contrat', type:'text', required:true },
    { name:'adresseAssuree', label:'Adresse assurée', type:'text', required:true },
    { name:'motif', label:'Motif', type:'select', options:['Loi Hamon (contrat > 12 mois)','Échéance annuelle','Changement de situation (déménagement, mariage, etc.)','Vente du bien','Sinistre/Autre'], required:true },
    { name:'dateEffet', label:'Date d\'effet initiale du contrat', type:'date', required:true },
    { name:'dateEvenement', label:'Date de l\'événement (si changement situation)', type:'date', required:{ when:{ field:'motif', equals:'Changement de situation (déménagement, mariage, etc.)' } } },
    { name:'dateEnvoi', label:'Date d\'envoi', type:'date', required:true }
  ],
  attachments: [
    { label:'Justificatif du changement de situation', when:{ field:'motif', equals:'Changement de situation (déménagement, mariage, etc.)' }, accepted:['.pdf','.jpg'], required:true }
  ],
  compute: [
    { name:'dateEffetResiliation', label:'Prise d\'effet estimée', from:['dateEnvoi','motif'], fn:"motif==='Loi Hamon (contrat > 12 mois)'? addMonths(values.dateEnvoi,0).toISODate(): addMonths(values.dateEnvoi,1).toISODate()", disclaimer:'Sous Hamon (>12 mois), résiliation à tout moment ; sinon en général 1 mois après réception' }
  ],
  tips:[
    'Après 12 mois (Loi Hamon), résiliation possible à tout moment.',
    'En cas de changement de situation : envoyer dans les 3 mois ; effet 1 mois après réception.',
    'Les primes payées d\'avance pour la période non couverte doivent être remboursées.'
  ],
  sources:[
    { label:'Service-public — Assurance habitation : résiliation', url:'https://www.service-public.fr/particuliers/vosdroits/F19083' },
    { label:'Économie.gouv — Habitation/auto/santé : résilier', url:'https://www.economie.gouv.fr/particuliers/emprunter-et-sassurer/assurance-habitation-auto-complementaire-sante-comment-resilier' }
  ],
  disclaimer:'Informations indicatives.'
};

export const RULE_ASSURANCE_AUTO: LegalRule = {
  ...RULE_ASSURANCE_HABITATION,
  id:'assurance-auto-resiliation',
  title:'Résiliation assurance auto',
  subcategory:'Auto',
  ask:[
    { name:'assureur', label:'Assureur', type:'select', options:['MAIF','MACIF','GMF','AXA','Allianz','Groupama','Matmut','Direct Assurance'], required:true },
    { name:'numContrat', label:'N° de contrat', type:'text', required:true },
    { name:'immatriculation', label:'Immatriculation', type:'text', required:true },
    { name:'motif', label:'Motif', type:'select', options:['Loi Hamon (>12 mois)','Échéance','Vente du véhicule','Changement de situation'], required:true },
    { name:'dateCession', label:'Date de cession (si vente)', type:'date', required:{ when:{ field:'motif', equals:'Vente du véhicule' } } },
    { name:'dateEnvoi', label:'Date d\'envoi', type:'date', required:true }
  ],
  attachments:[
    { label:'Certificat de cession (si vente)', when:{ field:'motif', equals:'Vente du véhicule' }, accepted:['.pdf','.jpg'], required:true }
  ]
};

// C) Logement — Préavis (vide/meublé, zone tendue, motifs)
export const RULE_LOGEMENT_PREAVIS: LegalRule = {
  id:'logement-preavis',
  title:'Préavis locataire (vide/meublé)',
  category:'Logement',
  ask: [
    { name:'typeBail', label:'Type de bail', type:'radio', options:['Vide','Meublé'], required:true },
    { name:'villeLogement', label:'Ville du logement', type:'text', required:true, help:'Utile pour zone tendue' },
    { name:'zoneTendue', label:'Le logement est en zone tendue ?', type:'radio', options:['Oui','Non','Je ne sais pas'], required:true, help:'Sinon, proposez un lien simulateur' },
    { name:'motif1Mois', label:'Motif 1 mois (si applicable)', type:'select',
      options:['Zone tendue','Perte d\'emploi','Nouvel emploi lié à perte d\'emploi','Mutation','Santé (certificat)','Bénéficiaire RSA/AAH','Violences (justificatif)','Aucun'],
    },
    { name:'dateEnvoi', label:'Date d\'envoi du congé', type:'date', required:true },
    { name:'dateDebutBail', label:'Date de début du bail', type:'date' }
  ],
  attachments:[
    { label:'Justificatif (santé, RSA/AAH, violences, emploi, mutation)', when:{ field:'motif1Mois', in:['Perte d\'emploi','Nouvel emploi lié à perte d\'emploi','Mutation','Santé (certificat)','Bénéficiaire RSA/AAH','Violences (justificatif)'] }, accepted:['.pdf','.jpg','.png'], required:true }
  ],
  compute:[
    { name:'dureePreavis', label:'Durée de préavis indicative', from:['typeBail','zoneTendue','motif1Mois'], fn:"typeBail==='Meublé'? 1 : ((zoneTendue==='Oui'||motif1Mois!=='Aucun')?1:3)", disclaimer:'Résultats indicatifs selon loi 89-462 et cas particuliers' },
    { name:'dateFinPreavis', label:'Fin de préavis estimée', from:['dateEnvoi','typeBail','zoneTendue','motif1Mois'], fn:"addMonths(values.dateEnvoi, (values.typeBail==='Meublé'||values.zoneTendue==='Oui'||values.motif1Mois!=='Aucun')?1:3).endOfMonthLike()", disclaimer:'Calcul simplifié' }
  ],
  tips:[
    'Meublé : préavis 1 mois (locataire). Vide : 3 mois, sauf zone tendue ou motifs réduisant à 1 mois.',
    'Fournir justificatif pour bénéficier du délai réduit.',
    'Toujours envoyer en LRAR ou remise en main propre contre récépissé.'
  ],
  destinations:[
    { label:'Vérifier zone tendue (simulateur)', value:'https://www.service-public.fr/simulateur/calcul/zones-tendues' }
  ],
  sources:[
    { label:'Service-public — Préavis locataire', url:'https://www.service-public.fr/particuliers/vosdroits/F1168' },
    { label:'Service-public — Simulateur zone tendue', url:'https://www.service-public.fr/simulateur/calcul/zones-tendues' },
    { label:'Loi 89-462 — Art. 15', url:'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042193498/' }
  ]
};

// D) Banque — Clôture + Mobilité bancaire
export const RULE_BANQUE_CLOTURE: LegalRule = {
  id:'banque-cloture',
  title:'Clôture de compte bancaire (particulier)',
  category:'Banque',
  ask: [
    { name:'banque', label:'Banque', type:'select', options:['BNP Paribas','Société Générale','Crédit Agricole','La Banque Postale','LCL','Crédit Mutuel','Hello bank!','Boursorama'], required:true },
    { name:'iban', label:'IBAN du compte à clôturer', type:'text', required:true, pattern:'^([A-Z]{2}\\d{2}[A-Z0-9]{11,30})$' },
    { name:'agence', label:'Agence / Ville', type:'text', required:true },
    { name:'mobilite', label:'Utiliser la mobilité bancaire ?', type:'radio', options:['Oui','Non'], required:true, help:'Pour particuliers, gratuit' },
    { name:'transfertSolde', label:'Transférer le solde vers un IBAN', type:'radio', options:['Oui','Non'], required:true },
    { name:'ibanDestination', label:'IBAN de destination', type:'text', required:{ when:{ field:'transfertSolde', equals:'Oui' } } },
    { name:'dateEnvoi', label:'Date d\'envoi', type:'date', required:true }
  ],
  tips:[
    'La clôture du compte est **gratuite** (hors frais de services jusqu\'à la date de résiliation).',
    'La mobilité bancaire (particuliers) prend en charge la redirection des virements/prélèvements.',
  ],
  sources:[
    { label:'Service-public — Mobilité bancaire', url:'https://www.service-public.fr/particuliers/vosdroits/F33881' },
    { label:'Économie.gouv — Mobilité bancaire (fiches pratiques)', url:'https://www.economie.gouv.fr/cedef/fiches-pratiques/laide-la-mobilite-bancaire' },
    { label:'Service-public — Clôture compte : gratuit', url:'https://www.service-public.fr/particuliers/vosdroits/F31456' }
  ],
  disclaimer:'Informations indicatives.'
};

// E) Énergie — Déménagement / Changement de fournisseur
export const RULE_ENERGIE: LegalRule = {
  id:'energie-demenagement',
  title:'Électricité / Gaz : déménagement ou changement',
  category:'Énergie',
  ask: [
    { name:'typeDmarche', label:'Démarche', type:'radio', options:['Changement de fournisseur (même adresse)','Déménagement (nouvelle adresse)'], required:true },
    { name:'fournisseurActuel', label:'Fournisseur actuel', type:'select', options:['EDF','Engie','TotalEnergies','OHM Énergie','Iberdrola','Ekwateur'], required:true },
    { name:'pdl_prm', label:'PDL/PRM (n° compteur)', type:'text', required:true, help:'Sur facture' },
    { name:'dateChangement', label:'Date souhaitée', type:'date', required:true },
    { name:'releveCompteur', label:'Relevé du compteur (si déménagement)', type:'text', required:{ when:{ field:'typeDmarche', equals:'Déménagement (nouvelle adresse)' } } }
  ],
  tips:[
    'En **changement de fournisseur** : la résiliation de l\'ancien contrat est **automatique** après souscription chez le nouveau.',
    'En **déménagement** : prévenir votre fournisseur et communiquer la date + relevé pour clôturer l\'ancien contrat.',
  ],
  sources:[
    { label:'Service-public — Choisir un fournisseur', url:'https://www.service-public.fr/particuliers/vosdroits/F18116' },
    { label:'Énergie-Info — Démarches déménagement', url:'https://www.energie-info.fr/fiche_pratique/je-demenage-jemmenage-les-demarches-pour-lelectricite-et-le-gaz-naturel/' }
  ]
};

// F) Travail — Lettre de démission
export const RULE_LETTRE_DEMISSION: LegalRule = {
  id:'lettre-demission',
  title:'Lettre de démission professionnelle',
  category:'Administratif',
  subcategory:'Travail',
  ask: [
    { name:'nomPrenom', label:'Nom et prénom', type:'text', required:true, placeholder:'Votre nom et prénom' },
    { name:'adresse', label:'Adresse complète', type:'textarea', required:true, placeholder:'Votre adresse complète' },
    { name:'telephone', label:'Téléphone', type:'text', required:false, placeholder:'Votre numéro de téléphone' },
    { name:'email', label:'Email', type:'text', required:false, placeholder:'Votre adresse email' },
    { name:'poste', label:'Poste occupé', type:'text', required:true, placeholder:'Votre poste actuel' },
    { name:'dateEntree', label:'Date d\'entrée', type:'date', required:true },
    { name:'departement', label:'Département', type:'text', required:false, placeholder:'Votre département' },
    { name:'preavis', label:'Préavis (en semaines)', type:'text', required:true, placeholder:'Durée de votre préavis' },
    { name:'dateDepart', label:'Date de départ souhaitée', type:'date', required:true },
    { name:'motif', label:'Motif de démission', type:'textarea', required:false, placeholder:'Raison de votre démission (optionnel)' }
  ],
  compute: [
    { name:'dateFinPreavis', label:'Date de fin de préavis', from:['dateDepart'], fn:'addWeeks(values.dateDepart, -parseInt(values.preavis))', disclaimer:'Calcul indicatif basé sur votre préavis' }
  ],
  tips:[
    'La démission est un acte unilatéral : vous n\'avez pas besoin de l\'accord de votre employeur.',
    'Le préavis est obligatoire sauf accord de l\'employeur pour un départ anticipé.',
    'Envoyez votre lettre en recommandé avec accusé de réception (LRAR).',
    'Conservez une copie de votre lettre et de l\'accusé de réception.'
  ],
  sources:[
    { label:'Service-public — Démission', url:'https://www.service-public.fr/particuliers/vosdroits/F2348' },
    { label:'Code du travail — Article L1237-1', url:'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900789/' }
  ],
  disclaimer:'Informations indicatives. Consultez votre convention collective pour les spécificités.'
};

// G) Opposition carte bancaire
export const RULE_OPPOSITION_CARTE: LegalRule = {
  id: 'opposition-carte-bancaire',
  title: 'Opposition carte bancaire',
  category: 'Banque',
  subcategory: 'Carte',
  ask: [
    { name: 'banque', label: 'Nom de la banque', type: 'text', required: true, placeholder: 'Nom de votre banque' },
    { name: 'typeCarte', label: 'Type de carte', type: 'select', options: ['Visa', 'Mastercard', 'American Express', 'Autre'], required: true },
    { name: 'numeroTronque', label: '4 derniers chiffres', type: 'text', required: true, placeholder: '4 derniers chiffres de votre carte', maxLength: 4 },
    { name: 'motif', label: 'Motif de l\'opposition', type: 'select', options: ['Perte', 'Vol', 'Fraude', 'Autre'], required: true },
    { name: 'dateIncident', label: 'Date de l\'incident', type: 'date', required: true },
    { name: 'lieuIncident', label: 'Lieu de l\'incident', type: 'text', required: false, placeholder: 'Lieu où l\'incident s\'est produit' }
  ],
  attachments: [
    { label: 'Déclaration de perte/vol', accepted: ['.pdf', '.jpg', '.png'], required: false, help: 'Si disponible' }
  ],
  compute: [
    { name: 'dateEffet', label: 'Prise d\'effet', from: ['dateIncident'], fn: 'addDays(values.dateIncident, 0)', disclaimer: 'Opposition immédiate' }
  ],
  tips: [
    'Opposition immédiate par téléphone (24h/24, 7j/7)',
    'Confirmation écrite obligatoire dans les 48h',
    'Conservez le numéro de déclaration',
    'Vérifiez que l\'opposition est bien enregistrée'
  ],
  destinations: [
    { label: 'Centre d\'opposition', value: 'Voir numéro au dos de votre carte ou sur votre relevé bancaire' }
  ],
  sources: [
    { label: 'Service-public — Opposition carte bancaire', url: 'https://www.service-public.fr/particuliers/vosdroits/F31456' },
    { label: 'Économie.gouv — Sécurité des moyens de paiement', url: 'https://www.economie.gouv.fr/particuliers/securite-moyens-paiement' }
  ],
  disclaimer: 'Informations indicatives. Contactez immédiatement votre banque en cas de perte ou vol.'
};

// H) Résiliation salle de sport
export const RULE_SALLE_SPORT: LegalRule = {
  id: 'resiliation-salle-sport',
  title: 'Résiliation abonnement salle de sport',
  category: 'Administratif',
  subcategory: 'Sport',
  ask: [
    { name: 'nomSalle', label: 'Nom de la salle', type: 'text', required: true, placeholder: 'Nom de votre salle de sport' },
    { name: 'adresseSalle', label: 'Adresse de la salle', type: 'textarea', required: true, placeholder: 'Adresse complète de la salle' },
    { name: 'numeroClient', label: 'Numéro client', type: 'text', required: true, placeholder: 'Votre numéro client' },
    { name: 'dateAdhesion', label: 'Date d\'adhésion', type: 'date', required: true },
    { name: 'motif', label: 'Motif de résiliation', type: 'select', options: ['Fin d\'engagement', 'Déménagement', 'Problème de santé', 'Autre'], required: true },
    { name: 'dateEnvoi', label: 'Date d\'envoi', type: 'date', required: true }
  ],
  attachments: [
    { label: 'Certificat médical', when: { field: 'motif', equals: 'Problème de santé' }, accepted: ['.pdf', '.jpg'], required: true },
    { label: 'Justificatif de déménagement', when: { field: 'motif', equals: 'Déménagement' }, accepted: ['.pdf', '.jpg'], required: true }
  ],
  compute: [
    { name: 'preavisContractuel', label: 'Préavis contractuel', from: ['dateAdhesion'], fn: 'Vérifiez votre contrat pour la durée exacte', disclaimer: 'Durée selon votre contrat' }
  ],
  tips: [
    'Vérifiez la durée d\'engagement initiale dans votre contrat',
    'Envoi recommandé avec accusé de réception',
    'Conservez une copie de votre lettre',
    'Vérifiez les modalités de remboursement'
  ],
  sources: [
    { label: 'Service-public — Résiliation contrat', url: 'https://www.service-public.fr/particuliers/vosdroits/F22486' },
    { label: 'Économie.gouv — Résiliation contrats', url: 'https://www.economie.gouv.fr/particuliers/resilier-contrat' }
  ],
  disclaimer: 'Informations indicatives. Vérifiez les conditions de votre contrat.'
};

// I) Résiliation assurance santé
export const RULE_ASSURANCE_SANTE: LegalRule = {
  id: 'resiliation-assurance-sante',
  title: 'Résiliation assurance santé',
  category: 'Assurance',
  subcategory: 'Santé',
  ask: [
    { name: 'assureur', label: 'Assureur', type: 'select', options: ['MAIF', 'MACIF', 'AXA', 'Allianz', 'Groupama', 'Autre'], required: true },
    { name: 'numContrat', label: 'Numéro de contrat', type: 'text', required: true, placeholder: 'Numéro de votre contrat' },
    { name: 'motif', label: 'Motif de résiliation', type: 'select', options: ['Loi Hamon (>12 mois)', 'Échéance', 'Adhésion mutuelle entreprise', 'Autre'], required: true },
    { name: 'dateEffet', label: 'Date d\'effet initiale', type: 'date', required: true },
    { name: 'dateEnvoi', label: 'Date d\'envoi', type: 'date', required: true }
  ],
  attachments: [
    { label: 'Attestation employeur', when: { field: 'motif', equals: 'Adhésion mutuelle entreprise' }, accepted: ['.pdf', '.jpg'], required: true, help: 'Si adhésion obligatoire' }
  ],
  compute: [
    { name: 'dateEffetResiliation', label: 'Prise d\'effet estimée', from: ['motif', 'dateEnvoi'], fn: "motif==='Loi Hamon (>12 mois)'||motif==='Adhésion mutuelle entreprise' ? addDays(values.dateEnvoi,0) : addMonths(values.dateEnvoi,1)", disclaimer: 'Hamon/obligatoire : immédiat, sinon 1 mois' }
  ],
  tips: [
    'Après 12 mois (Loi Hamon), résiliation possible à tout moment',
    'Mutuelle obligatoire : résiliation immédiate lors de l\'adhésion',
    'Conservez l\'accusé de réception',
    'Vérifiez les modalités de remboursement'
  ],
  sources: [
    { label: 'Service-public — Assurance santé : résiliation', url: 'https://www.service-public.fr/particuliers/vosdroits/F19083' },
    { label: 'Économie.gouv — Résiliation assurance santé', url: 'https://www.economie.gouv.fr/particuliers/emprunter-et-sassurer/assurance-habitation-auto-complementaire-sante-comment-resilier' }
  ],
  disclaimer: 'Informations indicatives. Vérifiez votre contrat et la réglementation.'
};

// J) Demande de prêt bancaire
export const RULE_DEMANDE_PRET: LegalRule = {
  id: 'demande-pret-bancaire',
  title: 'Demande de prêt bancaire',
  category: 'Banque',
  subcategory: 'Prêt',
  ask: [
    { name: 'banque', label: 'Banque', type: 'text', required: true, placeholder: 'Nom de votre banque' },
    { name: 'montant', label: 'Montant demandé', type: 'text', required: true, placeholder: 'Montant du prêt en euros' },
    { name: 'typePret', label: 'Type de prêt', type: 'select', options: ['Immobilier', 'Consommation', 'Automobile', 'Travaux', 'Autre'], required: true },
    { name: 'duree', label: 'Durée souhaitée', type: 'text', required: true, placeholder: 'Durée en années' },
    { name: 'tauxSouhaite', label: 'Taux souhaité', type: 'text', required: false, placeholder: 'Taux annuel souhaité (%)' },
    { name: 'revenusMensuels', label: 'Revenus mensuels', type: 'text', required: true, placeholder: 'Revenus nets mensuels' },
    { name: 'chargesMensuelles', label: 'Charges mensuelles', type: 'text', required: true, placeholder: 'Charges fixes mensuelles' }
  ],
  attachments: [
    { label: 'Bulletins de salaire (3 derniers)', accepted: ['.pdf', '.jpg'], required: true },
    { label: 'Avis d\'imposition', accepted: ['.pdf', '.jpg'], required: true },
    { label: 'Relevés bancaires (3 derniers)', accepted: ['.pdf'], required: true }
  ],
  compute: [
    { name: 'mensualiteIndicative', label: 'Mensualité indicative', from: ['montant', 'duree'], fn: 'Calcul indicatif : montant / (durée * 12)', disclaimer: 'Calcul approximatif, taux à négocier' }
  ],
  tips: [
    'Préparez tous vos justificatifs avant la demande',
    'Comparez les offres de plusieurs banques',
    'Négociez le taux et les frais de dossier',
    'Vérifiez votre capacité de remboursement'
  ],
  sources: [
    { label: 'Service-public — Crédit immobilier', url: 'https://www.service-public.fr/particuliers/vosdroits/F18116' },
    { label: 'Économie.gouv — Crédit à la consommation', url: 'https://www.economie.gouv.fr/particuliers/credit-consommation' }
  ],
  disclaimer: 'Informations indicatives. Les conditions de prêt dépendent de votre profil et de la banque.'
};

// K) Demande de congés
export const RULE_DEMANDE_CONGES: LegalRule = {
  id: 'demande-conges',
  title: 'Demande de congés payés',
  category: 'Administratif',
  subcategory: 'Congés',
  ask: [
    { name: 'employeur', label: 'Nom de l\'employeur', type: 'text', required: true, placeholder: 'Nom de votre entreprise' },
    { name: 'service', label: 'Service/Département', type: 'text', required: false, placeholder: 'Votre service' },
    { name: 'nomSalarie', label: 'Nom et prénom', type: 'text', required: true, placeholder: 'Votre nom et prénom' },
    { name: 'dateDebut', label: 'Date de début', type: 'date', required: true },
    { name: 'dateFin', label: 'Date de fin', type: 'date', required: true },
    { name: 'typeConge', label: 'Type de congé', type: 'select', options: ['Payés', 'Sans solde', 'RTT', 'Exceptionnel', 'Autre'], required: true },
    { name: 'motif', label: 'Motif (si exceptionnel)', type: 'textarea', required: false, placeholder: 'Motif du congé exceptionnel' }
  ],
  attachments: [
    { label: 'Certificat médical', when: { field: 'typeConge', equals: 'Exceptionnel' }, accepted: ['.pdf', '.jpg'], required: true },
    { label: 'Document justificatif', when: { field: 'typeConge', equals: 'Exceptionnel' }, accepted: ['.pdf', '.jpg'], required: false, help: 'Si congé exceptionnel' }
  ],
  compute: [
    { name: 'dureeConge', label: 'Durée en jours ouvrés', from: ['dateDebut', 'dateFin'], fn: 'Calcul des jours ouvrés entre les deux dates', disclaimer: 'Calcul indicatif, hors weekends' }
  ],
  tips: [
    'Demande à faire au moins 1 mois à l\'avance',
    'Vérifiez votre solde de congés',
    'Conservez une copie de votre demande',
    'Respectez les délais de votre convention collective'
  ],
  sources: [
    { label: 'Service-public — Congés payés', url: 'https://www.service-public.fr/particuliers/vosdroits/F2348' },
    { label: 'Code du travail — Congés payés', url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900789/' }
  ],
  disclaimer: 'Informations indicatives. Consultez votre convention collective pour les spécificités.'
};

// L) Préavis de départ (variante simplifiée)
export const RULE_PREAVIS_DEPART: LegalRule = {
  id: 'preavis-depart',
  title: 'Préavis de départ locataire',
  category: 'Logement',
  subcategory: 'Préavis',
  ask: [
    { name: 'typeBail', label: 'Type de bail', type: 'radio', options: ['Vide', 'Meublé'], required: true },
    { name: 'dateEnvoi', label: 'Date d\'envoi du congé', type: 'date', required: true },
    { name: 'dateDebutBail', label: 'Date de début du bail', type: 'date', required: false },
    { name: 'motifReduction', label: 'Motif de réduction préavis', type: 'select', options: ['Zone tendue', 'Perte d\'emploi', 'Nouvel emploi', 'Santé', 'Aucun'], required: false }
  ],
  compute: [
    { name: 'dureePreavis', label: 'Durée de préavis', from: ['typeBail', 'motifReduction'], fn: "typeBail==='Meublé' ? 1 : (motifReduction!=='Aucun' ? 1 : 3)", disclaimer: 'Résultats indicatifs selon la loi' },
    { name: 'dateFinPreavis', label: 'Fin de préavis estimée', from: ['dateEnvoi', 'typeBail', 'motifReduction'], fn: "addMonths(values.dateEnvoi, (values.typeBail==='Meublé'||values.motifReduction!=='Aucun') ? 1 : 3)", disclaimer: 'Calcul simplifié' }
  ],
  tips: [
    'Meublé : préavis 1 mois (locataire)',
    'Vide : 3 mois sauf motifs réduisant à 1 mois',
    'Fournir justificatif pour bénéficier du délai réduit',
    'Toujours envoyer en LRAR'
  ],
  sources: [
    { label: 'Service-public — Préavis locataire', url: 'https://www.service-public.fr/particuliers/vosdroits/F1168' },
    { label: 'Loi 89-462 — Art. 15', url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042193498/' }
  ],
  disclaimer: 'Informations indicatives selon la loi 89-462 et cas particuliers.'
};

// M) Contestation état des lieux
export const RULE_CONTESTATION_EDL: LegalRule = {
  id: 'contestation-edl',
  title: 'Contestation état des lieux',
  category: 'Logement',
  subcategory: 'État des lieux',
  ask: [
    { name: 'bailleur', label: 'Nom du bailleur', type: 'text', required: true, placeholder: 'Nom de votre propriétaire' },
    { name: 'adresseLogement', label: 'Adresse du logement', type: 'textarea', required: true, placeholder: 'Adresse complète du logement' },
    { name: 'dateEDL', label: 'Date de l\'état des lieux', type: 'date', required: true },
    { name: 'pointsContestes', label: 'Points contestés', type: 'textarea', required: true, placeholder: 'Détail des points que vous contestez' }
  ],
  attachments: [
    { label: 'Photos des points contestés', accepted: ['.jpg', '.png', '.pdf'], required: true, help: 'Photos datées des dégâts/points contestés' }
  ],
  compute: [
    { name: 'delaiDepuisEDL', label: 'Délai depuis EDL', from: ['dateEDL'], fn: 'Calcul du nombre de jours depuis l\'EDL', disclaimer: 'Délai indicatif' },
    { name: 'dansDelai10Jours', label: 'Dans le délai de 10 jours', from: ['dateEDL'], fn: 'Vérifier si dans les 10 jours suivant l\'EDL', disclaimer: 'Délai légal de contestation' }
  ],
  tips: [
    'Contestation à faire dans les 10 jours suivant l\'EDL',
    'Joindre des photos datées des points contestés',
    'Envoi recommandé avec accusé de réception',
    'Conservez une copie de votre contestation'
  ],
  sources: [
    { label: 'Service-public — État des lieux', url: 'https://www.service-public.fr/particuliers/vosdroits/F1168' },
    { label: 'Code civil — État des lieux', url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900789/' }
  ],
  disclaimer: 'Informations indicatives. Consultez un avocat si nécessaire.'
};

// N) Demande RGPD
export const RULE_DEMANDE_RGPD: LegalRule = {
  id: 'demande-rgpd',
  title: 'Demande d\'accès aux données personnelles (RGPD)',
  category: 'Administratif',
  subcategory: 'RGPD',
  ask: [
    { name: 'destinataire', label: 'Destinataire', type: 'text', required: true, placeholder: 'Nom de l\'entreprise/organisation' },
    { name: 'typeDonnees', label: 'Type de données demandées', type: 'select', options: ['Accès aux données', 'Rectification', 'Effacement', 'Portabilité', 'Limitation du traitement'], required: true },
    { name: 'dateDemande', label: 'Date de la demande', type: 'date', required: true }
  ],
  attachments: [
    { label: 'Pièce d\'identité', accepted: ['.pdf', '.jpg'], required: true, help: 'Copie de votre pièce d\'identité' }
  ],
  compute: [
    { name: 'delaiReponse', label: 'Délai de réponse', from: ['dateDemande'], fn: 'addMonths(values.dateDemande, 1)', disclaimer: 'Délai légal de 1 mois' }
  ],
  tips: [
    'Délai de réponse légal : 1 mois',
    'Pièce d\'identité obligatoire pour vérification',
    'Conservez une copie de votre demande',
    'En cas de refus, vous pouvez saisir la CNIL'
  ],
  sources: [
    { label: 'CNIL — Vos droits RGPD', url: 'https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees' },
    { label: 'Service-public — Protection des données', url: 'https://www.service-public.fr/particuliers/vosdroits/F2348' }
  ],
  disclaimer: 'Informations indicatives selon le RGPD. La CNIL peut vous aider en cas de difficulté.'
};

// O) Réclamation administrative
export const RULE_RECLAMATION_ADMIN: LegalRule = {
  id: 'reclamation-administration',
  title: 'Réclamation administrative',
  category: 'Administratif',
  subcategory: 'Réclamation',
  ask: [
    { name: 'service', label: 'Service concerné', type: 'select', options: ['CAF', 'CPAM', 'URSSAF', 'DGFiP', 'Pôle Emploi', 'Autre'], required: true },
    { name: 'numeroDossier', label: 'Numéro de dossier', type: 'text', required: false, placeholder: 'Votre numéro de dossier' },
    { name: 'objet', label: 'Objet de la réclamation', type: 'text', required: true, placeholder: 'Objet de votre réclamation' },
    { name: 'expose', label: 'Exposé des faits', type: 'textarea', required: true, placeholder: 'Détail de votre réclamation' }
  ],
  compute: [
    { name: 'delaiTraitement', label: 'Délai de traitement moyen', from: ['service'], fn: 'Délai indicatif selon le service', disclaimer: 'Délai indicatif, peut varier' }
  ],
  tips: [
    'Joignez tous les documents justificatifs',
    'Conservez une copie de votre réclamation',
    'Notez le numéro de suivi si fourni',
    'En cas d\'absence de réponse, vous pouvez saisir le médiateur'
  ],
  sources: [
    { label: 'Service-public — Réclamation administrative', url: 'https://www.service-public.fr/particuliers/vosdroits/F2348' },
    { label: 'Médiateur de la République', url: 'https://www.mediateur-republique.fr/' }
  ],
  disclaimer: 'Informations indicatives. Les délais de traitement peuvent varier selon les services.'
};

// Export de toutes les règles
export const ALL_LEGAL_RULES: LegalRule[] = [
  RULE_TELECOM_INTERNET,
  RULE_TELECOM_MOBILE,
  RULE_ASSURANCE_HABITATION,
  RULE_ASSURANCE_AUTO,
  RULE_LOGEMENT_PREAVIS,
  RULE_BANQUE_CLOTURE,
  RULE_ENERGIE,
  RULE_LETTRE_DEMISSION,
  RULE_OPPOSITION_CARTE,
  RULE_SALLE_SPORT,
  RULE_ASSURANCE_SANTE,
  RULE_DEMANDE_PRET,
  RULE_DEMANDE_CONGES,
  RULE_PREAVIS_DEPART,
  RULE_CONTESTATION_EDL,
  RULE_DEMANDE_RGPD,
  RULE_RECLAMATION_ADMIN
];

// Fonction pour trouver une règle par ID
export const findLegalRule = (ruleId: string): LegalRule | undefined => {
  return ALL_LEGAL_RULES.find(rule => rule.id === ruleId);
};

// Fonction pour obtenir toutes les règles
export const getAllLegalRules = (): LegalRule[] => {
  return ALL_LEGAL_RULES;
};

// Fonction pour obtenir les règles par catégorie
export const getLegalRulesByCategory = (category: LegalRule['category']): LegalRule[] => {
  return ALL_LEGAL_RULES.filter(rule => rule.category === category);
};
