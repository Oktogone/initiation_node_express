const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

module.exports = (params) => {

    const { contactController } = params;

    router.post('/', [
        check('name')
        .trim()
        .isLength({min: 3})
        .escape()
        .withMessage('Un nom de plus de 3 caractères est obligatoire'),
        check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Un email valide est obligatoire'),
        check('message')
        .trim()
        .isLength({min: 5})
        .escape()
        .withMessage('Un message de plus de 5 caractères est obligatoire'),
    ],
    async (req, rep) => {

        const erreurs = validationResult(req);

        let messages = {};

        if(!erreurs.isEmpty()){
            messages = {
                erreurs: erreurs.array(),
            };
        }else{
            const { name, email, message } = req.body;
            await contactController.addEntry(name, email, message);        
        };

        rep.render('layouts', { pageTitle: "Contact",
                               messages: messages.erreurs,
                               page: "contact", 
                               contact: req.body });
    });

return router;

}