export const templates = {
  'resiliation-internet': `# Lettre de résiliation - Fournisseur Internet

**{{nom}} {{prenom}}**  
{{adresse}}  
{{codePostal}} {{ville}}  
{{telephone}}  
{{email}}

**{{operateur}}**  
{{adresseDest}}  
{{dateEnvoi}}

**Objet : Résiliation de mon abonnement internet**

Madame, Monsieur,

Par la présente, je vous informe de ma décision de résilier mon abonnement internet souscrit le {{dateSouscription}} pour l'offre {{offre}} installée à l'adresse suivante : {{adresseInstallation}}.

**Motif de résiliation :** {{motif}}

{{#if motif === 'loi_chatel'}}
Conformément à la loi Chatel, je vous informe que mon engagement initial était {{engagementInitial}} à 12 mois.
{{/if}}

**Numéro de client :** {{numeroClient}}

**Conservation du numéro :** {{portabilite}}

Je vous prie de bien vouloir procéder à la résiliation de mon abonnement à compter de la réception de cette lettre.

Je vous remercie de me confirmer la bonne réception de cette demande et de m'indiquer la date effective de résiliation ainsi que les modalités de restitution du matériel si nécessaire.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

{{nom}} {{prenom}}`,

  'resiliation-telephonie': `# Lettre de résiliation - Téléphonie Mobile

**{{nom}} {{prenom}}**  
{{adresse}}  
{{codePostal}} {{ville}}  
{{telephone}}  
{{email}}

**{{operateur}}**  
{{adresseDest}}  
{{dateEnvoi}}

**Objet : Résiliation de mon forfait mobile**

Madame, Monsieur,

Par la présente, je vous informe de ma décision de résilier mon forfait mobile souscrit le {{dateSouscription}} pour le numéro {{numeroLigne}}.

**Motif de résiliation :** {{motif}}

**Numéro de client :** {{numeroClient}}

**Reste d'engagement :** {{resteEngagement}} mois

{{#if rio}}
**Code RIO :** {{rio}}
{{/if}}

Je vous prie de bien vouloir procéder à la résiliation de mon forfait à compter de la réception de cette lettre.

Je vous remercie de me confirmer la bonne réception de cette demande et de m'indiquer la date effective de résiliation.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

{{nom}} {{prenom}}`,

  'resiliation-assurance-habitation': `# Lettre de résiliation - Assurance Habitation

**{{nom}} {{prenom}}**  
{{adresse}}  
{{codePostal}} {{ville}}  
{{telephone}}  
{{email}}

**{{assureur}}**  
{{adresseAssureur}}  
{{dateEnvoi}}

**Objet : Résiliation de mon contrat d'assurance habitation**

Madame, Monsieur,

Par la présente, je vous informe de ma décision de résilier mon contrat d'assurance habitation n° {{numContrat}} pour l'adresse suivante : {{adresseAssuree}}.

**Formule actuelle :** {{formule}}

**Motif de résiliation :** {{motif}}

**Date d'effet souhaitée :** {{dateEffet}}

**Date d'échéance actuelle :** {{dateEcheance}}

{{#if loiHamonApplicable}}
Conformément à la loi Hamon, je vous informe de ma décision de résilier ce contrat.
{{/if}}

Je vous prie de bien vouloir procéder à la résiliation de mon contrat à compter de la date d'effet souhaitée.

Je vous remercie de me confirmer la bonne réception de cette demande et de m'indiquer la date effective de résiliation ainsi que les modalités de remboursement des primes payées d'avance.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

{{nom}} {{prenom}}`,

  'cloture-compte': `# Lettre de clôture de compte bancaire

**{{nom}} {{prenom}}**  
{{adresse}}  
{{codePostal}} {{ville}}  
{{telephone}}  
{{email}}

**{{banque}}**  
Agence {{agence}}  
{{ville}}  
{{dateEnvoi}}

**Objet : Demande de clôture de mon compte bancaire**

Madame, Monsieur,

Par la présente, je vous informe de ma décision de fermer mon compte bancaire détenu dans votre agence.

**IBAN du compte :** {{iban}}

**Raison de la clôture :** {{raison}}

{{#if transfertSolde === 'Oui'}}
**Transfert du solde :** Je souhaite que le solde restant soit transféré vers le compte suivant : {{ibanDestination}}
{{/if}}

Je vous prie de bien vouloir procéder à la clôture de mon compte dans les plus brefs délais.

Je vous remercie de me confirmer la bonne réception de cette demande et de m'indiquer la date effective de clôture ainsi que les modalités de restitution de ma carte bancaire et de mon chéquier.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

{{nom}} {{prenom}}`,

  'preavis-location': `# Lettre de préavis de résiliation de bail

**{{nom}} {{prenom}}**  
{{adresse}}  
{{codePostal}} {{ville}}  
{{telephone}}  
{{email}}

**{{bailleurType}}**  
{{bailleurNom}}  
{{adresseLogement}}  
{{dateEnvoi}}

**Objet : Préavis de résiliation de mon bail**

Madame, Monsieur,

Par la présente, je vous informe de ma décision de résilier le bail de location concernant le logement situé à l'adresse suivante : {{adresseLogement}}.

**Type de bail :** {{typeBail}}

**Date de début de bail :** {{dateDebutBail}}

**Motif de résiliation :** {{motif}}

**Durée du préavis :** {{dureePreavis}} mois

**Date de fin de préavis :** {{dateFinPreavis}}

{{#if zoneTendue}}
Conformément à la réglementation en vigueur, le préavis est réduit à 1 mois en zone tendue.
{{/if}}

Je vous prie de bien vouloir procéder à la résiliation de mon bail à compter de la date de fin de préavis.

Je vous remercie de me confirmer la bonne réception de cette demande et de m'indiquer les modalités de l'état des lieux de sortie.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

{{nom}} {{prenom}}`,

  'lettre-demission': `# Lettre de démission

**{{nom}} {{prenom}}**  
{{adresse}}  
{{codePostal}} {{ville}}  
{{telephone}}  
{{email}}

**{{employeurNom}}**  
{{societeAdresse}}  
{{dateEnvoi}}

**Objet : Lettre de démission**

Madame, Monsieur,

Par la présente, je vous informe de ma décision de démissionner de mon poste de {{poste}} au sein de votre entreprise.

**Date d'entrée dans l'entreprise :** {{dateEntree}}

**Préavis :** {{preavisSemaines}} semaines

**Date de fin de préavis :** {{dateFinPreavis}}

Je vous prie de bien vouloir procéder aux démarches administratives nécessaires à ma sortie de l'entreprise.

Je vous remercie de me confirmer la bonne réception de cette demande et de m'indiquer les modalités de mon départ ainsi que les documents que je dois fournir.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

{{nom}} {{prenom}}`,

  'droit-acces-rgpd': `# Demande d'accès aux données personnelles (RGPD)

**{{nom}} {{prenom}}**  
{{adresse}}  
{{codePostal}} {{ville}}  
{{telephone}}  
{{email}}

**{{destinataire}}**  
{{#if dpoEmail}}DPO : {{dpoEmail}}{{/if}}  
{{dateEnvoi}}

**Objet : Demande d'accès aux données personnelles**

Madame, Monsieur,

Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, je vous prie de bien vouloir me communiquer les informations suivantes :

**Type de données demandées :** {{typeDonnees}}

Cette demande s'inscrit dans le cadre de l'exercice de mon droit d'accès aux données personnelles me concernant, tel que prévu par l'article 15 du RGPD.

Je vous remercie de me fournir ces informations dans un délai d'un mois à compter de la réception de cette demande.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

{{nom}} {{prenom}}`,

  'reclamation': `# Lettre de réclamation

**{{nom}} {{prenom}}**  
{{adresse}}  
{{codePostal}} {{ville}}  
{{telephone}}  
{{email}}

**{{service}}**  
{{dateEnvoi}}

**Objet : {{objet}}**

**Numéro de dossier :** {{numeroDossier}}

Madame, Monsieur,

Par la présente, je vous expose ma réclamation concernant le dossier mentionné ci-dessus.

**Exposé de la réclamation :**

{{expose}}

Je vous remercie de bien vouloir examiner cette réclamation et de me faire part de votre réponse dans les plus brefs délais.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

{{nom}} {{prenom}}`
};

export type TemplateId = keyof typeof templates;

