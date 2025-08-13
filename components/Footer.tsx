import Link from 'next/link';
// Icônes externes retirées pour compatibilité RSC

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Informations de l'entreprise */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold">Legam</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre assistant juridique en ligne pour générer des lettres et documents légaux en toute simplicité.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex space-x-4 pt-4">
              <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Facebook</Link>
              <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Twitter</Link>
              <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Instagram</Link>
              <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors">LinkedIn</Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/modeles" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Modèles de lettres
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/modeles?category=resiliation" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Résiliations
                </Link>
              </li>
              <li>
                <Link href="/modeles?category=assurance" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Assurances
                </Link>
              </li>
              <li>
                <Link href="/modeles?category=banque" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Banque
                </Link>
              </li>
              <li>
                <Link href="/modeles?category=travail" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Travail
                </Link>
              </li>
              <li>
                <Link href="/modeles?category=logement" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Logement
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3"><span className="w-3 h-3 bg-blue-500 rounded-full"></span><span className="text-gray-300 text-sm">contact@legam.fr</span></div>
              <div className="flex items-center space-x-3"><span className="w-3 h-3 bg-blue-500 rounded-full"></span><span className="text-gray-300 text-sm">01 23 45 67 89</span></div>
              <div className="flex items-center space-x-3"><span className="w-3 h-3 bg-blue-500 rounded-full"></span><span className="text-gray-300 text-sm">Paris, France</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de séparation */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Legam. Tous droits réservés.
            </div>

            {/* Liens légaux */}
            <div className="flex flex-wrap justify-end space-x-6 text-sm">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/cgu" className="text-gray-400 hover:text-white transition-colors">
                CGU
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
              <Link href="/rgpd" className="text-gray-400 hover:text-white transition-colors">
                RGPD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
