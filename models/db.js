const Sequelize = require('sequelize');
const url = process.env.DATABASE_URL || 'postgres://ndgznwqxwqcngd:8ee975cf214f639c856728e447a30169969b335e51a04c1efe2d756bf9168368@ec2-23-21-91-183.compute-1.amazonaws.com:5432/d7n4m442h735nq';
const db = new Sequelize(url);

// const Sequelize = require('sequelize');
// const url = process.env.DATABASE_URL || 'postgres://postgres:123456@localhost:5432/baodientu';
// const db = new Sequelize(url);

module.exports = db;