const Sequelize = require("sequelize");
const connection = require("../database/dataBaseCnn");
const Category = require("../categories/Category");//importa a classe category para criar o relacionamento

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})
Category.hasMany(Article);// uma categoria tem muitos arqigos
Article.belongsTo(Category); //um artigo pertence a uma categoria
Article.sync({force: false});
module.exports = Article;
