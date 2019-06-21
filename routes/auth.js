var express = require('express');
var router = express.Router();
var Users = require('../models/Users');
var bcrypt = require('bcrypt');


// login
router.get('/login', function (req, res) {
    res.render('user/login');
});

router.post('/login', async function (req, res) {
    var {
        email,
        password
    } = req.body;
    var user = await Users.findOne({
        where: {
            email
        },
    });
    if (!user) {
        res.status(400);
        res.render("error", {
            message: "Email không tồn tại"
        });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        res.status(400);
        res.render("error", {
            message: "Mật khẩu không đúng"
        });
    }

    res.status(200);
    req.session.email = user.email;
    res.redirect('/');
});

// logout
router.get('/logout', async function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

// register
router.get('/register', function (req, res) {
    res.render('user/register');
});

module.exports = router;