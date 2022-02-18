const express = require('express');
const router = express.Router();

module.exports = (params) => {

    const { catalogController } = params;

    router.get('/', async (req, rep) => {
        const discs = await catalogController.getDiscs();

        rep.render('layouts', { pageTitle: "Le catalogue",
                                discs,
                                page: "catalog"});
    });

    router.get('/:id', async (req, rep) => {
        const disc = await catalogController.getDisc(req.params.id);

        if(disc){
            rep.render('layouts', { pageTitle: "Les détails demandés",
            disc,
            page: "catalog-detail"});
        }else{
            rep.render('layouts', { pageTitle: "Ce disque n'existe pas",
            page: "catalog-nontrouve"});
        }

    });

return router;

}