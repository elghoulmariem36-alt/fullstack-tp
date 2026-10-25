# TP1 : Full Stack Web Application (front-end)

Catalogue de produits réalisé deux fois, avec **Angular** (`ngapp`) et **Next.js** (`nxapp`), à partir de l'API publique [dummyjson.com](https://dummyjson.com/products).

## Fonctionnalités

- Header avec navigation (Home, Login, Contact, Products)
- Routage, paramètres d'URL (`/contact/:id`), communication parent → enfant
- Appel d'API avec gestion des états de chargement et d'erreur
- Formulaire de contact avec validation
- Catalogue : grille de produits, page détail `/products/:id`, pagination (Previous / Next)
- Dockerfile multi-stage pour chaque application

## Structure

```
fullstack-tp/
├── ngapp/   # Angular + Bootstrap
├── nxapp/   # Next.js + Tailwind CSS
└── README.md
```

## Lancer en local

**Angular** (http://localhost:4200)

```bash
cd ngapp
npm install
npx ng serve
```

**Next.js** (http://localhost:3000)

```bash
cd nxapp
npm install
npm run dev
```

## Lancer avec Docker

```bash
docker build -t ngapp:1.0 ./ngapp
docker run -p 8080:80 ngapp:1.0        # http://localhost:8080

docker build -t nxapp:1.0 ./nxapp
docker run -p 3000:3000 nxapp:1.0      # http://localhost:3000
```

## Captures d'écran

Voir le dossier `screenshots/`.

## Technologies

Angular, Next.js (App Router), TypeScript, Bootstrap, Tailwind CSS, Docker, Nginx.
## Images Docker Hub

- https://hub.docker.com/r/elghoulmariem/ngapp
- https://hub.docker.com/r/elghoulmariem/nxapp

```bash
docker run -p 8080:80 elghoulmariem/ngapp:1.0     # http://localhost:8080
docker run -p 3000:3000 elghoulmariem/nxapp:1.0   # http://localhost:3000
```
# TP2 : API REST (Express, Prisma, PostgreSQL)

Les deux front-ends consomment désormais **notre propre API** (dossier `api/`) au lieu de dummyjson.

## Architecture

```
fullstack-tp/
├── api/      # Express + TypeScript + Prisma + Zod
├── ngapp/    # Angular + Bootstrap
├── nxapp/    # Next.js + Tailwind CSS
└── docker-compose.yml
```

## Endpoints

| Méthode | Route | Description | Codes |
|---|---|---|---|
| GET | /api/health | état du serveur | 200 |
| GET | /api/products | liste (`limit`, `skip`, `q`, `category`, `order`) | 200, 400 |
| GET | /api/products/:id | un produit | 200, 404 |
| POST | /api/products | créer un produit | 201, 400 |
| PATCH | /api/products/:id | modifier un produit | 200, 400, 404 |
| DELETE | /api/products/:id | supprimer un produit | 204, 404 |
| GET | /api/categories | catégories avec nombre de produits | 200 |

## Fonctionnalités

- Catalogue avec pagination, recherche et filtre par catégorie
- Page détail d'un produit
- Page `/admin` : créer, modifier et supprimer un produit (validation Zod côté API)

## Lancer avec Docker Compose

```bash
docker compose up --build
```

- Angular : http://localhost:4200
- Next.js : http://localhost:3000
- API : http://localhost:4000/api/health

## Données initiales (seed)

Sur une base vide (premier lancement), importer les produits depuis dummyjson :

```bash
docker compose up -d db
cd api
npm install
cp .env.example .env
npx prisma db seed
```

## Lancer en développement

```bash
docker compose up -d db
cd api && npm install && npm run dev
cd ngapp && npm install && npx ng serve
cd nxapp && npm install && npm run dev
```

Variables d'environnement : voir `api/.env.example` et `nxapp/.env.example`.

## Tests de l'API

Les requêtes d'exemple sont dans `api/requests.http` (extension VS Code REST Client).

## Images Docker Hub (v2.0)

- https://hub.docker.com/r/elghoulmariem/api
- https://hub.docker.com/r/elghoulmariem/ngapp
- https://hub.docker.com/r/elghoulmariem/nxapp