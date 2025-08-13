import Link from 'next/link';

export default function Cookies() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique relative aux cookies</h1>
          <p className="text-lg text-gray-600">Comment nous utilisons les cookies sur notre site</p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Qu'est-ce qu'un cookie */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 rounded mr-3"></span>
              Qu'est-ce qu'un cookie ?
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile 
                lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos 
                actions et préférences (identifiant de connexion, langue, taille des caractères et 
                autres paramètres d'affichage) pendant une durée déterminée.
              </p>
              <p>
                Les cookies ne peuvent pas exécuter de code ou contenir des virus. Ils ne peuvent 
                pas accéder aux autres fichiers de votre ordinateur.
              </p>
            </div>
          </section>

          {/* Types de cookies utilisés */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types de cookies utilisés</h2>
            <div className="space-y-6">
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookies essentiels</h3>
                <p className="text-gray-700">
                  Ces cookies sont nécessaires au fonctionnement du site. Ils permettent notamment 
                  de mémoriser vos préférences de langue et de sécurité. Sans ces cookies, 
                  le site ne peut pas fonctionner correctement.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookies de performance</h3>
                <p className="text-gray-700">
                  Ces cookies collectent des informations sur la façon dont vous utilisez le site 
                  (pages visitées, temps passé, erreurs rencontrées). Ils nous aident à améliorer 
                  les performances du site.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookies de fonctionnalité</h3>
                <p className="text-gray-700">
                  Ces cookies permettent au site de mémoriser vos choix et de vous proposer 
                  des fonctionnalités personnalisées (nom d'utilisateur, langue, région).
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cookies publicitaires</h3>
                <p className="text-gray-700">
                  Ces cookies sont utilisés pour vous proposer des publicités pertinentes 
                  en fonction de vos centres d'intérêt et de votre navigation.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies tiers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies tiers</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Certains cookies peuvent être placés par des services tiers (Google Analytics, 
                réseaux sociaux, etc.) pour nous aider à analyser l'utilisation du site et 
                améliorer nos services.
              </p>
              <p>
                Ces tiers peuvent également utiliser les cookies pour leurs propres finalités 
                (publicité, analyse, etc.). Nous vous invitons à consulter leurs politiques 
                de confidentialité respectives.
              </p>
            </div>
          </section>

          {/* Durée de vie des cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Durée de vie des cookies</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Cookies de session :</strong> Ils sont supprimés automatiquement 
                lorsque vous fermez votre navigateur.
              </p>
              <p>
                <strong>Cookies persistants :</strong> Ils restent sur votre appareil 
                jusqu'à leur date d'expiration ou jusqu'à ce que vous les supprimiez manuellement.
              </p>
            </div>
          </section>

          {/* Gestion des cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comment gérer les cookies ?</h2>
            <div className="space-y-4">
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Via notre bannière</h3>
                <p className="text-gray-700">
                  Lors de votre première visite, une bannière vous informe de l'utilisation 
                  des cookies et vous permet de les accepter ou de les refuser.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Via votre navigateur</h3>
                <p className="text-gray-700">
                  Vous pouvez configurer votre navigateur pour refuser tous les cookies 
                  ou être informé quand un cookie est déposé. Consultez l'aide de votre 
                  navigateur pour plus d'informations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Suppression des cookies</h3>
                <p className="text-gray-700">
                  Vous pouvez supprimer les cookies déjà présents sur votre appareil 
                  via les paramètres de votre navigateur.
                </p>
              </div>
            </div>
          </section>

          {/* Conséquences du refus */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conséquences du refus des cookies</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Si vous refusez les cookies, certaines fonctionnalités du site peuvent 
                ne pas fonctionner correctement. Vous pourriez ne pas pouvoir :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Mémoriser vos préférences</li>
                <li>Accéder à certaines fonctionnalités personnalisées</li>
                <li>Bénéficier d'une expérience optimale</li>
              </ul>
            </div>
          </section>

          {/* Mise à jour de la politique */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Mise à jour de cette politique</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Cette politique relative aux cookies peut être mise à jour. 
                Nous vous informerons de tout changement important.
              </p>
              <p>
                Nous vous recommandons de consulter régulièrement cette page 
                pour prendre connaissance des éventuelles modifications.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nous contacter</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Pour toute question concernant notre utilisation des cookies, 
                vous pouvez nous contacter :
              </p>
              <div className="space-y-2">
                <p><strong>Email :</strong> <a href="mailto:contact@legam.fr" className="text-blue-600 hover:underline">contact@legam.fr</a></p>
                <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                <p><strong>Adresse :</strong> 123 Rue de la Paix, 75001 Paris, France</p>
              </div>
            </div>
          </section>
        </div>

        {/* Dernière mise à jour */}
        <div className="text-center mt-8 text-gray-500">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>
    </div>
  );
}
