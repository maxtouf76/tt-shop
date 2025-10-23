// Variables pour la carte
let map = null;
let markers = [];
let userMarker = null;

// Initialiser la carte Leaflet
function initMap() {
    // Centrer sur Rouen par défaut
    const rouenCenter = [49.4431, 1.0993];
    
    // Créer la carte
    map = L.map('map').setView(rouenCenter, 13);
    
    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Ajouter les marqueurs des pharmacies
    addMarkers(pharmacies);
    
    console.log('Carte initialisée');
}

// Ajouter les marqueurs des pharmacies
function addMarkers(pharmaciesToShow) {
    // Supprimer les anciens marqueurs
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Créer les icônes personnalisées
    const greenIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    // Ajouter un marqueur pour chaque pharmacie
    pharmaciesToShow.forEach(pharmacy => {
        const isOpen = isOpenNow(pharmacy);
        const icon = isOpen ? greenIcon : redIcon;
        
        const marker = L.marker([pharmacy.latitude, pharmacy.longitude], { icon })
            .addTo(map);
        
        // Créer le popup
        const gardeText = pharmacy.estDeGarde ? '<br><strong style="color: #00A651;">⭐ PHARMACIE DE GARDE</strong>' : '';
        const statusText = isOpen ? '<span style="color: #28A745;">🟢 Ouverte</span>' : '<span style="color: #DC3545;">🔴 Fermée</span>';
        
        const popupContent = `
            <div style="min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #00A651;">${pharmacy.nom}</h3>
                <p style="margin: 5px 0;">${statusText}${gardeText}</p>
                <p style="margin: 5px 0;">📍 ${pharmacy.adresse}</p>
                <p style="margin: 5px 0;">📞 ${pharmacy.telephone}</p>
                <button onclick="openDirections(${pharmacy.latitude}, ${pharmacy.longitude})" 
                        style="margin-top: 10px; padding: 8px 15px; background: #0066CC; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    🗺️ Itinéraire
                </button>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        markers.push(marker);
    });
    
    console.log(`${markers.length} marqueurs ajoutés à la carte`);
}

// Mettre à jour les marqueurs sur la carte
function updateMapMarkers(pharmaciesToShow) {
    addMarkers(pharmaciesToShow);
    
    // Ajuster la vue pour montrer tous les marqueurs
    if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// Centrer la carte sur la position de l'utilisateur
function centerOnUser(position) {
    // Supprimer l'ancien marqueur utilisateur
    if (userMarker) {
        map.removeLayer(userMarker);
    }
    
    // Créer une icône bleue pour l'utilisateur
    const blueIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    // Ajouter le marqueur de l'utilisateur
    userMarker = L.marker([position.lat, position.lng], { icon: blueIcon })
        .addTo(map)
        .bindPopup('<strong>📍 Vous êtes ici</strong>')
        .openPopup();
    
    // Centrer la carte
    map.setView([position.lat, position.lng], 14);
    
    console.log('Carte centrée sur l\'utilisateur');
}