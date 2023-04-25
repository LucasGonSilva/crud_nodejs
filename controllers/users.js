const express = require("express");

const router = express.Router();

const db = require('./../db/models');

router.post("/users", async (req, res) => {
    
    var dados = req.body;
    console.log(dados);

    await db.Users.create(dados).then((dadosUsuario) => {
        return res.json({
            mensagem: "Usuário cadastrado com sucesso!",
            dados: dadosUsuario
        });
    }).catch(() => {
        return res.json({
            mensagem: "Error: Usuário não cadastrado com sucesso!"
        });
    });
});

module.exports = router;