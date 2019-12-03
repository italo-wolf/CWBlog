const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users});
    });
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create")
});

router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({//verifica se o email já esta cadastrado
        where: { email: email }
    }).then(user => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);//gerar o salto
            var hash = bcrypt.hashSync(password, salt);//Gerar o hash para salvar senha de acesso

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/");
            });

        } else {
            res.redirect("/admin/users/create");
        }
    });
});

module.exports = router;