'use client';

import Link from 'next/link';

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Bouton retour */}
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <span className="mr-2">←</span>
          Retour à l'accueil
        </Link>

        {/* Titre */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Questions Fréquentes</h1>
          <p className="text-lg text-gray-600">Tout ce que vous devez savoir sur nos services</p>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          
          {/* Section Général */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Général</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Qu'est-ce que Legam ?</h3>
                <p className="text-gray-700">
                  Legam est votre assistant juridique en ligne pour générer des lettres et documents légaux en toute simplicité. 
                  Nous proposons des modèles gratuits et professionnels pour vos démarches administratives.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Les modèles sont-ils gratuits ?</h3>
                <p className="text-gray-700">
                  Oui, tous nos modèles de lettres sont entièrement gratuits. Vous pouvez les télécharger et les utiliser 
                  sans aucune restriction.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Les lettres sont-elles juridiquement valides ?</h3>
                <p className="text-gray-700">
                  Nos modèles respectent les exigences légales françaises et sont régulièrement mis à jour. 
                  Cependant, ils sont fournis à titre informatif et ne constituent pas un conseil juridique personnalisé.
                </p>
              </div>
            </div>
          </section>

          {/* Section Résiliations */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Résiliations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Comment résilier un abonnement internet ?</h3>
                <p className="text-gray-700">
                  La résiliation d'un abonnement internet peut se faire par lettre recommandée avec accusé de réception (LRAR) 
                  ou en ligne selon votre opérateur. Le préavis légal maximum est de 10 jours.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quels sont les motifs de résiliation valables ?</h3>
                <p className="text-gray-700">
                  Les motifs valables incluent : fin d'engagement, déménagement, hausse tarifaire, 
                  motif légitime (licenciement, hospitalisation), et application de la loi Chatel.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Comment résilier une assurance ?</h3>
                <p className="text-gray-700">
                  Après 12 mois (loi Hamon), vous pouvez résilier à tout moment. Sinon, la résiliation se fait généralement 
                  à l'échéance annuelle ou en cas de changement de situation.
                </p>
              </div>
            </div>
          </section>

          {/* Section Logement */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Logement</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Quelle est la durée de préavis pour un logement ?</h3>
                <p className="text-gray-700">
                  Le préavis est généralement de 3 mois pour un logement vide, 1 mois pour un logement meublé. 
                  Il peut être réduit à 1 mois en zone tendue ou pour certains motifs légitimes.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Comment contester un état des lieux ?</h3>
                <p className="text-gray-700">
                  Vous devez envoyer une lettre de contestation dans les 2 mois suivant la remise des clés, 
                  en détaillant les points contestés et en fournissant des preuves (photos, témoignages).
                </p>
              </div>
            </div>
          </section>

          {/* Section Banque */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Banque</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">La clôture de compte est-elle gratuite ?</h3>
                <p className="text-gray-700">
                  Oui, la clôture de compte bancaire est gratuite pour les particuliers. 
                  Seuls les frais de services jusqu'à la date de résiliation peuvent être facturés.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Comment utiliser la mobilité bancaire ?</h3>
                <p className="text-gray-700">
                  La mobilité bancaire permet de transférer gratuitement vos services bancaires vers une nouvelle banque. 
                  Elle prend en charge la redirection des virements et prélèvements.
                </p>
              </div>
            </div>
          </section>

          {/* Section Contact */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact et Support</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Comment contacter le support ?</h3>
                <p className="text-gray-700">
                  Vous pouvez nous contacter par email à contact@legam.fr ou par téléphone au 01 23 45 67 89. 
                  Notre équipe est disponible du lundi au vendredi de 9h à 18h.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Proposez-vous un conseil juridique personnalisé ?</h3>
                <p className="text-gray-700">
                  Non, nos services se limitent à la fourniture de modèles de lettres. 
                  Pour un conseil juridique personnalisé, nous vous recommandons de consulter un avocat.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
