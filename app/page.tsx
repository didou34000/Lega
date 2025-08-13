'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
// Icônes externes retirées pour compatibilité RSC
import Button from '@/components/ui/Button';
import SearchBar from '@/components/SearchBar';
import AiComingSoon from '@/components/AiComingSoon';

export default function HomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/modeles');
  };

  const handleBrowse = () => {
    router.push('/modeles');
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/modeles?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleAnalyzeContract = () => {
    router.push('/modeles/resiliation-internet?analyze=true');
  };

  const handleViewFormalities = (category: string) => {
    router.push(`/modeles?category=${category.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✉️</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Générez vos lettres et démarches en 3 clics
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-primary-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Trouvez et rédigez vos lettres administratives, résiliations, et démarches en toute simplicité
          </motion.p>
          
          {/* Test du composant SearchBar */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Cherchez une formalité..."
            />
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button variant="primary" size="lg" onClick={handleStart}>
              Commencer maintenant
            </Button>
            <Button variant="outline" size="lg" onClick={handleBrowse} className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              Parcourir les modèles
            </Button>
          </motion.div>
        </div>
      </section>

      {/* AI Coming Soon Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              L'avenir de la génération de documents
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Notre système d'intelligence artificielle va révolutionner la façon dont vous créez vos documents administratifs
            </p>
          </motion.div>

          <AiComingSoon />
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Toutes les formalités en un clic
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              De la résiliation à la contestation, en passant par les démarches administratives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Résiliation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
            >
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">✉️</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Résiliation
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Internet et téléphonie
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Assurances
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Abonnements
                  </span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleViewFormalities('resiliation')}
              >
                Voir toutes les formalités
              </Button>
            </motion.div>

            {/* Assurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Assurance
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Habitation
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Automobile
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Santé
                  </span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleViewFormalities('assurance')}
              >
                Voir toutes les formalités
              </Button>
            </motion.div>

            {/* Banque */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🏦</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Banque
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Clôture de compte
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Opposition carte
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    Contestation frais
                  </span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleViewFormalities('banque')}
              >
                Voir toutes les formalités
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-16"
          >
            Comment ça marche ?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Choisissez votre formalité
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Parcourez notre catalogue de modèles et sélectionnez celui qui correspond à votre besoin
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Remplissez le formulaire
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Remplissez les informations demandées ou utilisez notre IA pour analyser votre contrat
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Téléchargez votre lettre
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Générez et téléchargez votre lettre personnalisée en PDF, prête à envoyer
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Pourquoi nous faire confiance ?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              Plus de 50 000 utilisateurs nous font confiance pour leurs démarches administratives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">100% gratuit</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Conforme à la loi</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Sans engagement</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
