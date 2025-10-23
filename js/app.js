// Variables globales
let pharmacies = [];
let userPosition = null;
let filteredPharmacies = [];

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Application démarrée');
    init();
});

// Fonction d'initialisation
async function init() {
    showSpinner(true);
    
    // Charger les pharmacies
    await loadPharmacies();
    
    // Initialiser la carte
    initMap();
    
    // Afficher les pharmacies
    displayPharmacies(pharmacies);
    
    // Event listeners
    setupEventListeners();
    
    showSpinner(false);
}

// Configuration des event listeners
function setupEventListeners() {
    document.getElementById('geolocateBtn').addEventListener('click', getUserLocation);
    document.getElementById('searchBtn').addEventListener('click', searchByAddress);
    document.getElementById('filterOpen').addEventListener('change', applyFilters);
    document.getElementById('distanceFilter').addEventListener('change', applyFilters);
    
    // Recherche au clavier (Enter)
    document.getElementById('addressInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchByAddress();
        }
    });
}

// Charger les pharmacies depuis le fichier JSON
async function loadPharmacies() {
    try {
        pharmacies = await fetchPharmacies();
        console.log(`${pharmacies.length} pharmacies chargées`);
    } catch (error) {
        console.error('Erreur lors du chargement des pharmacies:', error);
        alert('Impossible de charger les données des pharmacies');
    }
}

// Obtenir la géolocalisation de l'utilisateur
function getUserLocation() {
    const btn = document.getElementById('geolocateBtn');
    btn.disabled = true;
    btn.textContent = '📍 Localisation...';
    
    if (!navigator.geolocation) {
        alert('La géolocalisation n\'est pas supportée par votre navigateur');
        btn.disabled = false;
        btn.textContent = '📍 Me géolocaliser';
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            userPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            console.log('Position utilisateur:', userPosition);
            
            // Calculer les distances
            calculateDistances();
            
            // Centrer la carte sur l'utilisateur
            centerOnUser(userPosition);
            
            // Réafficher les pharmacies triées
            applyFilters();
            
            btn.disabled = false;
            btn.textContent = '✅ Position trouvée';
            
            setTimeout(() => {
                btn.textContent = '📍 Me géolocaliser';
            }, 3000);
        },
        (error) => {
            console.error('Erreur de géolocalisation:', error);
            alert('Impossible d\'obtenir votre position');
            btn.disabled = false;
            btn.textContent = '📍 Me géolocaliser';
        }
    );
}

// Calculer les distances entre l'utilisateur et les pharmacies
function calculateDistances() {
    if (!userPosition) return;
    
    pharmacies.forEach(pharmacy => {
        pharmacy.distance = calculateDistance(
            userPosition.lat,
            userPosition.lng,
            pharmacy.latitude,
            pharmacy.longitude
        );
    });
}

// Formule de Haversine pour calculer la distance
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Arrondi à 1 décimale
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Recherche par adresse (simulée)
function searchByAddress() {
    const address = document.getElementById('addressInput').value.trim();
    
    if (!address) {
        alert('Veuillez entrer une adresse');
        return;
    }
    
    // Simulation: centrer sur Rouen centre
    const rouenCenter = { lat: 49.4431, lng: 1.0993 };
    userPosition = rouenCenter;
    
    calculateDistances();
    centerOnUser(rouenCenter);
    applyFilters();
    
    alert(`Recherche autour de: ${address}\n(Fonctionnalité de géocodage à intégrer)`);
}

// Appliquer les filtres
function applyFilters() {
    const filterOpen = document.getElementById('filterOpen').checked;
    const distanceFilter = document.getElementById('distanceFilter').value;
    
    filteredPharmacies = pharmacies.filter(pharmacy => {
        // Filtre ouvert/fermé
        if (filterOpen && !isOpenNow(pharmacy)) {
            return false;
        }
        
        // Filtre distance
        if (distanceFilter !== 'all' && pharmacy.distance) {
            const maxDistance = parseFloat(distanceFilter);
            if (pharmacy.distance > maxDistance) {
                return false;
            }
        }
        
        return true;
    });
    
    // Trier par distance si disponible
    if (userPosition) {
        filteredPharmacies.sort((a, b) => a.distance - b.distance);
    }
    
    displayPharmacies(filteredPharmacies);
    updateMapMarkers(filteredPharmacies);
}

// Vérifier si une pharmacie est ouverte maintenant
function isOpenNow(pharmacy) {
    const now = new Date();
    const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    // Pharmacie de garde = toujours ouverte
    if (pharmacy.estDeGarde) {
        return true;
    }
    
    // Mapper les jours
    const daysMap = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const currentDay = daysMap[day];
    
    const schedule = pharmacy.horaires[currentDay];
    
    if (!schedule) return false;
    
    // Vérifier les plages horaires
    for (const slot of schedule) {
        const [startHour, startMin] = slot.ouverture.split(':').map(Number);
        const [endHour, endMin] = slot.fermeture.split(':').map(Number);
        
        const startTime = startHour * 60 + startMin;
        const endTime = endHour * 60 + endMin;
        
        if (currentTime >= startTime && currentTime <= endTime) {
            return true;
        }
    }
    
    return false;
}

// Afficher les pharmacies
function displayPharmacies(pharmaciesToDisplay) {
    const container = document.getElementById('pharmaciesList');
    const count = document.getElementById('pharmaciesCount');
    
    count.textContent = pharmaciesToDisplay.length;
    
    if (pharmaciesToDisplay.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Aucune pharmacie ne correspond aux critères de recherche</p>';
        return;
    }
    
    container.innerHTML = pharmaciesToDisplay.map(pharmacy => {
        const isOpen = isOpenNow(pharmacy);
        const statusClass = isOpen ? 'status-open' : 'status-closed';
        const statusText = isOpen ? '🟢 Ouverte' : '🔴 Fermée';
        
        const gardebadge = pharmacy.estDeGarde ? '<span class="badge-garde">⭐ DE GARDE</span>' : '';
        
        const distanceHtml = pharmacy.distance 
            ? `<p class="pharmacy-distance">📍 ${pharmacy.distance} km</p>` 
            : '';
        
        return `
            <div class="pharmacy-card">
                <h3>${pharmacy.nom} ${gardeB adge}</h3>
                <span class="pharmacy-status ${statusClass}">${statusText}</span>
                
                <div class="pharmacy-info">
                    <p>📍 ${pharmacy.adresse}, ${pharmacy.codePostal} ${pharmacy.ville}</p>
                    <p>📞 ${pharmacy.telephone}</p>
                    ${distanceHtml}
                </div>
                
                <div class="pharmacy-actions">
                    <button class="btn btn-small btn-primary" onclick="window.open('tel:${pharmacy.telephone}')">
                        📞 Appeler
                    </button>
                    <button class="btn btn-small btn-outline" onclick="openDirections(${pharmacy.latitude}, ${pharmacy.longitude})">
                        🗺️ Itinéraire
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Ouvrir Google Maps pour l'itinéraire
function openDirections(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

// Afficher/cacher le spinner de chargement
function showSpinner(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (show) {
        spinner.classList.add('active');
    } else {
        spinner.classList.remove('active');
    }
}