# Variables d'Environnement

Ce document décrit les variables d'environnement utilisées par l'application "Formalités France".

## Configuration de Base

```bash
# Nom et version de l'application
NEXT_PUBLIC_APP_NAME="Formalités France"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

## Configuration de l'IA (Futur)

```bash
# Clé API OpenAI (pour l'analyse distante des contrats)
OPENAI_API_KEY=your_openai_api_key_here

# Modèle OpenAI à utiliser
OPENAI_MODEL=gpt-4

# Paramètres de génération
OPENAI_TEMPERATURE=0.1
OPENAI_MAX_TOKENS=2000
```

## Configuration des Services (Futur)

```bash
# Service d'envoi d'emails
EMAIL_SERVICE_API_KEY=your_email_service_key_here

# Service de génération PDF
PDF_SERVICE_API_KEY=your_pdf_service_key_here
```

## Configuration de la Base de Données (Futur)

```bash
# URL de connexion à la base de données
DATABASE_URL=your_database_url_here
```

## Configuration de l'Analytics (Futur)

```bash
# Google Analytics
GOOGLE_ANALYTICS_ID=your_ga_id_here
```

## Configuration de la Sécurité

```bash
# Clé secrète JWT
JWT_SECRET=your_jwt_secret_here

# Clé de chiffrement
ENCRYPTION_KEY=your_encryption_key_here
```

## Configuration du Déploiement

```bash
# Environnement
NODE_ENV=development

# URL de l'application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Fichier .env.local

Créez un fichier `.env.local` à la racine du projet avec les variables nécessaires :

```bash
# Copiez ce fichier et renommez-le en .env.local
cp .env.example .env.local

# Puis éditez .env.local avec vos vraies valeurs
```

## Notes Importantes

- Les variables préfixées par `NEXT_PUBLIC_` sont exposées au navigateur
- Les autres variables sont uniquement côté serveur
- Ne commitez jamais le fichier `.env.local` dans Git
- Le fichier `.env.example` sert de modèle et peut être commité
