var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

router.get('/', function (req, res) {
    var email = req.session.email;
    console.log(email);
    Users.findOne({
        where: {
            email: email
        }
    }).then(info=>{
        res.render("user/information",{info});
    }).catch(err=>console.log(err));
});


module.exports = router;