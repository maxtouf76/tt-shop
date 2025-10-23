# 🏥 Pharmacies de Garde - Rouen

Application web pour trouver rapidement les pharmacies de garde ouvertes dans la région de Rouen.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Description

Cette application permet aux utilisateurs de localiser facilement les pharmacies de garde ouvertes autour d'eux dans la région de Rouen. Elle offre une interface intuitive avec une carte interactive et une liste détaillée des pharmacies disponibles.

## ✨ Fonctionnalités

- 📍 **Géolocalisation automatique** - Trouvez les pharmacies les plus proches de vous
- 🗺️ **Carte interactive** - Visualisez toutes les pharmacies sur une carte Leaflet
- 🔍 **Recherche par adresse** - Cherchez autour d'une adresse spécifique
- 🟢 **Statut en temps réel** - Savoir si une pharmacie est ouverte ou fermée
- ⭐ **Pharmacies de garde** - Identification claire des pharmacies de garde
- 📏 **Tri par distance** - Les pharmacies sont triées par proximité
- 🔽 **Filtres avancés** - Filtrez par statut (ouvert/fermé) et distance
- 📞 **Contact direct** - Appelez directement depuis l'application
- 🧭 **Itinéraire** - Obtenez un itinéraire vers la pharmacie via Google Maps
- 📱 **Design responsive** - Fonctionne parfaitement sur mobile, tablette et desktop

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec Grid et Flexbox
- **JavaScript (ES6+)** - Logique applicative
- **Leaflet.js** - Cartographie interactive
- **OpenStreetMap** - Données cartographiques
- **Geolocation API** - Localisation de l'utilisateur
- **Fetch API** - Chargement des données

## 📦 Installation

### Prérequis

Un navigateur web moderne (Chrome, Firefox, Safari, Edge)

### Étapes

1. Clonez le repository :
```bash
git clone https://github.com/maxtouf76/pharmacies-garde-rouen.git
cd pharmacies-garde-rouen
```

2. Ouvrez le fichier `index.html` dans votre navigateur :
```bash
# Sur macOS
open index.html

# Sur Linux
xdg-open index.html

# Sur Windows
start index.html
```

Ou utilisez un serveur local :
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server
```

Puis ouvrez http://localhost:8000 dans votre navigateur.

## 📁 Structure du projet

```
pharmacies-garde-rouen/
├── index.html              # Page principale
├── css/
│   └── style.css          # Styles CSS
├── js/
│   ├── app.js             # Logique principale
│   ├── map.js             # Gestion de la carte
│   └── api.js             # Gestion des données
├── data/
│   └── pharmacies.json    # Base de données des pharmacies
├── README.md              # Documentation
└── .gitignore            # Fichiers à ignorer par Git
```

## 🎯 Utilisation

1. **Autoriser la géolocalisation** - Cliquez sur "Me géolocaliser" et autorisez l'accès à votre position
2. **Voir les pharmacies** - La carte et la liste affichent toutes les pharmacies disponibles
3. **Filtrer** - Utilisez les filtres pour n'afficher que les pharmacies ouvertes ou à une certaine distance
4. **Contacter** - Cliquez sur "Appeler" pour téléphoner ou "Itinéraire" pour l'itinéraire

## 📊 Sources de données

### Données actuelles
Les données sont stockées localement dans `data/pharmacies.json` à titre de démonstration.

### Sources recommandées pour les données en temps réel

- **[Ordre National des Pharmaciens](https://www.ordre.pharmacien.fr/)** - Annuaire officiel
- **[data.gouv.fr](https://www.data.gouv.fr/)** - Open data français
- **[MonPharmacien.fr API](https://www.monpharmacien.fr/)** - API des pharmacies
- **[3237 - Numéro des pharmacies de garde](https://www.3237.fr/)** - Service de garde
- **API Santé** - APIs gouvernementales

### Intégration d'API (À faire)

Pour intégrer une API réelle, modifiez le fichier `js/api.js` :

```javascript
async function fetchPharmaciesFromAPI() {
    const response = await fetch('URL_DE_L_API');
    return await response.json();
}
```

## 🚀 Améliorations futures

- [ ] Intégration d'une API réelle de pharmacies de garde
- [ ] Système de notifications pour les changements de garde
- [ ] Historique des recherches
- [ ] Mode sombre
- [ ] PWA (Progressive Web App) pour installation sur mobile
- [ ] Multilingue (anglais, espagnol, etc.)
- [ ] Avis et notes des pharmacies
- [ ] Recherche avancée par services (tests COVID, vaccins, etc.)
- [ ] Export PDF de la liste des pharmacies
- [ ] Partage de localisation de pharmacie

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**maxtouf76**
- GitHub: [@maxtouf76](https://github.com/maxtouf76)

## ⚠️ Avertissement

Cette application est fournie à titre informatif. Les données peuvent ne pas être à jour en temps réel. Il est recommandé d'appeler la pharmacie avant de se déplacer pour confirmer son ouverture.

## 📞 Support

Pour toute question ou problème, ouvrez une [issue](https://github.com/maxtouf76/pharmacies-garde-rouen/issues) sur GitHub.

---

**Fait avec ❤️ pour la communauté de Rouen**