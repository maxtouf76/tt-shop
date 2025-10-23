// Fonction pour charger les pharmacies depuis le fichier JSON
async function fetchPharmacies() {
    try {
        const response = await fetch('data/pharmacies.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        
        // Retourner des données de fallback en cas d'erreur
        return getFallbackData();
    }
}

// Données de secours si le fichier JSON ne peut pas être chargé
function getFallbackData() {
    console.warn('Utilisation des données de secours');
    return [
        {
            id: 1,
            nom: "Pharmacie de l'Hôtel de Ville",
            adresse: "25 Place de l'Hôtel de Ville",
            ville: "Rouen",
            codePostal: "76000",
            latitude: 49.4432,
            longitude: 1.0999,
            telephone: "02 35 71 23 45",
            estDeGarde: true,
            horaires: {
                lundi: [{ouverture: "08:30", fermeture: "19:30"}],
                mardi: [{ouverture: "08:30", fermeture: "19:30"}],
                mercredi: [{ouverture: "08:30", fermeture: "19:30"}],
                jeudi: [{ouverture: "08:30", fermeture: "19:30"}],
                vendredi: [{ouverture: "08:30", fermeture: "19:30"}],
                samedi: [{ouverture: "09:00", fermeture: "19:00"}],
                dimanche: [{ouverture: "10:00", fermeture: "13:00"}]
            }
        }
    ];
}

// Future fonction pour intégrer une API réelle
async function fetchPharmaciesFromAPI() {
    // TODO: Intégrer l'API de l'Ordre des Pharmaciens ou autre source officielle
    // Exemple:
    // const response = await fetch('https://api-example.com/pharmacies?ville=Rouen');
    // return await response.json();
    
    console.log('API externe non implémentée - utilisation des données locales');
    return fetchPharmacies();
}

// Géocodage d'adresse (à implémenter avec une vraie API)
async function geocodeAddress(address) {
    // TODO: Utiliser une API de géocodage comme Nominatim, Google Maps, etc.
    // Exemple avec Nominatim (OpenStreetMap):
    // const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    // const response = await fetch(url);
    // const data = await response.json();
    // return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    
    console.log('Géocodage simulé pour:', address);
    
    // Retourner le centre de Rouen par défaut
    return { lat: 49.4431, lng: 1.0993 };
}