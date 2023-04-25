const express = require("express");

const router = express.Router();

const db = require('./../db/models');

// Criar a rota listar
router.get("/users", async (req, res) => {
    
    const { page = 1 } = req.query;
    
    console.log(page);

    // Limite de registros em cada página

    const limit = 5;

    var lastPage = 1;

    const countUser = await db.Users.count();

    console.log(countUser);

    if(countUser !== 0) {
        lastPage = Math.ceil(countUser / limit);
        console.log(lastPage);
    } else {
        return res.status(400).json({
            mensagem: "Error: Nenhum usuário encontrado."
        });
    }

    console.log((page * limit) - limit); // 2 * 5 - 5 = 5

    const users = await db.Users.findAll({

        // Indica quais colunas recuperar
        attributes: ['id', 'name', 'email'],
        // Ordena os registros pela coluna ID de forma decrescente
        order: [['id', 'DESC']],
        
        offset: Number((page * limit) - limit),
        limit: limit
    });
    // Se encontrar o registro no banco de dados
    if(users) {
        // Criar objeto com as informações para paginação
        var pagination = {
            //Caminho
            path: '/users',
            // Página atual
            page,
            // URL da página anterior
            prev_page_url: page - 1 >= 1 ? page - 1 : false,
            // URL da próxima página
            next_page_url: Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
            // Última página
            lastPage,
            // Quantidade de registros
            total: countUser
        };

        return res.json({
            users,
            pagination
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