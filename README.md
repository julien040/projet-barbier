# CV

![alt text](3JUlUkkZ.png)

Ce projet correspond au [sujet 1](https://franckbarbier.com/DMiNer/Curriculum_vitae.html) des UEs Conception des applications internet et technologie orientée objet pour le semestre 5 de la licence informatique à l'Université de Pau et des Pays de l'Adour. Il a été réalisé par Julien C et Ulyana Y. Il utilise Typescript, React, MySQL et Express.

Curriculum video est une plateforme pour gérer les CV vidéos de candidats. Le fonctionnement est simple:

1. L'employeur crée une fiche de poste: [https://cv-video.julienc.me/candidature/start](https://cv-video.julienc.me/candidature/start)
2. Le candidat postule en envoyant une vidéo de présentation. Il peut soit envoyer un fichier, soit enregistrer directement depuis son navigateur.
3. Notre plateforme analyse la vidéo pour en extraire les informations pertinentes (métiers, compétences, pertinence par rapport à la fiche de poste, etc.). Elle crée aussi une vidéo condensée pour donner un aperçu rapide du candidat.
4. L'employeur accède à une page de gestion des candidatures: [https://cv-video.julienc.me/admin](https://cv-video.julienc.me/admin) où il peut suivre les résultats de l'analyse des vidéos.

## Instructions

Nous vous conseillons d'utiliser la plateforme déja hébergée à [https://cv-video.julienc.me](https://cv-video.julienc.me). Si vous voulez lancer le projet en local, vous pouvez suivre les instructions suivantes:

Pour lancer le projet, vous devez avoir Node.js installé sur votre machine. De plus, `ffmpeg` doit être installé pour le traitement des vidéos. Crée un fichier `.env` à la racine du projet avec les variables suivantes:

```bash
DATABASE_URL="mysql://user:password@host:25060/db"
API_PORT=3001
API_HOST=127.0.0.1
OPENAI_API_KEY=""
AZURE_OPENAI_API_KEY=""
```

Vous avez besoin d'une base de données MySQL pour stocker les données. De plus, il vous faut une clé API pour OpenAI et Azure OpenAI pour l'analyse des vidéos.

```bash
# Frontend
cd cv
npm install
npm run dev &
cd ..

# Backend
cd api
npm install
npm run build
npm run start &

```

Allez à `http://localhost:3000` pour voir le CV.

## Screenshots

**Page d'accueil**

![alt text](WfekrIsa.png)

**Page de résultats**

![alt text](GoPxdokA.png)

**Page de gestion des candidatures**

![alt text](0GQyPrsM.png)