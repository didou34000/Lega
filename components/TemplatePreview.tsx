'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TemplatePreviewProps {
  template: string;
  className?: string;
}

export default function TemplatePreview({ template, className = '' }: TemplatePreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400">📄</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Aperçu du modèle
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Cliquez pour voir le contenu
            </p>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isExpanded ? '👁️' : '🚫'}
        </motion.div>
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
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded border">
              {template}
            </pre>
          </div>
        </motion.div>
      )}
    </div>
  );
}
