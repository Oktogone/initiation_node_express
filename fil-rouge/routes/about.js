const express = require('express');
const router = express.Router();

module.exports = () => {

router.all('/', (req, rep) => {
    rep.render('layouts', { pageTitle: "À propos",
                            page: "apropos"});
});

return router;

}