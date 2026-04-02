# kevin-tp - CI/CD Pipeline

Application web Node.js avec pipeline CI/CD complet via GitHub Actions et deploiement automatique sur VM Azure.

## Architecture du pipeline

```
git push (main)
       |
  GitHub Actions
       |
  1) Unit tests (Jest)
       |
  2) E2E tests (Supertest)
       | (uniquement si OK)
  3) Build Docker image
       |
  4) Push image Docker Hub
       |
  5) Deploy on Azure VM (SSH)
       |
  6) Healthcheck (curl /health)
```

## Lancer en local

```bash
npm install
npm start        # Demarre sur http://localhost:8080
npm test         # Tests unitaires
npm run test:e2e # Tests E2E
```

## Endpoints

| Route | Description |
|---|---|
| `GET /` | Page d'accueil HTML |
| `GET /health` | Healthcheck JSON |
| `GET /api/info` | Infos de l'application |

## Docker

```bash
docker build -t kevin-tp .
docker run -d -p 8080:8080 --name kevin-tp kevin-tp
```

## Declenchement du deploiement

Chaque `git push` sur la branche `main` declenche automatiquement le pipeline complet.
Aucune action manuelle n'est necessaire apres le push.

Le deploiement est **idempotent** : relancer le pipeline arrete et remplace le conteneur existant sans creer de doublons.

## GitHub Secrets necessaires

| Secret | Description |
|---|---|
| `DOCKERHUB_USERNAME` | Username Docker Hub |
| `DOCKERHUB_TOKEN` | Access token Docker Hub |
| `VM_HOST` | IP publique de la VM Azure (20.56.163.105) |
| `VM_USER` | Utilisateur SSH de la VM |
| `VM_SSH_KEY` | Cle privee SSH (ed25519) |

## Choix techniques

- **Node.js + Express** : leger, rapide a mettre en place, ideal pour une API
- **Jest + Supertest** : framework de test standard pour Node.js, permet les tests unitaires et E2E sans navigateur
- **Multi-stage Docker build** : image finale legere (~180MB) avec uniquement le necessaire
- **appleboy/ssh-action** : action GitHub fiable pour le deploiement SSH
- **Conteneur nomme fixe** (`kevin-tp`) : garantit l'idempotence du deploiement
- **`--restart unless-stopped`** : le conteneur redemarre automatiquement en cas de crash ou reboot de la VM
