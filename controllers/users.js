const express = require("express");

const router = express.Router();

const db = require('./../db/models');

// Criar a rota listar
router.get("/users", async (req, res) => {
    const users = await db.Users.findAll({
        // Indica quais colunas recuperar
        attributes: ['id', 'name', 'email'],
        // Ordena os registros pela coluna ID de forma decrescente
        order: [['id', 'DESC']]
    });
    // Se encontrar o registro no banco de dados
    if(users) {
        return res.json({
            users
        });
    } else {
        return res.status(400).json({
            mensagem: "Error: Nenhum usuário encontrado."
        });
    }
});

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