'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ParsingProgressProps {
  currentStep: number;
  totalSteps: number;
  message: string;
  className?: string;
}

export default function ParsingProgress({ currentStep, totalSteps, message, className = '' }: ParsingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6 ${className}`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 dark:text-blue-400">🧠</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Analyse en cours...
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {currentStep}/{totalSteps}
        </div>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <motion.div
          className="bg-blue-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>📄 Extraction des données</span>
        <span>🔍 Analyse du contenu</span>
        <span>✓ Génération du formulaire</span>
      </div>
    </div>
  );
}
