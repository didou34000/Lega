import { RawExtraction } from '../contract/ContractParser';
import { OPERATEURS, ASSUREURS, BANQUES, ENERGIE, BAILLEURS_TYPE, ADMIN_SERVICES } from '../../data/acteurs';

export type AiAnalysis = {
  summary: string[];
  actorType?: 'Operateur' | 'Assureur' | 'Banque' | 'FournisseurEnergie' | 'Bailleur' | 'Employeur' | 'Administration';
  actorName?: string;
  keyClauses: { title: string; snippet: string; impact: string }[];
  dates: { label: string; value: string }[];
  fees: { label: string; value: string }[];
  risks: string[];
  confidence: 'Élevé' | 'Moyen' | 'Faible';
  suggestedFormalitySlug?: string;
  fieldMapping?: Record<string, string>;
};

export interface AiAnalyzer { 
  analyze(input: RawExtraction): Promise<AiAnalysis>; 
}

export class MockAiAnalyzer implements AiAnalyzer {
  async analyze(input: RawExtraction): Promise<AiAnalysis> {
    // Simule un délai d'analyse
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const text = input.text.toLowerCase();
    const filename = input.metadata.filename.toLowerCase();
    
    // Détection de l'acteur
    const actorDetection = this.detectActor(text, filename);
    
    // Analyse des clauses clés
    const keyClauses = this.extractKeyClauses(text);
    
    // Extraction des dates
    const dates = this.extractDates(text);
    
    // Extraction des frais
    const fees = this.extractFees(text);
    
    // Identification des risques
    const risks = this.identifyRisks(text);
    
    // Suggestion de formalité
    const suggestedFormality = this.suggestFormality(actorDetection.actorType, text);
    
    // Mapping des champs
    const fieldMapping = this.generateFieldMapping(text, actorDetection.actorName);
    
    return {
      summary: this.generateSummary(text, actorDetection),
      actorType: actorDetection.actorType as any,
      actorName: actorDetection.actorName,
      keyClauses,
      dates,
      fees,
      risks,
      confidence: actorDetection.confidence,
      suggestedFormalitySlug: suggestedFormality,
      fieldMapping
    };
  }

  private detectActor(text: string, filename: string): { actorType?: string; actorName?: string; confidence: 'Élevé' | 'Moyen' | 'Faible' } {
    // Détection par nom de fichier d'abord
    for (const operateur of OPERATEURS) {
      if (filename.includes(operateur.toLowerCase()) || text.includes(operateur.toLowerCase())) {
        return { actorType: 'Operateur', actorName: operateur, confidence: 'Élevé' };
      }
    }
    
    for (const assureur of ASSUREURS) {
      if (filename.includes(assureur.toLowerCase()) || text.includes(assureur.toLowerCase())) {
        return { actorType: 'Assureur', actorName: assureur, confidence: 'Élevé' };
      }
    }
    
    for (const banque of BANQUES) {
      if (filename.includes(banque.toLowerCase()) || text.includes(banque.toLowerCase())) {
        return { actorType: 'Banque', actorName: banque, confidence: 'Élevé' };
      }
    }
    
    for (const energie of ENERGIE) {
      if (filename.includes(energie.toLowerCase()) || text.includes(energie.toLowerCase())) {
        return { actorType: 'FournisseurEnergie', actorName: energie, confidence: 'Élevé' };
      }
    }
    
    // Détection par mots-clés dans le texte
    if (text.includes('internet') || text.includes('fibre') || text.includes('adsl') || text.includes('opérateur')) {
      return { actorType: 'Operateur', confidence: 'Moyen' };
    }
    
    if (text.includes('assurance') || text.includes('prime') || text.includes('garantie') || text.includes('sinistre')) {
      return { actorType: 'Assureur', confidence: 'Moyen' };
    }
    
    if (text.includes('iban') || text.includes('compte') || text.includes('banque') || text.includes('carte bancaire')) {
      return { actorType: 'Banque', confidence: 'Moyen' };
    }
    
    if (text.includes('électricité') || text.includes('gaz') || text.includes('kwh') || text.includes('puissance')) {
      return { actorType: 'FournisseurEnergie', confidence: 'Moyen' };
    }
    
    return { confidence: 'Faible' };
  }

  private extractKeyClauses(text: string): { title: string; snippet: string; impact: string }[] {
    const clauses = [];
    
    if (text.includes('engagement')) {
      clauses.push({
        title: 'Durée d\'engagement',
        snippet: this.extractSnippet(text, 'engagement'),
        impact: 'Engagement contractuel à respecter'
      });
    }
    
    if (text.includes('résiliation')) {
      clauses.push({
        title: 'Conditions de résiliation',
        snippet: this.extractSnippet(text, 'résiliation'),
        impact: 'Modalités de fin de contrat'
      });
    }
    
    if (text.includes('frais') || text.includes('pénalités')) {
      clauses.push({
        title: 'Frais et pénalités',
        snippet: this.extractSnippet(text, 'frais'),
        impact: 'Coûts en cas de non-respect'
      });
    }
    
    if (text.includes('préavis')) {
      clauses.push({
        title: 'Délai de préavis',
        snippet: this.extractSnippet(text, 'préavis'),
        impact: 'Délai avant résiliation effective'
      });
    }
    
    if (text.includes('loi chatel') || text.includes('loi hamon')) {
      clauses.push({
        title: 'Protection légale',
        snippet: this.extractSnippet(text, 'loi'),
        impact: 'Droits de résiliation légaux'
      });
    }
    
    return clauses.slice(0, 5); // Max 5 clauses
  }

  private extractSnippet(text: string, keyword: string): string {
    const index = text.indexOf(keyword);
    if (index === -1) return '';
    
    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + 100);
    return text.substring(start, end).trim();
  }

  private extractDates(text: string): { label: string; value: string }[] {
    const dates = [];
    
    // Recherche de patterns de dates
    const datePatterns = [
      { pattern: /(\d{1,2}\/\d{1,2}\/\d{4})/g, label: 'Date' },
      { pattern: /(\d{1,2}-\d{1,2}-\d{4})/g, label: 'Date' },
      { pattern: /(\d{4}-\d{1,2}-\d{1,2})/g, label: 'Date' }
    ];
    
    for (const { pattern, label } of datePatterns) {
      const matches = text.match(pattern);
      if (matches) {
        matches.slice(0, 3).forEach(match => {
          dates.push({ label, value: match });
        });
      }
    }
    
    // Recherche de dates contextuelles
    if (text.includes('souscription')) {
      const match = text.match(/souscription[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i);
      if (match) dates.push({ label: 'Date de souscription', value: match[1] });
    }
    
    if (text.includes('échéance')) {
      const match = text.match(/échéance[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i);
      if (match) dates.push({ label: 'Date d\'échéance', value: match[1] });
    }
    
    if (text.includes('effet')) {
      const match = text.match(/effet[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i);
      if (match) dates.push({ label: 'Date d\'effet', value: match[1] });
    }
    
    return dates.slice(0, 5); // Max 5 dates
  }

  private extractFees(text: string): { label: string; value: string }[] {
    const fees = [];
    
    // Recherche de montants
    const amountPattern = /(\d+[.,]\d{2}|\d+)\s*€/g;
    const amounts = text.match(amountPattern);
    
    if (amounts) {
      amounts.slice(0, 3).forEach(amount => {
        if (text.includes('mensuel') || text.includes('mois')) {
          fees.push({ label: 'Frais mensuels', value: amount });
        } else if (text.includes('annuel') || text.includes('an')) {
          fees.push({ label: 'Frais annuels', value: amount });
        } else {
          fees.push({ label: 'Frais', value: amount });
        }
      });
    }
    
    // Recherche de frais spécifiques
    if (text.includes('résiliation anticipée')) {
      const match = text.match(/résiliation anticipée[:\s]+(\d+[.,]\d{2}|\d+)\s*€/i);
      if (match) fees.push({ label: 'Frais de résiliation anticipée', value: match[1] + '€' });
    }
    
    if (text.includes('installation')) {
      const match = text.match(/installation[:\s]+(\d+[.,]\d{2}|\d+)\s*€/i);
      if (match) fees.push({ label: 'Frais d\'installation', value: match[1] + '€' });
    }
    
    if (fees.length === 0) {
      fees.push({ label: 'Frais', value: 'Non identifié' });
    }
    
    return fees.slice(0, 3); // Max 3 frais
  }

  private identifyRisks(text: string): string[] {
    const risks = [];
    
    if (text.includes('engagement') && text.includes('24') || text.includes('12')) {
      risks.push('Engagement de longue durée');
    }
    
    if (text.includes('résiliation anticipée') && text.includes('frais')) {
      risks.push('Frais de résiliation anticipée');
    }
    
    if (text.includes('pénalités') || text.includes('sanctions')) {
      risks.push('Pénalités contractuelles');
    }
    
    if (text.includes('renouvellement automatique')) {
      risks.push('Renouvellement automatique');
    }
    
    if (text.includes('indexation') || text.includes('révision')) {
      risks.push('Révision tarifaire possible');
    }
    
    if (risks.length === 0) {
      risks.push('Aucun risque majeur identifié');
    }
    
    return risks.slice(0, 3); // Max 3 risques
  }

  private suggestFormality(actorType?: string, text?: string): string | undefined {
    if (!actorType) return undefined;
    
    switch (actorType) {
      case 'Operateur':
        if (text?.includes('internet') || text?.includes('fibre')) {
          return 'resiliation-internet';
        } else if (text?.includes('mobile') || text?.includes('téléphonie')) {
          return 'resiliation-telephonie';
        }
        return 'resiliation-internet';
        
      case 'Assureur':
        if (text?.includes('habitation') || text?.includes('logement')) {
          return 'resiliation-assurance-habitation';
        } else if (text?.includes('auto') || text?.includes('véhicule')) {
          return 'resiliation-assurance-auto';
        }
        return 'resiliation-assurance-habitation';
        
      case 'Banque':
        if (text?.includes('clôture') || text?.includes('fermer')) {
          return 'cloture-compte';
        } else if (text?.includes('carte') || text?.includes('opposition')) {
          return 'opposition-carte';
        }
        return 'cloture-compte';
        
      case 'FournisseurEnergie':
        return 'resiliation-energie';
        
      default:
        return undefined;
    }
  }

  private generateFieldMapping(text: string, actorName?: string): Record<string, string> {
    const mapping: Record<string, string> = {};
    
    // Extraction du numéro de client/contrat
    const clientMatch = text.match(/client[:\s]+([A-Z0-9\-]+)/i);
    if (clientMatch) mapping.numeroClient = clientMatch[1];
    
    const contratMatch = text.match(/contrat[:\s]+([A-Z0-9\-]+)/i);
    if (contratMatch) mapping.numContrat = contratMatch[1];
    
    // Extraction de l'adresse
    const adresseMatch = text.match(/(\d+\s+[^,]+,\s+\d{5}\s+[^,\n]+)/);
    if (adresseMatch) mapping.adresseInstallation = adresseMatch[1];
    
    // Extraction de la date de souscription
    const souscriptionMatch = text.match(/souscription[:\s]+(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4})/i);
    if (souscriptionMatch) mapping.dateSouscription = souscriptionMatch[1];
    
    // Extraction de l'offre
    if (text.includes('fibre')) mapping.offre = 'Fibre';
    else if (text.includes('adsl')) mapping.offre = 'ADSL';
    
    // Extraction du motif (par défaut)
    mapping.motif = 'fin_engagement';
    
    // Extraction de la date d'envoi (aujourd'hui)
    mapping.dateEnvoi = new Date().toISOString().split('T')[0];
    
    // Ajout de l'acteur si détecté
    if (actorName) {
      if (text.includes('internet') || text.includes('fibre')) {
        mapping.operateur = actorName;
      } else if (text.includes('assurance')) {
        mapping.assureur = actorName;
      } else if (text.includes('banque') || text.includes('iban')) {
        mapping.banque = actorName;
      }
    }
    
    return mapping;
  }

  private generateSummary(text: string, actorDetection: { actorType?: string; actorName?: string }): string[] {
    const summary = [];
    
    if (actorDetection.actorName) {
      summary.push(`Contrat détecté avec ${actorDetection.actorName}`);
    }
    
    if (text.includes('internet') || text.includes('fibre')) {
      summary.push('Service internet identifié');
    }
    
    if (text.includes('assurance')) {
      summary.push('Contrat d\'assurance détecté');
    }
    
    if (text.includes('banque') || text.includes('iban')) {
      summary.push('Service bancaire identifié');
    }
    
    if (text.includes('engagement')) {
      summary.push('Période d\'engagement contractuelle');
    }
    
    if (text.includes('résiliation')) {
      summary.push('Clauses de résiliation présentes');
    }
    
    return summary.slice(0, 4); // Max 4 points
  }
}

// Factory pour créer l'analyseur
export function createAiAnalyzer(): AiAnalyzer {
  return new MockAiAnalyzer();
}

