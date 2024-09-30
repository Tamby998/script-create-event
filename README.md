# Node Calendar API

Ce projet est une API Node.js qui interagit avec l'API Google Calendar pour créer des événements et gérer l'authentification OAuth2.

## Fonctionnalités

- Authentification OAuth2 avec Google
- Création d'événements dans Google Calendar
- Génération de liens Google Meet pour les événements

## Prérequis

- Node.js (v12.0.0 ou supérieur)
- Un compte Google et un projet Google Cloud avec l'API Calendar activée

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/votre-nom-utilisateur/node-calendar-api.git
   cd node-calendar-api
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet et ajoutez vos identifiants Google :
   ```
   CLIENT_ID=votre_client_id
   CLIENT_SECRET=votre_client_secret
   REDIRECT_URL=http://localhost:3000/auth/redirect
   ```

## Utilisation

1. Démarrez le serveur :
   ```
   node index.js
   ```

2. Ouvrez votre navigateur et accédez à `http://localhost:3000/auth` pour commencer le processus d'authentification.

3. Une fois authentifié, vous pouvez créer un événement en accédant à `http://localhost:3000/create-event`.

## Routes

- `/` : Page d'accueil
- `/auth` : Démarre le processus d'authentification OAuth2
- `/auth/redirect` : Gère la redirection après l'authentification
- `/create-event` : Crée un événement dans Google Calendar

