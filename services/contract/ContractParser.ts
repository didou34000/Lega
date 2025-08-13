export type RawExtraction = { 
  text: string; 
  metadata: { 
    filename: string; 
    size: number; 
    type: string; 
    pages?: number 
  } 
};

export interface ContractParser { 
  parse(file: File): Promise<RawExtraction>; 
}

export class MockContractParser implements ContractParser {
  async parse(file: File): Promise<RawExtraction> {
    // Simule un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const filename = file.name.toLowerCase();
    
    // Détection basée sur le nom de fichier
    if (filename.includes('sfr') || filename.includes('orange') || filename.includes('free')) {
      return this.generateTelecomContract(file);
    } else if (filename.includes('axa') || filename.includes('maif') || filename.includes('macif')) {
      return this.generateInsuranceContract(file);
    } else if (filename.includes('bnp') || filename.includes('credit') || filename.includes('societe')) {
      return this.generateBankContract(file);
    } else if (filename.includes('edf') || filename.includes('engie') || filename.includes('energie')) {
      return this.generateEnergyContract(file);
    } else {
      return this.generateGenericContract(file);
    }
  }

  private generateTelecomContract(file: File): RawExtraction {
    return {
      text: `CONTRAT D'ABONNEMENT INTERNET ET TÉLÉPHONIE

Opérateur: SFR
Numéro de client: CL123456789
Type d'offre: Fibre optique
Adresse d'installation: 123 Rue de la Paix, 75001 Paris
Date de souscription: 15/01/2023
Engagement initial: 24 mois
Prix mensuel: 29,99€

Conditions générales:
- Préavis de résiliation: 30 jours
- Frais de résiliation anticipée: 50€
- Portabilité du numéro fixe incluse
- Matériel fourni: Box internet + décodeur TV

Le client s'engage à respecter la durée d'engagement souscrite.`,
      metadata: {
        filename: file.name,
        size: file.size,
        type: file.type,
        pages: 1
      }
    };
  }

  private generateInsuranceContract(file: File): RawExtraction {
    return {
      text: `CONTRAT D'ASSURANCE HABITATION

Assureur: AXA France
Numéro de contrat: AH789456123
Adresse assurée: 456 Avenue des Champs, 69000 Lyon
Formule: Tous risques étendus
Date d'effet: 01/03/2023
Date d'échéance: 01/03/2024
Prime annuelle: 180€

Garanties incluses:
- Incendie et dégâts des eaux
- Vol et vandalisme
- Responsabilité civile
- Catastrophes naturelles

Conditions de résiliation:
- Préavis: 2 mois
- Loi Hamon applicable
- Résiliation possible à l'échéance`,
      metadata: {
        filename: file.name,
        size: file.size,
        type: file.type,
        pages: 1
      }
    };
  }

  private generateBankContract(file: File): RawExtraction {
    return {
      text: `CONTRAT DE COMPTE BANCAIRE

Banque: BNP Paribas
IBAN: FR76 3000 1007 9412 3456 7890 123
Agence: Paris République
Ville: 75003 Paris
Type de compte: Compte courant
Date d'ouverture: 10/06/2022

Services inclus:
- Carte bancaire Visa Classic
- Chéquier gratuit
- Accès internet banking
- Prélèvements automatiques

Frais de tenue de compte: 2,50€/mois
Frais de carte bancaire: 15€/an`,
      metadata: {
        filename: file.name,
        size: file.size,
        type: file.type,
        pages: 1
      }
    };
  }

  private generateEnergyContract(file: File): RawExtraction {
    return {
      text: `CONTRAT DE FOURNITURE D'ÉNERGIE

Fournisseur: EDF
Numéro de contrat: EN123456789
Adresse de livraison: 789 Boulevard de la Liberté, 13000 Marseille
Type d'énergie: Électricité
Puissance souscrite: 6 kVA
Date d'effet: 01/01/2023

Tarifs appliqués:
- Base: 0,1740€/kWh
- Heures creuses: 0,1470€/kWh
- Heures pleines: 0,1840€/kWh
- Abonnement mensuel: 8,50€

Conditions de résiliation:
- Préavis: 30 jours
- Résiliation gratuite
- Pas de frais de départ`,
      metadata: {
        filename: file.name,
        size: file.size,
        type: file.type,
        pages: 1
      }
    };
  }

  private generateGenericContract(file: File): RawExtraction {
    return {
      text: `CONTRAT DE PRESTATION DE SERVICES

Entreprise: Services Généraux SA
Numéro de contrat: CG987654321
Objet: Maintenance informatique
Date de signature: 01/05/2023
Durée: 12 mois renouvelable
Prix mensuel: 150€

Services inclus:
- Maintenance préventive
- Support technique
- Interventions d'urgence
- Mise à jour des logiciels

Conditions de résiliation:
- Préavis: 1 mois
- Résiliation possible en cas de manquement
- Frais de résiliation anticipée: 100€`,
      metadata: {
        filename: file.name,
        size: file.size,
        type: file.type,
        pages: 1
      }
    };
  }
}

// Parser PDF avec pdfjs-dist (optionnel)
export class PDFContractParser implements ContractParser {
  async parse(file: File): Promise<RawExtraction> {
    try {
      // Ici on pourrait utiliser pdfjs-dist pour extraire le texte
      // Pour l'instant, on utilise le parser mock
      const mockParser = new MockContractParser();
      return mockParser.parse(file);
    } catch (error) {
      console.warn('PDF parsing failed, falling back to mock:', error);
      const mockParser = new MockContractParser();
      return mockParser.parse(file);
    }
  }
}

// Factory pour choisir le bon parser
export function createContractParser(): ContractParser {
  // Pour l'instant, on utilise toujours le mock
  // Plus tard, on pourra détecter le type de fichier et choisir le bon parser
  return new MockContractParser();
}

