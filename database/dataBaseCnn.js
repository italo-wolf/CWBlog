const Sequelize = require("sequelize");

const connection = new Sequelize('cwblog','root','210597',{
    host:'localhost',
    dialect: 'mysql'
});
module.exports = connection;