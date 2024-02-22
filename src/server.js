const express = require('express');
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const connection = require("./configs/db");
const utilisateur = require("./entities/user.model")
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require("connect-redis").default
const redis = require('redis');
const { sendMail } = require('./services/mail.service');

const app = express();
const port = process.env.PORT;

let redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    database: 0,
});

redisClient.connect().catch((err)=> console.error("Impossible de se connecter à redis "+err));

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  })

module.exports = {
    redisClient: redisClient,
};

app.use(session({
    store: redisStore,
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 30 * 60,
        secure: false 
    }
}))

const racineProjet = process.cwd();



app.use(express.static(racineProjet+"/src/views"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rediriger tous les path "/auth"
app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/userRoutes"));
//Lancer le serveur
app.listen(port, ()=> console.log("Le serveur a demarré au port: "+port))