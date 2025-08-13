'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, X, ArrowClockwise, CheckCircle, Warning } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContractDropzoneProps {
  onFileUploaded: (file: File) => void;
  onFileRemoved: () => void;
  currentFile?: File;
  isAnalyzing?: boolean;
}

export default function ContractDropzone({ 
  onFileUploaded, 
  onFileRemoved, 
  currentFile, 
  isAnalyzing 
}: ContractDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUploaded(acceptedFiles[0]);
    }
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 10 * 1024 * 1024, // 10 MB
    multiple: false
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'docx':
        return <FileText className="w-8 h-8 text-blue-500" />;
      case 'txt':
        return <FileText className="w-8 h-8 text-gray-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileText className="w-8 h-8 text-green-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  if (currentFile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getFileIcon(currentFile.name)}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {currentFile.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatFileSize(currentFile.size)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isAnalyzing ? (
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <ArrowClockwise className="w-5 h-5 animate-spin" />
                <span className="text-sm">Analyse en cours...</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onFileUploaded(currentFile)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <ArrowClockwise className="w-4 h-4" />
                  <span>Reprocesser</span>
                </button>
                <button
                  onClick={onFileRemoved}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Supprimer</span>
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed transition-colors ${
        isDragActive || dragActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-300 dark:border-gray-600'
      }`}
    >
      <div
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        {...getRootProps()}
      >
      <input {...getInputProps()} />
      
      <div className="p-8 text-center">
        <motion.div
          animate={{ scale: isDragActive ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4"
        >
          <Upload className="w-8 h-8 text-gray-400" />
        </motion.div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {isDragActive ? 'Déposez votre contrat ici' : 'Glissez-déposez votre contrat'}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          ou cliquez pour sélectionner un fichier
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">PDF</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">DOCX</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">TXT</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">JPG/PNG</span>
        </div>
        
                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
           Taille maximale : 10 MB
         </p>
       </div>
       </div>
     </motion.div>
   );
 }

