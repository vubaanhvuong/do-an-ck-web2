var db = require('./db');
var Sequelize = require('sequelize');

var Users = db.define('users', {
    // attributes

    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    full_name: {
        type: Sequelize.STRING
    },
    phone_number: {
        type: Sequelize.STRING
    },
    writer: {
        type: Sequelize.BOOLEAN
    },
    address: {
        type: Sequelize.STRING
    },
    passport: {
        type: Sequelize.STRING
    },
}, {
    freezeTableName: true 
});

module.exports = Users;