'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  OPERATEURS, 
  ASSUREURS, 
  BANQUES, 
  ENERGIE, 
  BAILLEURS_TYPE, 
  ADMIN_SERVICES,
  ActorType 
} from '@/data/acteurs';
import { AnimatePresence } from 'framer-motion';

interface ActorSelectProps {
  actorType: ActorType;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function ActorSelect({ 
  actorType, 
  value, 
  onChange, 
  placeholder,
  className = '',
  required = false,
  disabled = false
}: ActorSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getActorList = () => {
    switch (actorType) {
      case 'Operateur':
        return OPERATEURS;
      case 'Assureur':
        return ASSUREURS;
      case 'Banque':
        return BANQUES;
      case 'FournisseurEnergie':
        return ENERGIE;
      case 'Bailleur':
        return BAILLEURS_TYPE;
      case 'Administration':
        return ADMIN_SERVICES;
      default:
        return [];
    }
  };

  const getDefaultPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (actorType) {
      case 'Operateur':
        return 'Sélectionnez votre opérateur';
      case 'Assureur':
        return 'Sélectionnez votre assureur';
      case 'Banque':
        return 'Sélectionnez votre banque';
      case 'FournisseurEnergie':
        return 'Sélectionnez votre fournisseur d\'énergie';
      case 'Bailleur':
        return 'Sélectionnez le type de bailleur';
      case 'Administration':
        return 'Sélectionnez le service administratif';
      default:
        return 'Sélectionnez...';
    }
  };

  const actorList = getActorList();
  const defaultPlaceholder = getDefaultPlaceholder();

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`w-full px-4 py-3 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
          disabled 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
            : 'hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer'
        } ${
          required && !value ? 'border-red-300 dark:border-red-600' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="actor-select-label"
      >
        <span className={`block truncate ${value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          {value || defaultPlaceholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <motion.svg
            className="w-5 h-5 text-gray-400"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            <ul
              className="py-1"
              role="listbox"
              aria-labelledby="actor-select-label"
            >
              {actorList.map((actor, index) => (
                <li
                  key={index}
                  role="option"
                  aria-selected={value === actor}
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    value === actor
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleSelect(actor)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(actor);
                    }
                  }}
                  tabIndex={0}
                >
                  {actor}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {required && !value && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          Ce champ est requis
        </p>
      )}
    </div>
  );
}
