# Utiliser une image de Node.js comme base
FROM node:18

# Créer un répertoire de travail
WORKDIR /app

# Copier le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 9000

CMD ["npm","run", "server"]