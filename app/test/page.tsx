export default function TestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page de test
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Si vous voyez cette page, l'application fonctionne correctement.
        </p>
        <div className="mt-8 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <p className="text-green-800 dark:text-green-200">
            ✅ Application chargée avec succès
          </p>
        </div>
      </div>
    </div>
  );
}
