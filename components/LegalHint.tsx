'use client';

import React from 'react';

interface LegalHintProps {
  type: 'info' | 'warning';
  message: string;
  className?: string;
}

export default function LegalHint({ type, message, className = '' }: LegalHintProps) {
  const getIcon = () => {
    switch (type) {
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div className={`border rounded-lg p-3 ${getColors()} ${className}`}>
      <div className="flex items-start space-x-2">
        <span className="flex-shrink-0 mt-0.5">{getIcon()}</span>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

