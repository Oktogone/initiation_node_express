const express = require('express');
const router = express.Router();

const catalogRoute = require('./catalog');
const aboutRoute = require('./about');
const contactRoute = require('./contact');

module.exports = (params) => {

    router.get('/', (requete, reponse) => {
        try {
            //let a = 1/d;
            reponse.render('layouts', { pageTitle: 'Bienvenue aux layouts', page: 'index'});                
        } catch (error) {
            console.error("Erreur routeur " + error);
            reponse.render('layouts', { pageTitle: "Une erreur s'est produite", page: 'erreur'});                
        }
    });

    router.use('/catalogue', catalogRoute(params));
    router.use('/apropos', aboutRoute());
    router.use('/contact', contactRoute(params));

    router.use('/', (requete, reponse) => {
        reponse.render('layouts', { pageTitle: "Cette page n'existe pas", page: 'erreur'});
    });

    return router;
}