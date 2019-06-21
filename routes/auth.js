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

router.post('/register', async function (req, res) {
    var {
        email,
        password,
        phone,
        name,
        address,
        passport
    } = req.body;

    console.log(email);
    console.log(password);
    console.log(phone);
    console.log(name);
    console.log(address);
    console.log(passport);

    Users.findOne({
        where: {
            email: email
        }
    }).then(info => {
        if (info) {
            res.render("error", {
                message: "Email đã tồn tại"
            });
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    console.log(hash);
                    Users.create({
                        email: email,
                        password: hash,
                        full_name: name,
                        address: address,
                        phone_number: phone,
                        passport: passport,
                        writer: false
                    }).then(function (req, res) {
                        req.session.email = email;
                        res.redirect('/');
                    }).catch(err => console.log(err));
                });
            });
        }
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;