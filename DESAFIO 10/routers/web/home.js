//Impotaciones
const express = require ('express');
const router = express.Router();
const webAuth = require ("../../auth/index")
const path = require('path');

//Ruta Home + Usuario
router.get('/home', webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/public/index.ejs'), { name: req.session.name })//Imprimimos la plantilla index
})

module.exports = router

