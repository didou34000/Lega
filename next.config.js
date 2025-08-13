/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver le cache webpack pour éviter les problèmes
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false;
    }
    
    // Résoudre les problèmes de chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };
    
    return config;
  },
  
  // Désactiver le SWC pour utiliser Babel à la place
  swcMinify: false,
  
  // Configuration pour éviter les erreurs de build
  experimental: {
    esmExternals: false,
  },
  
  // Désactiver la compression pour le développement
  compress: false,
}

module.exports = nextConfig
