'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Brain, Lock, CheckCircle } from 'phosphor-react';
import { CONSENT_MODAL_CONTENT } from '@/services/ai/AiBridge';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsent: (hasConsented: boolean) => void;
}

export default function ConsentModal({ isOpen, onClose, onConsent }: ConsentModalProps) {
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [hasReadPrivacy, setHasReadPrivacy] = useState(false);

  const handleConsent = (consent: boolean) => {
    if (consent && (!hasReadTerms || !hasReadPrivacy)) {
      return; // Cannot consent without reading
    }
    onConsent(consent);
    onClose();
  };

  const canConsent = hasReadTerms && hasReadPrivacy;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {CONSENT_MODAL_CONTENT.title}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {CONSENT_MODAL_CONTENT.description}
                </p>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Avantages de l'IA distante
                  </h3>
                  <ul className="space-y-2">
                    {CONSENT_MODAL_CONTENT.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Privacy */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                    <Lock className="w-5 h-5 text-blue-500 mr-2" />
                    Protection de vos données
                  </h3>
                  <ul className="space-y-2">
                    {CONSENT_MODAL_CONTENT.privacy.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Note */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note :</strong> {CONSENT_MODAL_CONTENT.required}
                  </p>
                </div>

                {/* Checkboxes */}
                <div className="mt-6 space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasReadTerms}
                      onChange={(e) => setHasReadTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      J'ai lu et compris les conditions d'utilisation de l'IA distante
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasReadPrivacy}
                      onChange={(e) => setHasReadPrivacy(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      J'ai lu et compris la politique de confidentialité
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleConsent(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Continuer sans IA distante
                  </button>
                  <button
                    onClick={() => handleConsent(true)}
                    disabled={!canConsent}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      canConsent
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Activer l'IA distante
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
