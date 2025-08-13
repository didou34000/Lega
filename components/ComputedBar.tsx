'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ComputedBarProps {
  title: string;
  value: string;
  type: 'date' | 'location' | 'calculation' | 'info';
  className?: string;
}

export default function ComputedBar({ title, value, type, className = '' }: ComputedBarProps) {
  const getIcon = () => {
    switch (type) {
      case 'date':
        return '📅';
      case 'location':
        return '📍';
      case 'calculation':
        return '🧮';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 dark:text-blue-400 text-sm">{getIcon()}</span>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
