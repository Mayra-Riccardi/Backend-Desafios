const express = require ('express');
const router = express.Router();
const path = require('path');
const passport = require('../../middlewares/passport')


//Definimos las rutas del home, login y logout
router.get('/', (req, res) => {
    res.redirect('/home');
})

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../login.html'));
});

/* router.get('/login', (req, res) => {
    const name = req.session?.name
    if(name){
        res.redirect('/');
    } else {
        res.sendFile('/Users/mayra/Desktop/BACKEND/Backend-Desafios/DESAFIO 10/public/login.html');
    }
}) */

router.post(
    '/login', 
    passport.authenticate('signin', { 
        failureRedirect: '/loginError', 
        successRedirect: '/home' }));
router.post(
    '/register', 
    passport.authenticate('signup', { 
        failureRedirect: '/signupError', 
        successRedirect: '/home' }));


router.get('/logout', (req, res) => {
    const user = req.user
    if (user.email) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), './public/logout.ejs'), { email: user.email })
                /* res.send(`<h4>Hasta luego, ${name}</h4><a href="/">Volver a Inicio</a>`) */
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

router.get('/logout', async (req, res) => {
    res.redirect('/')
});




module.exports = router;

