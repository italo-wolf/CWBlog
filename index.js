const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/dataBaseCnn");
const categorisController = require("./categories/categorisController");
const articleController = require("./article/articleController");

const Article = require("./article/Article");
const Category = require("./categories/Category");
//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco");
    }).catch((error) => {
        console.log(error);
    });

//ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

//formulario bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routers
app.use("/", categorisController);
app.use("/", articleController);

app.get("/", (req, res) => {
    Article.findAll({
        raw: true, order: [
            ['id', 'DESC']//ordenar id decresente

        ]
    }).then(article => {
        Category.findAll().then(categories => {
            res.render("index.ejs", { article: article, categories: categories });
        });


    });

});
app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", { article: article, categories: categories });
            });
    
        } else {
            res.redirect("/");
        }
    }).catch(erro => {
        res.redirect("/");
    });
});

app.get("/category/:slug",(req,res)=>{
    var slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug
        }, include: [{model: Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll().then(categories =>{ 
                res.render("index",{article: category.articles, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(erro =>{
        res.redirect("/");
    });
});
app.listen(8181, () => {
    console.log("Server Rodando");
})