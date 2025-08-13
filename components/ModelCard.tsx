'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Formalite } from '@/data/catalog';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { categories } from '@/data/catalog';

interface ModelCardProps {
  model: Formalite;
  index?: number;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, index = 0 }) => {
  const categoryInfo = categories[model.categorie];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm hover:shadow-lg border border-neutral-200 dark:border-neutral-700 transition-all duration-200 overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${categoryInfo.color}`}>
              <span className="text-lg">📄</span>
            </div>
            <Badge variant="info" size="sm">
              {model.niveau}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2">
            {model.titre}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {model.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {model.tags.map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6">
          <Link href={`/modeles/${model.slug}`}>
            <Button variant="primary" size="md" className="w-full">
              Ouvrir
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ModelCard;
