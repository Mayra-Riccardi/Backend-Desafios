const express = require('express');
const { webAuth, homeAuth } = require('../middlewares/auth');
const router = express.Router();
const authRoutes = require('./auth/auth.routers')
const auth = require('../middlewares/auth');
/* const productsRoutes = require('./products/products.routers') */
const path = require('path');


router.use('/auth', authRoutes)

router.get('/', webAuth, async (req, res) => {
    const user = req.user;
    if (user) {
      return res.redirect('/home');
    }
    else {
      return res.sendFile(path.resolve(__dirname, '../public/login.html'));
    }
});

router.get('/home', homeAuth, async (req, res) => {
    const user = req.user;
    res.render('profile', { sessionUser: user });
});

router.get('/register', webAuth, async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/signup.html'));
});

router.get('/loginError', (req, res) => {
    res.render(path.join(process.cwd(), 'Public/views/pages/loginError.ejs'))
})
router.get('/signupError', (req, res) => {
    res.render(path.join(process.cwd(), 'Public/views/pages/signupError.ejs'))
})
/* router.post('/products', productsRoutes) */

router.get('*', (req, res) => {
    res.status(404).send('Página no encontrada')
})


module.exports = router;

