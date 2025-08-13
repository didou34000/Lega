'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  FileText, 
  Calendar, 
  CurrencyEur, 
  Warning, 
  CheckCircle,
  ArrowRight,
  Brain,
  Clock,
  ShieldCheck
} from 'phosphor-react';
import { AiAnalysis } from '@/services/ai/AiAnalyzer';
import { createContractParser } from '@/services/contract/ContractParser';
import { createAiAnalyzer } from '@/services/ai/AiAnalyzer';
import { RawExtraction } from '@/services/contract/ContractParser';
import ContractDropzone from './ContractDropzone';
import AiChip from './AiChip';
import ParsingProgress from './ParsingProgress';
import { useToast } from './ToastProvider';

interface AiBarProps {
  isOpen: boolean;
  onClose: () => void;
  onPreFillForm?: (fieldMapping: Record<string, string>) => void;
  suggestedFormalitySlug?: string;
}

export default function AiBar({ 
  isOpen, 
  onClose, 
  onPreFillForm,
  suggestedFormalitySlug 
}: AiBarProps) {
  const toast = useToast();
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setCurrentFile(file);
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);
    setCurrentStep(1);

    try {
      const parser = createContractParser();
      const analyzer = createAiAnalyzer();
      
      // Simuler les étapes de progression
      setTimeout(() => setCurrentStep(2), 500);
      setTimeout(() => setCurrentStep(3), 1500);
      setTimeout(() => setCurrentStep(4), 2500);
      
      const extraction = await parser.parse(file);
      const aiAnalysis = await analyzer.analyze(extraction);
      
      setAnalysis(aiAnalysis);
    } catch (err) {
      setError('Erreur lors de l\'analyse du contrat');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePreFillForm = () => {
    if (analysis?.fieldMapping && onPreFillForm) {
      onPreFillForm(analysis.fieldMapping);
      onClose();
    }
  };

  const handleExportAnalysis = () => {
    if (!analysis) return;
    
    const dataStr = JSON.stringify(analysis, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analyse-contrat-${currentFile?.name || 'unknown'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateLetter = () => {
    // Toast de fonctionnalité à venir
    toast.showInfo('Génération de lettre', 'Fonctionnalité à venir');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Barre IA */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Analyse IA
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analyse locale simulée
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Upload Zone */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Analyser un contrat
                </h3>
                <ContractDropzone
                  onFileUploaded={handleFileUpload}
                  onFileRemoved={() => {
                    setCurrentFile(null);
                    setAnalysis(null);
                    setError(null);
                  }}
                  currentFile={currentFile || undefined}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              {/* Disclaimer */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">Analyse locale simulée</p>
                    <p>Aucun envoi externe. Lorsque l'IA distante sera activée, un consentement explicite sera requis.</p>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-6"
                >
                  <ParsingProgress 
                    currentStep={currentStep} 
                    totalSteps={4}
                    message="Analyse de votre contrat en cours..."
                  />
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                >
                  <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Analysis Results */}
              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Résumé */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Résumé
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <ul className="space-y-2">
                        {analysis.summary.map((item, index) => (
                          <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Acteur détecté */}
                  {analysis.actorType && analysis.actorName && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <Brain className="w-4 h-4 mr-2" />
                        Acteur détecté
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{analysis.actorName}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {analysis.actorType.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </p>
                          </div>
                          {analysis.suggestedFormalitySlug && (
                            <button
                              onClick={handlePreFillForm}
                              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              <span>Pré-remplir</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Clauses clés */}
                  {analysis.keyClauses.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Clauses clés
                      </h3>
                      <div className="space-y-3">
                        {analysis.keyClauses.map((clause, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                              {clause.title}
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                              {clause.snippet}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              <strong>Impact :</strong> {clause.impact}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dates & Délais */}
                  {analysis.dates.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Dates & Délais
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="space-y-2">
                          {analysis.dates.map((date, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-700 dark:text-gray-300">{date.label}</span>
                              <span className="font-medium text-gray-900 dark:text-white">{date.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Frais & Pénalités */}
                  {analysis.fees.length > 0 && (
                    <div>
                                           <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                       <CurrencyEur className="w-4 h-4 mr-2" />
                       Frais & Pénalités
                     </h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <div className="space-y-2">
                          {analysis.fees.map((fee, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-700 dark:text-gray-300">{fee.label}</span>
                              <span className="font-medium text-gray-900 dark:text-white">{fee.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Risques & Attention */}
                  {analysis.risks.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                        <Warning className="w-4 h-4 mr-2" />
                        Risques & Attention
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <ul className="space-y-2">
                          {analysis.risks.map((risk, index) => (
                            <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                              <Warning className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Niveau de confiance */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Niveau de confiance
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <AiChip 
                        type={analysis.confidence === 'Élevé' ? 'success' : analysis.confidence === 'Moyen' ? 'warning' : 'error'}
                        label={`Confiance ${analysis.confidence}`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Actions */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-3"
              >
                <button
                  onClick={handlePreFillForm}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Pré-remplir le formulaire</span>
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleGenerateLetter}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Générer la lettre</span>
                  </button>
                  
                  <button
                    onClick={handleExportAnalysis}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exporter (.json)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

