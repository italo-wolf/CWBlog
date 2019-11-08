const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/dataBaseCnn");
const categorisController = require("./categories/categorisController");
const articleController = require("./article/articleController");
const articleModel = require("./article/Article");

const Article = require("./article/Article");
const Categori = require("./categories/Category");
//Database
connection
.authenticate()
.then(()=>{
    console.log("Conectado ao banco");
}).catch((error)=>{
    console.log(error);
});

//ejs
app.set('view engine','ejs');
app.use(express.static('public'));

//formulario bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routers
app.use("/",categorisController);
app.use("/",articleController);

app.get("/",(req, res) =>{
    articleModel.findAll({raw: true, order:[
        ['id','DESC']//ordenar id decresente
    ]}).then(article =>{
        res.render("index.ejs",{article: article});

    });
       
});

app.listen(80,()=>{
    console.log("Server Rodando");
})