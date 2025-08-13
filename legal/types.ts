export interface FieldReq {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'email' | 'tel' | 'radio' | 'file';
  required: boolean;
  placeholder?: string;
  options?: string[];
  help?: string;
}

export interface ComputedField {
  name: string;
  label: string;
  formula: string;
  unit?: string;
}

export interface Attachment {
  label: string;
  required: boolean;
  accepted: string[];
  maxSize?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface LegalRule {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  ask: FieldReq[];
  compute: ComputedField[];
  attachments: Attachment[];
}
