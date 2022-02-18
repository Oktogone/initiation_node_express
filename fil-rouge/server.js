// Les imports de modules Node
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// le module de routage
const router = require('./routes');

// Les controleurs
const CatalogController = require('./controllers/catalogController');
const ContactController = require('./controllers/contactController');
const catalogController = new CatalogController('catalog');
const contactController = new ContactController('contact');

// Création de l'application Node.js
const app = express();
const port = 3000;

// Le  moteur de templates
app.set('view engine', 'ejs' );
app.set('views', path.join(__dirname, './views'));

app.use(bodyParser.urlencoded({extended: true}));

// Les ressources statiques
app.use(express.static(path.join(__dirname, './phantom')));

// Initialisations et lecture de la configuration de l'application
const dataFolder = './data/';
const configFile = path.join(__dirname, dataFolder + 'config.json');

fs.readFile(configFile, 'utf-8', (error, data) => {
    if (error) {
        console.error(error);
        app.locals.siteName = "[ nom du site ]";
        app.locals.socials = [{url:"#", class: "", label: ""}];
        app.locals.liens = [{url:"/", label: "Accueil"}];
    }else{
        app.locals.siteName = JSON.parse(data).site_name;
        app.locals.socials = JSON.parse(data).socials;
        app.locals.liens = JSON.parse(data).liens;
    }
});

// Définition et appel du router
app.use('/', router({ catalogController, contactController }));

// Lancement du serveur
app.listen(port, () => {
    console.log(`Application démarrée sur http://localhost:${port}`)
});