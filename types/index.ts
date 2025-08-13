export type Category = 'Résiliation' | 'Assurance' | 'Banque' | 'Logement' | 'Travail' | 'Administratif';

export type ModelLevel = 'Gratuit' | 'Pro';

import { ComponentType } from 'react';

export interface Model {
  id: string;
  slug: string;
  title: string;
  category: Category;
  tags: string[];
  level: ModelLevel;
  description: string;
  icon: ComponentType<any>;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  options?: string[];
  help?: string;
}

export interface FormData {
  [key: string]: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
