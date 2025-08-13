import React from 'react';

interface InputProps {
  id: string;
  label?: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  help?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  help,
  className = ''
}) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent';
  const errorClasses = error ? 'border-red-300 focus:ring-red-500' : 'border-neutral-300 focus:border-primary-500';
  const darkClasses = 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600';
  
  const classes = `${baseClasses} ${errorClasses} ${darkClasses} ${className}`;
  
  if (type === 'textarea') {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={classes}
        />
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {help && <p className="text-sm text-neutral-500 dark:text-neutral-400">{help}</p>}
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={classes}
      />
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {help && <p className="text-sm text-neutral-500 dark:text-neutral-400">{help}</p>}
    </div>
  );
};

export default Input;
