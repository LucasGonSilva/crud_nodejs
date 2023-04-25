const express = require("express");

const router = express.Router();

const db = require("./../db/models");

// Criar a rota listar
router.get("/users", async (req, res) => {
  const { page = 1 } = req.query;

  // Limite de registros em cada página

  const limit = 5;

  var lastPage = 1;

  const countUser = await db.Users.count();

  if (countUser !== 0) {
    lastPage = Math.ceil(countUser / limit);
  } else {
    return res.status(400).json({
      mensagem: "Error: Nenhum usuário encontrado.",
    });
  }

  const users = await db.Users.findAll({
    // Indica quais colunas recuperar
    attributes: ["id", "name", "email"],
    // Ordena os registros pela coluna ID de forma decrescente
    order: [["id", "DESC"]],

    offset: Number(page * limit - limit),
    limit: limit,
  });
  // Se encontrar o registro no banco de dados
  if (users) {
    // Criar objeto com as informações para paginação
    var pagination = {
      //Caminho
      path: "/users",
      // Página atual
      page,
      // URL da página anterior
      prev_page_url: page - 1 >= 1 ? page - 1 : false,
      // URL da próxima página
      next_page_url:
        Number(page) + Number(1) > lastPage ? false : Number(page) + Number(1),
      // Última página
      lastPage,
      // Quantidade de registros
      total: countUser,
    };

    return res.json({
      users,
      pagination,
    });
  } else {
    return res.status(400).json({
      mensagem: "Error: Nenhum usuário encontrado.",
    });
  }
});

// Criar a rota visualizar
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await db.Users.findOne({
    attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    where: { id },
  });

  if (user) {
    return res.json({
        user: user.dataValues
    });
  } else {
    return res.status(400).json({
      mensagem: "Error: Nenhum usuário encontrado.",
    });
  }

  return res.status(400).json({
    mensagem: "Error: Nenhum usuário encontrado.",
  });
});

// Criar a rotar cadastrar
router.post("/users", async (req, res) => {
  var dados = req.body;

  await db.Users.create(dados)
    .then((dadosUsuario) => {
      return res.json({
        mensagem: "Usuário cadastrado com sucesso!",
        dados: dadosUsuario,
      });
    })
    .catch(() => {
      return res.json({
        mensagem: "Error: Usuário não cadastrado com sucesso!",
      });
    });
});

module.exports = router;
