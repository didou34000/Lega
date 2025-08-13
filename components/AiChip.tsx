'use client';

import React from 'react';

interface AiChipProps {
  type: 'success' | 'warning' | 'error';
  label: string;
  className?: string;
}

export default function AiChip({ type, label, className = '' }: AiChipProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✖';
      default:
        return '✓';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800';
      default:
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800';
    }
  };

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getColors()} ${className}`}>
      <span className="text-xs">{getIcon()}</span>
      <span>{label}</span>
    </div>
  );
}
