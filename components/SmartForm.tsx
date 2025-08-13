// components/SmartForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useLegalRules } from '../hooks/useLegalRules';
import Button from './ui/Button';
import { ToastContainer, useToasts } from './ui/Toast';
import { LegalPanel } from './LegalPanel';

interface SmartFormProps {
  ruleId: string;
  onGenerate?: (data: any) => void;
}

export default function SmartForm({ ruleId, onGenerate }: SmartFormProps) {
  const {
    rule,
    values,
    validationResult,
    computedResults,
    requiredAttachments,
    updateValue,
    isFieldRequired,
    isAttachmentVisible,
    getFieldErrors,
    getFieldWarnings,
    hasErrors,
    isValid,
    hasInteracted
  } = useLegalRules(ruleId);

  const { toasts, addToast, removeToast } = useToasts();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isValid) {
        addToast({
          type: 'success',
          title: 'Succès',
          message: 'Formulaire validé avec succès !'
        });
        if (onGenerate) {
          onGenerate({ ...values, ...computedResults });
        }
      } else {
        addToast({
          type: 'error',
          title: 'Erreur',
          message: 'Veuillez corriger les erreurs dans le formulaire.'
        });
      }
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erreur',
        message: 'Une erreur est survenue.'
      });
    }
  };

  const renderField = (field: any) => {
    const fieldErrors = getFieldErrors(field.name);
    const fieldWarnings = getFieldWarnings(field.name);
    const isRequired = isFieldRequired(field.name);

    return (
      <div key={field.name} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {field.label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>

        {field.type === 'text' && (
          <input
            type="text"
            name={field.name}
            value={values[field.name] || ''}
            onChange={(e) => updateValue(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              fieldErrors.length > 0 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
        )}

        {field.type === 'textarea' && (
          <textarea
            name={field.name}
            value={values[field.name] || ''}
            onChange={(e) => updateValue(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              fieldErrors.length > 0 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
        )}

        {field.type === 'date' && (
          <input
            type="date"
            name={field.name}
            value={values[field.name] || ''}
            onChange={(e) => updateValue(field.name, e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              fieldErrors.length > 0 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
        )}

        {field.type === 'select' && (
          <select
            name={field.name}
            value={values[field.name] || ''}
            onChange={(e) => updateValue(field.name, e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              fieldErrors.length > 0 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Sélectionnez...</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {field.type === 'radio' && (
          <div className="space-y-2">
            {field.options?.map((option: string) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={values[field.name] === option}
                  onChange={(e) => updateValue(field.name, e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        )}

        {field.help && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            ℹ️ {field.help}
          </p>
        )}

        {hasInteracted && fieldErrors.length > 0 && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            ✖ {fieldErrors[0]}
          </p>
        )}

        {hasInteracted && fieldWarnings.length > 0 && (
          <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
            ⚠ {fieldWarnings[0]}
          </p>
        )}
      </div>
    );
  };

  const renderAttachment = (attachment: any) => {
    if (!isAttachmentVisible(attachment.label)) return null;

    return (
      <div key={attachment.label} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {attachment.label}
          {attachment.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
          <input
            type="file"
            accept={attachment.accepted.join(',')}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                updateValue(`file_${attachment.label}`, file);
              }
            }}
            className="hidden"
            id={`file-${attachment.label}`}
          />
          <label
            htmlFor={`file-${attachment.label}`}
            className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
          >
            ⬆ Cliquez pour sélectionner un fichier
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Formats acceptés: {attachment.accepted.join(', ')}
          </p>
        </div>

        {attachment.help && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            ℹ️ {attachment.help}
          </p>
        )}
      </div>
    );
  };

  if (!rule) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Règle légale non trouvée pour l'ID: {ruleId}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Champs du formulaire */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Informations requises
              </h3>
              {rule.ask.map(renderField)}
            </div>

            {/* Pièces jointes */}
            {requiredAttachments.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Pièces jointes
                </h3>
                {requiredAttachments.map(renderAttachment)}
              </div>
            )}

            {/* Bouton de soumission */}
            <div className="flex justify-end">
              <Button type="submit" disabled={!isValid}>
                Générer le document
              </Button>
            </div>
          </form>
        </div>

        {/* Panneau légal */}
        <div className="lg:col-span-1">
          <LegalPanel rule={rule} />
        </div>
      </div>

      {/* Toast de notification */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

