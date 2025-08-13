// TODO: Future OpenAI integration placeholder
// This file will handle remote AI calls when enabled (opt-in)

import { AiAnalysis } from './AiAnalyzer';
import { RawExtraction } from '../contract/ContractParser';

export interface AiBridgeConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ConsentStatus {
  hasConsented: boolean;
  consentDate?: Date;
  consentVersion: string;
}

export class AiBridge {
  private config: AiBridgeConfig;
  private consentStatus: ConsentStatus;

  constructor(config: AiBridgeConfig = {}) {
    this.config = {
      model: 'gpt-4',
      temperature: 0.1,
      maxTokens: 2000,
      ...config
    };
    
    this.consentStatus = {
      hasConsented: false,
      consentVersion: '1.0'
    };
  }

  // Check if remote AI is available and consented
  isRemoteAiAvailable(): boolean {
    return this.config.apiKey !== undefined && this.consentStatus.hasConsented;
  }

  // Get current consent status
  getConsentStatus(): ConsentStatus {
    return { ...this.consentStatus };
  }

  // Update consent status
  updateConsent(hasConsented: boolean): void {
    this.consentStatus = {
      hasConsented,
      consentDate: hasConsented ? new Date() : undefined,
      consentVersion: this.consentStatus.consentVersion
    };
  }

  // Future OpenAI integration
  async callRemoteAi(input: RawExtraction): Promise<AiAnalysis> {
    if (!this.isRemoteAiAvailable()) {
      throw new Error('Remote AI not available or consent not given');
    }

    // TODO: Implement actual OpenAI API call
    // const response = await openai.chat.completions.create({
    //   model: this.config.model!,
    //   messages: [
    //     {
    //       role: 'system',
    //       content: 'You are a legal document analyzer. Extract key information from contracts and legal documents.'
    //     },
    //     {
    //       role: 'user',
    //       content: `Analyze this document: ${input.text}`
    //     }
    //   ],
    //   temperature: this.config.temperature,
    //   max_tokens: this.config.maxTokens
    // });

    // For now, return a mock response
    return this.generateMockRemoteResponse(input);
  }

  private generateMockRemoteResponse(input: RawExtraction): AiAnalysis {
    // Simulate remote AI response
    return {
      summary: [
        'Document analysé par IA distante (simulation)',
        'Intégration OpenAI en cours de développement'
      ],
      actorType: 'Operateur',
      actorName: 'Détecté via IA distante',
      keyClauses: [
        {
          title: 'Clause détectée par IA',
          snippet: 'Analyse avancée en cours...',
          impact: 'Impact à évaluer'
        }
      ],
      dates: [
        { label: 'Date détectée', value: 'Via IA distante' }
      ],
      fees: [
        { label: 'Frais détectés', value: 'Analyse en cours' }
      ],
      risks: ['Analyse IA distante en développement'],
      confidence: 'Moyen',
      suggestedFormalitySlug: 'resiliation-internet',
      fieldMapping: {
        operateur: 'Détecté par IA',
        numeroClient: 'À vérifier'
      }
    };
  }
}

// Factory function
export function createAiBridge(config?: AiBridgeConfig): AiBridge {
  return new AiBridge(config);
}

// Mock consent modal data
export const CONSENT_MODAL_CONTENT = {
  title: 'Consentement pour l\'analyse IA distante',
  description: 'Pour améliorer l\'analyse de vos documents, nous proposons d\'utiliser des services d\'IA distants (OpenAI).',
  benefits: [
    'Analyse plus précise des contrats complexes',
    'Détection automatique des clauses importantes',
    'Suggestions personnalisées basées sur le contenu'
  ],
  privacy: [
    'Vos documents ne sont jamais stockés',
    'Les données sont chiffrées en transit',
    'Vous pouvez révoquer ce consentement à tout moment'
  ],
  required: 'Ce consentement est optionnel. L\'analyse locale reste disponible sans consentement.'
};
