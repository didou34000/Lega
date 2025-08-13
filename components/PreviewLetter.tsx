'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PreviewLetterProps {
  content: string;
  onDownload?: () => void;
  className?: string;
}

export default function PreviewLetter({ content, onDownload, className = '' }: PreviewLetterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400">📄</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Aperçu de la lettre
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Vérifiez le contenu avant génération
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={isExpanded ? 'Réduire' : 'Développer'}
          >
            {isExpanded ? '👁️' : '🚫'}
          </button>
          
          {onDownload && (
            <button
              onClick={onDownload}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Télécharger"
            >
              ⬇️
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-200 dark:border-gray-700"
        >
          <div className="p-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div 
                className="text-gray-800 dark:text-gray-200 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
