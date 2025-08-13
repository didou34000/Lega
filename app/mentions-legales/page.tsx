import Link from 'next/link';

export default function MentionsLegales() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentions légales</h1>
          <p className="text-lg text-gray-600">Informations légales et administratives</p>
        </div>

        {/* Contenu */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-600 rounded mr-3"></span>
              Éditeur du site
            </h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Raison sociale :</strong> Legam SAS</p>
              <p><strong>Adresse :</strong> 123 Rue de la Paix, 75001 Paris, France</p>
              <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
              <p><strong>Email :</strong> contact@legam.fr</p>
              <p><strong>Capital social :</strong> 50 000 €</p>
              <p><strong>RCS :</strong> Paris B 123 456 789</p>
              <p><strong>SIRET :</strong> 123 456 789 00012</p>
              <p><strong>Directeur de publication :</strong> Jean Dupont</p>
            </div>
          </section>

          {/* Hébergeur */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hébergeur</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Nom :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
              <p><strong>Site web :</strong> <a href="https://vercel.com" className="text-blue-600 hover:underline">vercel.com</a></p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Propriété intellectuelle</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Responsabilité</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
                mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p>
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler 
                par email à l'adresse <a href="mailto:contact@legam.fr" className="text-blue-600 hover:underline">contact@legam.fr</a>.
              </p>
              <p>
                <strong>Attention :</strong> Les modèles de lettres proposés sur ce site sont fournis à titre informatif et ne constituent 
                pas un conseil juridique. Il est recommandé de consulter un professionnel du droit pour toute question juridique spécifique.
              </p>
            </div>
          </section>

          {/* Liens hypertextes */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Liens hypertextes</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet 
                ne sauraient engager la responsabilité de Legam.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Le site peut-être amené à vous demander l'acceptation des cookies pour des besoins de statistiques et d'affichage. 
                Un cookie ne nous permet pas de vous identifier ; il ne permet que de vous reconnaître lors de votre prochaine visite.
              </p>
              <p>
                Pour plus d'informations, consultez notre <Link href="/cookies" className="text-blue-600 hover:underline">politique relative aux cookies</Link>.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Droit applicable</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Tout litige en relation avec l'utilisation du site <strong>legam.fr</strong> est soumis au droit français. 
                En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nous contacter</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center">
                <span className="w-5 h-5 bg-blue-600 rounded mr-3"></span>
                <a href="mailto:contact@legam.fr" className="text-blue-600 hover:underline">contact@legam.fr</a>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 bg-blue-600 rounded mr-3"></span>
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 bg-blue-600 rounded mr-3"></span>
                <span>123 Rue de la Paix, 75001 Paris, France</span>
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
