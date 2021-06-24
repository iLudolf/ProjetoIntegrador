let router = require('express').Router();

router.get('/', function (req, res) {
  res.json(dados);
});


const dados = {
  "Rotas": {
    "Name": "Todas as rotas",
    "Description": "Informações sobre a API - 30/05/2021",
    "Path": "/"
  },
  Pessoas: {
    "Metodo: GET": {
      "Name": "Listar todas as pessoas cadastradas",
      "Description": "Retorna todas as Pessoas e seus dados.",
      "Path": "/pg/pessoas/"
    },
    "Metodo: GET (ID)": {
      "Name": "Listar pessoa por ID",
      "Description": "Retorna registro pegando por o ID .",
      "Path": "/pg/pessoas/ID"
    },
    "Metodo: POST": {
      "Name": "Enviar registro",
      "Description": `Retorna todas as Pessoas e seus dados.`,
      "Path": "/pg/pessoas/"
    },
    "Metodo: DELETE (ID)": {
      "Name": "Deletar registro pessoa",
      "Description": `Deleta registro pessoa, se for existente.`,
      "Path": "/pg/pessoas/"
    }
  },
  Unidades: {
    "Metodo: GET": {
      "Name": "Listar todas as unidades de saúde ( cadastradas",
      "Description": "Retorna todas as Pessoas e seus dados.",
      "Path": "/pg/unidades/"
    },
    "Metodo: GET (ID)": {
      "Name": "Listar unidade de saúde por ID",
      "Description": "Retorna unidades de saúde pegando por o ID .",
      "Path": "/pg/unidades/ID"
    },
    "Metodo: POST": {
      "Name": "registrar nova unidade de saúde",
      "Description": `adiciona uma nova unidades de saúde.`,
      "Path": "/pg/unidades/"
    },
    "Metodo: DELETE (ID)": {
      "Name": "Deletar unidade de saúde",
      "Description": `Deleta a unidades de saúde, passando por ID.`,
      "Path": "/pg/unidades/"
    },
  },
  Agendamentos: {
    "Metodo: GET": {
      "Name": "Listar todas os agendamentos cadastrados",
      "Description": "Retorna todas os agendamentos.",
      "Path": "/pg/agendamentos/"
    },
    "Metodo: GET (ID)": {
      "Name": "Listar pessoa por ID",
      "Description": "Retorna agendamentos pegando por o ID .",
      "Path": "/pg/agendamentos/ID"
    },
    "Metodo: POST": {
      "Name": "Enviar registro",
      "Description": `Retorna todas os agendamentos.`,
      "Path": "/pg/agendamentos/"
    },
    "Metodo: DELETE (ID)": {
      "Name": "Enviar registro",
      "Description": `Retorna todas os agendamentos.`,
      "Path": "/pg/pessoas/"
    }
  },

}



module.exports = router;