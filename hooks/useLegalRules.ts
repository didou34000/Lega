// hooks/useLegalRules.ts
import { useState, useEffect, useMemo } from 'react';
import { findLegalRule, LegalRule } from '../legal/rules';
import { 
  validateForm, 
  computeResults, 
  getRequiredAttachments,
  getFieldErrors,
  getFieldWarnings,
  ValidationResult,
  ComputedResult
} from '../legal/engine';

export interface UseLegalRulesReturn {
  rule: LegalRule | undefined;
  values: Record<string, any>;
  validationResult: ValidationResult;
  computedResults: ComputedResult[];
  requiredAttachments: any[];
  updateValue: (name: string, value: any) => void;
  updateValues: (newValues: Record<string, any>) => void;
  resetValues: () => void;
  isFieldRequired: (fieldName: string) => boolean;
  isAttachmentVisible: (attachmentName: string) => boolean;
  getFieldErrors: (fieldName: string) => string[];
  getFieldWarnings: (fieldName: string) => string[];
  hasErrors: boolean;
  isValid: boolean;
  hasInteracted: boolean;
}

export const useLegalRules = (
  ruleId: string,
  initialValues: Record<string, any> = {}
): UseLegalRulesReturn => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [hasInteracted, setHasInteracted] = useState(false);

  const rule = useMemo(() => findLegalRule(ruleId), [ruleId]);

  // Validation du formulaire seulement après interaction
  const validationResult = useMemo(() => {
    if (!rule || !hasInteracted) {
      return { isValid: false, errors: [], warnings: [] };
    }
    return validateForm(rule, values);
  }, [values, rule, hasInteracted]);

  // Calculs en temps réel
  const computedResults = useMemo(() => {
    if (!rule || !hasInteracted) {
      return [];
    }
    return computeResults(rule, values);
  }, [values, rule, hasInteracted]);

  // Justificatifs requis
  const requiredAttachments = useMemo(() => {
    if (!rule) {
      return [];
    }
    return getRequiredAttachments(rule, values);
  }, [values, rule]);

  // Mise à jour d'une valeur
  const updateValue = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setHasInteracted(true);
  };

  // Mise à jour de plusieurs valeurs
  const updateValues = (newValues: Record<string, any>) => {
    setValues(prev => ({ ...prev, ...newValues }));
    setHasInteracted(true);
  };

  // Réinitialisation des valeurs
  const resetValues = () => {
    setValues(initialValues);
    setHasInteracted(false);
  };

  // Vérifier si un champ est requis
  const isFieldRequired = (fieldName: string): boolean => {
    if (!rule) return false;
    const field = rule.ask.find(f => f.name === fieldName);
    if (!field) return false;
    
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

  // Vérifier si un justificatif est visible
  const isAttachmentVisible = (attachmentName: string): boolean => {
    if (!rule || !rule.attachments) return false;
    const attachment = rule.attachments.find(a => a.label === attachmentName);
    if (!attachment) return false;
    
    if (!attachment.when) return true;
    
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

  // Obtenir les erreurs d'un champ
  const getFieldErrorsForField = (fieldName: string): string[] => {
    return getFieldErrors(fieldName, validationResult);
  };

  // Obtenir les avertissements d'un champ
  const getFieldWarningsForField = (fieldName: string): string[] => {
    return getFieldWarnings(fieldName, validationResult);
  };

  const hasErrors = validationResult.errors.length > 0;
  const isValid = validationResult.isValid;

  return {
    rule,
    values,
    validationResult,
    computedResults,
    requiredAttachments,
    updateValue,
    updateValues,
    resetValues,
    isFieldRequired,
    isAttachmentVisible,
    getFieldErrors: getFieldErrorsForField,
    getFieldWarnings: getFieldWarningsForField,
    hasErrors,
    isValid,
    hasInteracted
  };
};
