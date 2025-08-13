import Link from 'next/link';

export default function RGPD() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Vos droits RGPD</h1>
          <p className="text-lg text-gray-600">Comment exercer vos droits de protection des données</p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Introduction RGPD */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 rounded mr-3"></span>
              Qu'est-ce que le RGPD ?
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Le Règlement Général sur la Protection des Données (RGPD) est un texte européen 
                qui renforce la protection des données personnelles des citoyens de l'Union Européenne.
              </p>
              <p>
                Il vous donne des droits concrets sur vos données personnelles et impose aux 
                organisations des obligations strictes en matière de protection de la vie privée.
              </p>
            </div>
          </section>

          {/* Vos droits fondamentaux */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vos droits fondamentaux</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Droit d'accès</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Vous pouvez demander à connaître les données que nous détenons sur vous, 
                  leur origine, leur finalité et les destinataires.
                </p>
                <div className="text-xs text-blue-700">
                  <strong>Délai de réponse :</strong> 1 mois maximum
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-3">Droit de rectification</h3>
                <p className="text-green-800 text-sm mb-3">
                  Vous pouvez demander la correction de données inexactes ou incomplètes 
                  concernant votre identité, vos coordonnées, etc.
                </p>
                <div className="text-xs text-green-700">
                  <strong>Délai de réponse :</strong> 1 mois maximum
                </div>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-red-900 mb-3">Droit à l'effacement</h3>
                <p className="text-red-800 text-sm mb-3">
                  Vous pouvez demander la suppression de vos données dans certains cas 
                  (retrait du consentement, données illégalement traitées, etc.).
                </p>
                <div className="text-xs text-red-700">
                  <strong>Délai de réponse :</strong> 1 mois maximum
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Droit à la portabilité</h3>
                <p className="text-purple-800 text-sm mb-3">
                  Vous pouvez recevoir vos données dans un format structuré et les 
                  transmettre à un autre responsable de traitement.
                </p>
                <div className="text-xs text-purple-700">
                  <strong>Délai de réponse :</strong> 1 mois maximum
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Droit d'opposition</h3>
                <p className="text-orange-800 text-sm mb-3">
                  Vous pouvez vous opposer au traitement de vos données pour des raisons 
                  tenant à votre situation particulière.
                </p>
                <div className="text-xs text-orange-700">
                  <strong>Délai de réponse :</strong> 1 mois maximum
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-900 mb-3">Droit de limitation</h3>
                <p className="text-indigo-800 text-sm mb-3">
                  Vous pouvez demander la limitation du traitement de vos données 
                  dans certains cas spécifiques.
                </p>
                <div className="text-xs text-indigo-700">
                  <strong>Délai de réponse :</strong> 1 mois maximum
                </div>
              </div>
            </div>
          </section>

          {/* Comment exercer vos droits */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comment exercer vos droits ?</h2>
            <div className="space-y-4">
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Contactez notre DPO</h3>
                <p className="text-gray-700 mb-3">
                  Adressez votre demande à notre Délégué à la Protection des Données (DPO) :
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email :</strong> <a href="mailto:contact@legam.fr" className="text-blue-600 hover:underline">contact@legam.fr</a></p>
                  <p><strong>Adresse :</strong> 123 Rue de la Paix, 75001 Paris, France</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Vérifiez votre identité</h3>
                <p className="text-gray-700">
                  Pour des raisons de sécurité, nous devons vérifier votre identité avant de traiter votre demande. 
                  Préparez une copie de votre pièce d'identité.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Délai de réponse</h3>
                <p className="text-gray-700">
                  Nous nous engageons à répondre à votre demande dans un délai maximum d'un mois. 
                  Si la demande est complexe, ce délai peut être porté à 3 mois.
                </p>
              </div>
            </div>
          </section>

          {/* Plainte auprès de la CNIL */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Droit de plainte auprès de la CNIL</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Si vous estimez que vos droits ne sont pas respectés ou que le traitement 
                de vos données personnelles constitue une violation du RGPD, vous avez le 
                droit de déposer une plainte auprès de la Commission Nationale de l'Informatique 
                et des Libertés (CNIL).
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Comment déposer une plainte ?</h3>
                <ul className="list-disc list-inside space-y-1 text-yellow-800 text-sm">
                  <li>En ligne sur le site de la CNIL : <a href="https://www.cnil.fr" className="underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></li>
                  <li>Par courrier : CNIL - 3 Place de Fontenoy - 75007 Paris</li>
                  <li>Par téléphone : 01 53 73 22 22</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Nos engagements */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nos engagements RGPD</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Legam s'engage à respecter vos droits et à traiter vos données personnelles 
                de manière transparente et sécurisée :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Transparence :</strong> Nous vous informons clairement de l'utilisation de vos données</li>
                <li><strong>Minimisation :</strong> Nous ne collectons que les données strictement nécessaires</li>
                <li><strong>Sécurité :</strong> Nous protégeons vos données avec des mesures techniques appropriées</li>
                <li><strong>Responsabilité :</strong> Nous nous tenons responsables du traitement de vos données</li>
                <li><strong>Formation :</strong> Notre équipe est formée aux bonnes pratiques RGPD</li>
              </ul>
            </div>
          </section>

          {/* Contact et assistance */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Besoin d'aide ?</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Notre équipe est là pour vous accompagner dans l'exercice de vos droits RGPD. 
                N'hésitez pas à nous contacter :
              </p>
              <div className="space-y-2">
                <p><strong>Email :</strong> <a href="mailto:contact@legam.fr" className="text-blue-600 hover:underline">contact@legam.fr</a></p>
                <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                <p><strong>Horaires :</strong> Lundi - Vendredi, 9h00 - 18h00</p>
              </div>
              <p className="text-sm mt-4">
                <strong>Note :</strong> Pour toute question complexe concernant vos droits RGPD, 
                nous vous recommandons de consulter un avocat spécialisé.
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
