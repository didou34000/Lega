'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useToasts, ToastContainer } from './ui/Toast';

interface ToastContextType {
  showSuccess: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toastUtils = useToasts();

  return (
    <ToastContext.Provider value={toastUtils}>
      {children}
      <ToastContainer toasts={toastUtils.toasts} onClose={toastUtils.removeToast} />
    </ToastContext.Provider>
  );
};
