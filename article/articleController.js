const express = require("express");
const router = express.Router();
const Article = require("./Article");
const Category = require("../categories/Category");
const slugify = require("slugify");

router.get("/cadArticle",(req, res)=>{
    res.send("Cadastro de Artigos");
});

router.get("/admin/articles/new",(req, res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/articles/new", {categories: categories});
    })
    

});

router.post("/articles/save",(req, res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var id_categori = req.body.category;
    if(title != undefined && body != undefined && id_categori != undefined){
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: id_categori

        }).then(()=>{
            res.redirect("/");
        })
    }else{
        res.redirect("/admin/articles/new");
    }
})
module.exports = router;