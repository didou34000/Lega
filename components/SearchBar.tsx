'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Icône retirée pour compatibilité RSC
import Button from '@/components/ui/Button';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Cherchez une formalité : résiliation, assurance, banque...",
  onSearch,
  className = ''
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-4 pl-14 pr-32 text-lg bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-600 rounded-2xl focus:border-primary-500 focus:outline-none transition-colors duration-200 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400"
        />
        
        {/* Search Icon (remplacée) */}
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-neutral-400">
          <span className="text-xl">🔍</span>
        </div>
        
        {/* Search Button */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="px-6 py-2"
          >
            Rechercher
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchBar;
