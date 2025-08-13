'use client';

import React from 'react';
import Link from 'next/link';

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4">
              ← Retour à l'accueil
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Conditions Générales d'Utilisation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Acceptation des conditions
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                En utilisant ce service, vous acceptez d'être lié par ces conditions générales d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Description du service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ce service vous permet de générer des lettres et documents administratifs de manière automatisée 
                en fonction des informations que vous fournissez. Le service est fourni "en l'état" et nous nous 
                efforçons de maintenir sa disponibilité.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Utilisation du service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Vous vous engagez à :
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Fournir des informations exactes et à jour</li>
                <li>Utiliser le service conformément à la législation applicable</li>
                <li>Ne pas utiliser le service à des fins frauduleuses ou illégales</li>
                <li>Respecter les droits de propriété intellectuelle</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Limitation de responsabilité
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Les documents générés sont fournis à titre indicatif. Nous ne pouvons garantir leur conformité 
                à toutes les situations spécifiques. Il est de votre responsabilité de vérifier et adapter 
                les documents selon vos besoins particuliers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Protection des données
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Vos données personnelles sont traitées conformément à notre politique de confidentialité. 
                Nous nous engageons à protéger vos informations et à ne les utiliser que dans le cadre 
                de la fourniture du service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Modifications
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications 
                seront publiées sur cette page avec une nouvelle date de mise à jour.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Contact
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Pour toute question concernant ces conditions, vous pouvez nous contacter via notre 
                <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                  page de contact
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
