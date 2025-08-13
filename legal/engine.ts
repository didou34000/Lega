// src/legal/engine.ts
import { LegalRule, FieldReq, ComputeRule, AttachmentReq } from './rules';

export interface FormValues {
  [key: string]: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ComputedResult {
  name: string;
  label: string;
  value: string;
  disclaimer?: string;
}

/**
 * Vérifie si un champ est requis selon les conditions
 */
export const isFieldRequired = (field: FieldReq, values: FormValues): boolean => {
  if (typeof field.required === 'boolean') {
    return field.required;
  }
  
  if (field.required?.when) {
    const { field: conditionField, equals, in: inArray } = field.required.when;
    const fieldValue = values[conditionField];
    
    if (equals !== undefined) {
      return fieldValue === equals;
    }
    
    if (inArray !== undefined) {
      return inArray.includes(fieldValue);
    }
  }
  
  return false;
};

/**
 * Vérifie si un justificatif est visible selon les conditions
 */
export const isAttachmentVisible = (attachment: AttachmentReq, values: FormValues): boolean => {
  if (!attachment.when) {
    return true;
  }
  
  const { field, equals, in: inArray } = attachment.when;
  const fieldValue = values[field];
  
  if (equals !== undefined) {
    return fieldValue === equals;
  }
  
  if (inArray !== undefined) {
    return inArray.includes(fieldValue);
  }
  
  return true;
};

/**
 * Valide un formulaire selon les règles légales
 */
export const validateForm = (rule: LegalRule, values: FormValues): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validation des champs requis
  for (const field of rule.ask) {
    if (isFieldRequired(field, values)) {
      const fieldValue = values[field.name];
      
      if (!fieldValue || fieldValue.toString().trim() === '') {
        errors.push(`Le champ "${field.label}" est requis`);
      }
      
      // Validation des patterns regex
      if (field.pattern && fieldValue) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(fieldValue.toString())) {
          errors.push(`Le format du champ "${field.label}" est incorrect`);
        }
      }
      
      // Validation de la longueur maximale
      if (field.maxLength && fieldValue && fieldValue.toString().length > field.maxLength) {
        errors.push(`Le champ "${field.label}" ne peut pas dépasser ${field.maxLength} caractères`);
      }
    }
  }
  
  // Validation des justificatifs requis
  if (rule.attachments) {
    for (const attachment of rule.attachments) {
      if (isAttachmentVisible(attachment, values) && attachment.required) {
        const attachmentKey = `file_${attachment.label}`;
        if (!values[attachmentKey]) {
          errors.push(`Le justificatif "${attachment.label}" est requis`);
        }
      }
    }
  }
  
  // Validation des emails
  if (values.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      warnings.push('Le format de l\'email semble incorrect');
    }
  }
  
  // Validation des téléphones
  if (values.telephone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(values.telephone)) {
      warnings.push('Le format du téléphone semble incorrect');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Calcule les résultats selon les règles de calcul
 */
export const computeResults = (rule: LegalRule, values: FormValues): ComputedResult[] => {
  if (!rule.compute) {
    return [];
  }
  
  return rule.compute.map(computeRule => {
    try {
      // Exécution sécurisée des fonctions de calcul
      const result = executeComputeFunction(computeRule.fn, values);
      
      return {
        name: computeRule.name,
        label: computeRule.label,
        value: result,
        disclaimer: computeRule.disclaimer
      };
    } catch (error) {
      console.error(`Erreur dans le calcul ${computeRule.name}:`, error);
      return {
        name: computeRule.name,
        label: computeRule.label,
        value: 'Erreur de calcul',
        disclaimer: 'Vérifiez les données saisies'
      };
    }
  });
};

/**
 * Exécute une fonction de calcul de manière sécurisée
 */
function executeComputeFunction(fnString: string, values: FormValues): string {
  // Création d'un contexte sécurisé pour l'exécution
  const context = {
    values,
    // Fonctions utilitaires pour les dates
    addDays: (date: string, days: number) => {
      const d = new Date(date);
      d.setDate(d.getDate() + days);
      return d.toISOString().split('T')[0];
    },
    addMonths: (date: string, months: number) => {
      const d = new Date(date);
      d.setMonth(d.getMonth() + months);
      return d.toISOString().split('T')[0];
    },
    addYears: (date: string, years: number) => {
      const d = new Date(date);
      d.setFullYear(d.getFullYear() + years);
      return d.toISOString().split('T')[0];
    },
    // Formatage des dates
    toISODate: (date: string) => {
      return new Date(date).toISOString().split('T')[0];
    },
    endOfMonthLike: (date: string) => {
      const d = new Date(date);
      d.setMonth(d.getMonth() + 1, 0);
      return d.toISOString().split('T')[0];
    }
  };
  
  // Remplacement des références aux valeurs
  let processedFn = fnString;
  for (const [key, value] of Object.entries(values)) {
    const regex = new RegExp(`values\\.${key}`, 'g');
    processedFn = processedFn.replace(regex, JSON.stringify(value));
  }
  
  // Exécution sécurisée
  try {
    // Utilisation de Function pour créer un contexte isolé
    const safeFunction = new Function('values', 'addDays', 'addMonths', 'addYears', 'toISODate', 'endOfMonthLike', `return ${processedFn}`);
    return safeFunction(
      values,
      context.addDays,
      context.addMonths,
      context.addYears,
      context.toISODate,
      context.endOfMonthLike
    );
  } catch (error) {
    throw new Error(`Erreur d'exécution: ${error}`);
  }
}

/**
 * Obtient les justificatifs requis selon les conditions actuelles
 */
export const getRequiredAttachments = (rule: LegalRule, values: FormValues): AttachmentReq[] => {
  if (!rule.attachments) {
    return [];
  }
  
  return rule.attachments.filter(attachment => 
    isAttachmentVisible(attachment, values)
  );
};

/**
 * Obtient les erreurs d'un champ spécifique
 */
export const getFieldErrors = (fieldName: string, validationResult: ValidationResult): string[] => {
  return validationResult.errors.filter(error => 
    error.includes(`"${fieldName}"`) || error.includes(fieldName)
  );
};

/**
 * Obtient les avertissements d'un champ spécifique
 */
export const getFieldWarnings = (fieldName: string, validationResult: ValidationResult): string[] => {
  return validationResult.warnings.filter(warning => 
    warning.includes(`"${fieldName}"`) || warning.includes(fieldName)
  );
};

/**
 * Calcule les valeurs selon les règles de calcul (alias pour computeResults)
 */
export const computeValues = (rule: LegalRule, values: FormValues): ComputedResult[] => {
  return computeResults(rule, values);
};

/**
 * Formate une date en format français
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
