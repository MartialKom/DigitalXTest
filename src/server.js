const express = require('express');
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;


const racineProjet = process.cwd();



app.use(express.static(racineProjet+"/src/views"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rediriger tous les path "/auth"
app.use("/auth", require("./routes/authRoutes"));

//Rediriger tous les path "/"
app.use("/", require("./routes/userRoutes"));

// Middleware pour gérer les requêtes vers des chemins inexistants
app.use((req, res, next) => {
    res.status(404).sendFile(racineProjet+'/src/views/pages/notFound.html');
  });


//Lancer le serveur
app.listen(port, ()=> console.log("Le serveur a demarré au port: "+port))