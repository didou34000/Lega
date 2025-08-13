import Link from 'next/link';

export default function PolitiqueConfidentialite() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de confidentialité</h1>
          <p className="text-lg text-gray-600">Comment nous protégeons vos données personnelles</p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 rounded mr-3"></span>
              Introduction
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Legam s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité 
                explique comment nous collectons, utilisons et protégeons vos informations personnelles.
              </p>
              <p>
                En utilisant notre service, vous acceptez les pratiques décrites dans cette politique.
              </p>
            </div>
          </section>

          {/* Collecte des données */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Collecte des données</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Données que vous nous fournissez</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Informations d'identification (nom, prénom, email)</li>
                  <li>Données de contact (téléphone, adresse)</li>
                  <li>Informations saisies dans les formulaires</li>
                  <li>Documents et justificatifs uploadés</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Données collectées automatiquement</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Adresse IP et informations de navigation</li>
                  <li>Cookies et technologies similaires</li>
                  <li>Données d'utilisation du service</li>
                  <li>Informations techniques sur votre appareil</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Utilisation des données */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Utilisation des données</h2>
            <div className="space-y-3 text-gray-700">
              <p>Nous utilisons vos données pour :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fournir et améliorer nos services</li>
                <li>Générer vos documents personnalisés</li>
                <li>Répondre à vos demandes et questions</li>
                <li>Assurer la sécurité et la qualité du service</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </div>
          </section>

          {/* Partage des données */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Partage des données</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Nous ne vendons, n'échangeons ni ne louons vos données personnelles à des tiers. 
                Nous pouvons partager vos informations uniquement dans les cas suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Avec votre consentement explicite</li>
                <li>Pour respecter une obligation légale</li>
                <li>Avec nos prestataires de services (hébergement, support)</li>
                <li>Pour protéger nos droits et la sécurité des utilisateurs</li>
              </ul>
            </div>
          </section>

          {/* Sécurité des données */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sécurité des données</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Nous mettons en place des mesures de sécurité appropriées pour protéger vos données :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Chiffrement des données en transit et au repos</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Surveillance continue de la sécurité</li>
                <li>Formation du personnel à la protection des données</li>
              </ul>
            </div>
          </section>

          {/* Conservation des données */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conservation des données</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Nous conservons vos données personnelles uniquement le temps nécessaire 
                aux finalités pour lesquelles elles ont été collectées :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Données de compte : durée de vie du compte + 3 ans</li>
                <li>Documents générés : 5 ans</li>
                <li>Données de navigation : 13 mois maximum</li>
                <li>Données de contact : 3 ans après dernier contact</li>
              </ul>
            </div>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vos droits</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Droit d'accès</h3>
                  <p className="text-blue-800 text-sm">
                    Obtenir une copie de vos données personnelles
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Droit de rectification</h3>
                  <p className="text-green-800 text-sm">
                    Corriger des données inexactes ou incomplètes
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">Droit à l'effacement</h3>
                  <p className="text-red-800 text-sm">
                    Demander la suppression de vos données
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Droit à la portabilité</h3>
                  <p className="text-purple-800 text-sm">
                    Recevoir vos données dans un format structuré
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                Pour plus d'informations, consultez notre 
                <Link href="/cookies" className="text-blue-600 hover:underline"> politique relative aux cookies</Link>.
              </p>
            </div>
          </section>

          {/* Transferts hors UE */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Transferts hors Union Européenne</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Vos données sont principalement traitées en France. Si des transferts 
                hors UE sont nécessaires, nous nous assurons qu'ils bénéficient de garanties 
                appropriées (clauses contractuelles types, décisions d'adéquation).
              </p>
            </div>
          </section>

          {/* Modifications de la politique */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modifications de cette politique</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Cette politique de confidentialité peut être mise à jour. 
                Nous vous informerons de tout changement important.
              </p>
              <p>
                Nous vous recommandons de consulter régulièrement cette page 
                pour prendre connaissance des éventuelles modifications.
              </p>
            </div>
          </section>

          {/* Contact DPO */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nous contacter</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Pour toute question concernant cette politique de confidentialité 
                ou pour exercer vos droits, contactez-nous :
              </p>
              <div className="space-y-2">
                <p><strong>Email :</strong> <a href="mailto:contact@legam.fr" className="text-blue-600 hover:underline">contact@legam.fr</a></p>
                <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                <p><strong>Adresse :</strong> 123 Rue de la Paix, 75001 Paris, France</p>
              </div>
              <p className="text-sm mt-4">
                <strong>DPO :</strong> Notre Délégué à la Protection des Données est joignable 
                à l'adresse email ci-dessus.
              </p>
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
