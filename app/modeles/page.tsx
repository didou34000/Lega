'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
// Icônes externes retirées pour compatibilité RSC
import Button from '@/components/ui/Button';
import { MODELS, getModelsByCategory, searchModels } from '@/data/models';

const categories = [
  { id: 'all', name: 'Toutes', color: 'bg-gray-100 dark:bg-gray-800' },
  { id: 'resiliation', name: 'Résiliation', color: 'bg-red-100 dark:bg-red-900/30' },
  { id: 'assurance', name: 'Assurance', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { id: 'banque', name: 'Banque', color: 'bg-green-100 dark:bg-green-900/30' },
  { id: 'travail', name: 'Travail', color: 'bg-purple-100 dark:bg-purple-900/30' },
  { id: 'logement', name: 'Logement', color: 'bg-orange-100 dark:bg-orange-900/30' },
  { id: 'administratif', name: 'Administratif', color: 'bg-indigo-100 dark:bg-indigo-900/30' }
];

export default function ModelesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'name' | 'category'>('popular');

  // Éviter l'hydratation en attendant que le composant soit monté
  useEffect(() => {
    setMounted(true);
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const filteredModels = useMemo(() => {
    let filtered = MODELS;

    // Filtre par recherche
    if (searchQuery) {
      filtered = searchModels(searchQuery);
    }

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = getModelsByCategory(selectedCategory);
    }

    // Tri
    filtered.sort((a, b) => {
      if (sortBy === 'popular') {
        return b.popular ? 1 : -1;
      } else if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else {
        return a.category.localeCompare(b.category);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // La recherche se fait automatiquement via le state
  };

  const handleModelClick = (model: any) => {
    // Rediriger vers la page du modèle avec le slug
    router.push(`/modeles/${model.slug}`);
  };

  // Ne pas rendre le contenu jusqu'à ce que le composant soit monté
  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3 mb-8"></div>
            <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded w-full mb-8"></div>
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Modèles de lettres
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Trouvez le modèle qui correspond à vos besoins parmi {MODELS.length} modèles disponibles
          </p>
        </motion.div>

        {/* Barre de recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un modèle..."
                className="w-full px-6 py-4 pl-14 pr-32 text-lg bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-600 rounded-2xl focus:border-primary-500 focus:outline-none transition-colors duration-200 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400"
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-400">
                <span className="text-xl">🔍</span>
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2"
              >
                Rechercher
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Catégories */}
            <div className="flex items-center space-x-2">
              <span className="text-neutral-500">⛃</span>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Catégories :</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                        selectedCategory === category.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600'
                      }`}
                      >
                      <span className="w-2 h-2 bg-current rounded-full inline-block"></span>
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tri */}
            <div className="flex items-center space-x-2">
              <span className="text-neutral-500">⇅</span>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'name' | 'category')}
                className="px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg text-sm focus:outline-none focus:border-primary-500"
              >
                <option value="popular">Popularité</option>
                <option value="name">Nom</option>
                <option value="category">Catégorie</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Résultats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-center">
            {filteredModels.length} modèle{filteredModels.length > 1 ? 's' : ''} trouvé{filteredModels.length > 1 ? 's' : ''}
            {searchQuery && ` pour "${searchQuery}"`}
            {selectedCategory !== 'all' && ` dans ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </motion.div>

        {/* Grille des modèles */}
        {filteredModels.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredModels.map((model, index) => {
              return (
                <motion.div
                  key={model.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-200 cursor-pointer group"
                  onClick={() => handleModelClick(model)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${categories.find(c => c.id === model.category)?.color} text-neutral-700 dark:text-neutral-300`}>
                      {categories.find(c => c.id === model.category)?.name}
                    </div>
                    <div className="flex items-center space-x-2">
                      {model.popular && (
                        <span className="text-yellow-600">★</span>
                      )}
                      <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                        {model.level}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400">✉️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2">
                      {model.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                    {model.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {model.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full group-hover:bg-primary-700 transition-colors"
                      onClick={() => handleModelClick(model)}
                    >
                      Utiliser ce modèle
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-neutral-400 dark:text-neutral-500 mb-4 text-5xl">🔍</div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Aucun modèle trouvé
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Essayez de modifier vos critères de recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
