'use client';

import React, { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
// Icônes externes retirées pour compatibilité RSC
import Button from '@/components/ui/Button';
import { useToasts } from '@/components/ui/Toast';
import { getModelBySlug } from '@/data/models';
import SmartForm from '@/components/SmartForm';

export default function ModelPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToasts();
  
  const slug = params.slug as string;
  const model = getModelBySlug(slug);
  const showAnalyze = searchParams.get('analyze') === 'true';

  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!model) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Modèle non trouvé
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Le modèle que vous recherchez n'existe pas.
          </p>
          <Button variant="primary" onClick={() => router.back()}>
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const handleFormSubmit = (values: Record<string, any>) => {
    setFormData(values);
    toast.showSuccess('Formulaire validé avec succès !');
  };

  const generateLetter = () => {
    // Créer un template de lettre basé sur le modèle et les données
    let letter = `Madame, Monsieur,

Par la présente, je vous informe de ma demande concernant ${model.title.toLowerCase()}.

**Informations personnelles :**
- Nom et prénom : ${formData.nomPrenom || '[NOM ET PRÉNOM]'}
- Adresse : ${formData.adresse || '[ADRESSE]'}
- Téléphone : ${formData.telephone || '[TÉLÉPHONE]'}
- Email : ${formData.email || '[EMAIL]'}

**Informations spécifiques :**`;

    // Ajouter les champs spécifiques au modèle
    model.fields.forEach(field => {
      if (field.name !== 'nomPrenom' && field.name !== 'adresse' && field.name !== 'telephone' && field.name !== 'email') {
        letter += `\n- ${field.label} : ${formData[field.name] || `[${field.name.toUpperCase()}]`}`;
      }
    });

    letter += `

Je vous prie de bien vouloir traiter ma demande dans les plus brefs délais.

Je vous remercie de me confirmer la bonne réception de cette demande.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${formData.nomPrenom || '[NOM ET PRÉNOM]'}`;

    return letter;
  };

  const handleDownload = () => {
    const letter = generateLetter();
    
    // Créer un PDF simple avec jsPDF (version simplifiée)
    try {
      // Pour l'instant, on télécharge en TXT
      handleDownloadTxt();
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      toast.showError('Erreur lors du téléchargement');
    }
  };

  const handleDownloadTxt = () => {
    const letter = generateLetter();
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${model.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.showSuccess('Lettre téléchargée en TXT !');
  };

  const handleAnalyzeContract = () => {
    toast.showInfo('Fonctionnalité d\'analyse IA à venir !');
  };

  const handleSendRegistered = () => {
    toast.showInfo('Service d\'envoi en recommandé à venir !');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="mb-4"
          >
            <span className="mr-2">←</span>
            Retour
              </Button>
          
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              {model.title}
            </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                {model.description}
              </p>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                {model.category}
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                Gratuit
                </span>
              </div>
            </div>
        </div>

        {/* Section Analyse IA */}
        {showAnalyze && (
              <div className="mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span>🧠</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Analyse IA de contrat
                </h3>
              </div>
              <p className="text-blue-800 dark:text-blue-200 mb-4">
                Uploadez votre contrat pour que notre IA l'analyse et pré-remplisse automatiquement le formulaire.
              </p>
              <Button
                variant="primary"
                onClick={handleAnalyzeContract}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Analyser mon contrat
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire SmartForm */}
          <div
            className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700"
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
              Remplissez le formulaire
            </h2>
            
            <SmartForm
              ruleId={model.ruleId}
              onGenerate={handleFormSubmit}
            />
          </div>

          {/* Prévisualisation */}
          <div
            className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Prévisualisation
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <span className="mr-2">{showPreview ? '🙈' : '👁️'}</span>
                {showPreview ? 'Masquer' : 'Aperçu'}
              </Button>
            </div>
            
            {showPreview ? (
              <div className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm text-neutral-900 dark:text-neutral-100 font-sans">
                  {generateLetter()}
                </pre>
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                <span className="mx-auto mb-4 block text-4xl">📄</span>
                <p>Remplissez le formulaire et cliquez sur "Aperçu" pour voir votre lettre générée</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleDownload}
                className="w-full"
                disabled={!formData.nomPrenom || !formData.adresse}
              >
                <span className="mr-2">⬇</span>
                Télécharger la lettre en PDF
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleDownloadTxt}
                className="w-full"
              >
                <span className="mr-2">📄</span>
                Télécharger la lettre en TXT
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSendRegistered}
                className="w-full"
              >
                <span className="mr-2">✉️</span>
                Envoyer en recommandé
              </Button>
            </div>
            
            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-600 dark:text-yellow-400 mt-0.5">⚠</span>
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <p className="font-medium mb-1">Informations importantes</p>
                  <p>
                    Les informations fournies sont à titre indicatif. Vérifiez vos conditions contractuelles 
                    et la réglementation applicable. Ce service n'est pas un site officiel de l'État.
              </p>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
