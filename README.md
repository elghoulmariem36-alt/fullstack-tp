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
