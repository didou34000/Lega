'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeSlash, User, Envelope, Lock, CheckCircle } from 'phosphor-react';
import Button from '@/components/ui/Button';
import { useToasts } from '@/components/ui/Toast';
import Link from 'next/link';

export default function SignupPage() {
  const toast = useToasts();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return { minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.showError('Veuillez remplir tous les champs');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.showError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!formData.acceptTerms) {
      toast.showError('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    if (!Object.values(passwordValidation).every(Boolean)) {
      toast.showError('Le mot de passe ne respecte pas les critères de sécurité');
      return;
    }

    setIsLoading(true);
    
    // Simulation d'inscription
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.showSuccess('Compte créé avec succès !', 'Bienvenue sur Formalités France');
    setIsLoading(false);
    
    // Redirection vers la page d'accueil
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Bouton retour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </motion.div>

        {/* Carte d'inscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Créer un compte
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Rejoignez Formalités France gratuitement
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Prénom
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:border-primary-500 focus:outline-none bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-colors"
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:border-primary-500 focus:outline-none bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-colors"
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                  <Envelope size={20} />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:border-primary-500 focus:outline-none bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-colors"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:border-primary-500 focus:outline-none bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-colors"
                  placeholder="Votre mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Validation du mot de passe */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className={passwordValidation.minLength ? 'text-green-500' : 'text-neutral-400'} />
                  <span className={`text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-neutral-500'}`}>
                    Au moins 8 caractères
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className={passwordValidation.hasUpperCase ? 'text-green-500' : 'text-neutral-400'} />
                  <span className={`text-xs ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-neutral-500'}`}>
                    Une majuscule
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className={passwordValidation.hasLowerCase ? 'text-green-500' : 'text-neutral-400'} />
                  <span className={`text-xs ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-neutral-500'}`}>
                    Une minuscule
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className={passwordValidation.hasNumbers ? 'text-green-500' : 'text-neutral-400'} />
                  <span className={`text-xs ${passwordValidation.hasNumbers ? 'text-green-600' : 'text-neutral-500'}`}>
                    Un chiffre
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={16} className={passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-neutral-400'} />
                  <span className={`text-xs ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-neutral-500'}`}>
                    Un caractère spécial
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-neutral-300 dark:border-neutral-600 rounded-xl focus:border-primary-500 focus:outline-none bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 transition-colors"
                  placeholder="Confirmez votre mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
                required
              />
              <label className="text-sm text-neutral-600 dark:text-neutral-400">
                J'accepte les{' '}
                <Link href="/cgu" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Conditions d'utilisation
                </Link>
                {' '}et la{' '}
                <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Politique de confidentialité
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Création du compte...
                </>
              ) : (
                'Créer mon compte'
              )}
            </Button>
          </form>

          {/* Lien de connexion */}
          <div className="text-center mt-8">
            <p className="text-neutral-600 dark:text-neutral-400">
              Déjà un compte ?{' '}
              <Link
                href="/login"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            En créant un compte, vous acceptez nos{' '}
            <Link href="/cgu" className="hover:underline">Conditions d'utilisation</Link>
            {' '}et notre{' '}
            <Link href="/privacy" className="hover:underline">Politique de confidentialité</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
