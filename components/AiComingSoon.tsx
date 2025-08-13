'use client';

import React from 'react';

interface AiComingSoonProps {
  className?: string;
}

export default function AiComingSoon({ className = '' }: AiComingSoonProps) {
  return (
    <div className={`bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-6 ${className}`}>
      <div className="text-center">
        {/* Icône IA */}
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">🧠</span>
        </div>

        {/* Titre */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Système IA - Bientôt disponible !
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Notre intelligence artificielle va révolutionner la génération de vos documents administratifs.
        </p>

        {/* Fonctionnalités à venir */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>Analyse automatique de vos documents</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>Génération intelligente de contenu</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>Suggestions personnalisées</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>Validation automatique des données</span>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Développement en cours</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Bouton notification */}
        <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm font-medium">
          <span className="mr-2">🔔</span>
          Être notifié à la sortie
        </button>

        {/* Note */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Sortie prévue : fin 2025
        </p>
      </div>
    </div>
  );
}

