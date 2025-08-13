export const legalHints = {
  'resiliation-internet': {
    title: 'Informations légales - Résiliation Internet',
    bullets: [
      'La loi Chatel permet de résilier sans frais après 12 mois d\'engagement',
      'Le préavis est généralement de 30 jours',
      'Vous devez restituer le matériel fourni par l\'opérateur',
      'La portabilité du numéro fixe est gratuite'
    ],
    disclaimer: 'Ces informations sont données à titre indicatif. Vérifiez vos conditions contractuelles.'
  },

  'resiliation-telephonie': {
    title: 'Informations légales - Résiliation Mobile',
    bullets: [
      'Le code RIO est obligatoire pour la portabilité du numéro',
      'La loi Chatel s\'applique également aux forfaits mobiles',
      'Vérifiez la durée d\'engagement restante',
      'Conservez votre numéro en demandant la portabilité'
    ],
    disclaimer: 'Ces informations sont données à titre indicatif. Vérifiez vos conditions contractuelles.'
  },

  'resiliation-assurance-habitation': {
    title: 'Informations légales - Résiliation Assurance',
    bullets: [
      'La loi Hamon permet de changer d\'assureur à chaque échéance',
      'Le délai de préavis est généralement de 2 mois',
      'Vous devez justifier d\'une nouvelle assurance',
      'Conservez une attestation de résiliation'
    ],
    disclaimer: 'Ces informations sont données à titre indicatif. Vérifiez vos conditions contractuelles.'
  },

  'cloture-compte': {
    title: 'Informations légales - Clôture de Compte',
    bullets: [
      'La clôture est gratuite et sans condition',
      'Vérifiez qu\'aucun prélèvement n\'est en cours',
      'Restituez carte bancaire et chéquier',
      'Conservez les relevés bancaires'
    ],
    disclaimer: 'Ces informations sont données à titre indicatif. Vérifiez vos conditions contractuelles.'
  },

  'preavis-location': {
    title: 'Informations légales - Préavis Location',
    bullets: [
      'Préavis : 3 mois pour un logement vide, 1 mois pour un meublé',
      'Réduit à 1 mois en zone tendue',
      'Lettre recommandée avec accusé de réception',
      'État des lieux obligatoire à la sortie'
    ],
    disclaimer: 'Ces informations sont données à titre indicatif. Vérifiez vos conditions contractuelles.'
  },

  'lettre-demission': {
    title: 'Informations légales - Démission',
    bullets: [
      'La démission est un acte unilatéral',
      'Respectez le préavis contractuel',
      'Demandez un certificat de travail',
      'Conservez une copie de votre lettre'
    ],
    disclaimer: 'Ces informations sont données à titre indicatif. Vérifiez vos conditions contractuelles.'
  },

  'droit-acces-rgpd': {
    title: 'Informations légales - RGPD',
    bullets: [
      'Délai de réponse : 1 mois maximum',
      'Gratuit sauf demande excessive',
      'Vous pouvez saisir la CNIL en cas de refus',
      'Conservez une trace de votre demande'
    ],
    disclaimer: 'Ces informations sont données à titre indicatif. Vérifiez la réglementation applicable.'
  },

  'reclamation': {
    title: 'Informations légales - Réclamation',
    bullets: [
      'Conservez tous les documents justificatifs',
      'Numérotez vos courriers',
      'Envoyez en recommandé avec AR',
      'Vous pouvez saisir le médiateur'
    ],
    disclaimer: 'Ces informations sont données à titre indicatif. Vérifiez la procédure applicable.'
  }
};

export type LegalHintId = keyof typeof legalHints;

