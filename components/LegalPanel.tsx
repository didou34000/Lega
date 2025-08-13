// src/components/LegalPanel.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LegalRule } from '../legal/rules';

interface LegalPanelProps {
  rule: LegalRule;
  className?: string;
}

export const LegalPanel: React.FC<LegalPanelProps> = ({ rule, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      {/* En-tête du panneau */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400">ℹ</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Bases légales (indicatif)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {rule.category} • {rule.subcategory || 'Général'}
            </p>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Contenu dépliable */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 space-y-6">
              
              {/* Ce qu'on vous demandera */}
              <section>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <span className="mr-2 text-blue-600 dark:text-blue-400">📄</span>
                  Ce qu'on vous demandera
                </h4>
                <div className="space-y-2">
                  {rule.ask.map((field, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        field.required ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">{field.label}</span>
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        {field.help && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {field.help}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Justificatifs */}
              {rule.attachments && rule.attachments.length > 0 && (
                <section>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">⬆</span>
                    Justificatifs
                  </h4>
                  <div className="space-y-2">
                    {rule.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          attachment.required ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {attachment.label}
                            {attachment.required && <span className="text-red-500 ml-1">*</span>}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Types acceptés: {attachment.accepted.join(', ')}
                          </p>
                          {attachment.help && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {attachment.help}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Conseils et astuces */}
              {rule.tips && rule.tips.length > 0 && (
                <section>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">ℹ</span>
                    Conseils et astuces
                  </h4>
                  <div className="space-y-2">
                    {rule.tips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Liens utiles */}
              {rule.destinations && rule.destinations.length > 0 && (
                <section>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">↗</span>
                    Liens utiles
                  </h4>
                  <div className="space-y-2">
                    {rule.destinations.map((destination, index) => (
                      <a
                        key={index}
                        href={destination.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        <span>↗</span>
                        <span>{destination.label}</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Sources officielles */}
              {rule.sources && rule.sources.length > 0 && (
                <section>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <span className="mr-2 text-blue-600 dark:text-blue-400">📄</span>
                    Sources officielles
                  </h4>
                  <div className="space-y-2">
                    {rule.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      >
                        <span>↗</span>
                        <span>{source.label}</span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Avertissement */}
              {rule.disclaimer && (
                <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0">⚠</span>
                    <p className="text-xs text-amber-800 dark:text-amber-200">
                      {rule.disclaimer}
                    </p>
                  </div>
                </section>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LegalPanel;
