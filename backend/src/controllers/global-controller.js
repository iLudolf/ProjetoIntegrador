const { globaisModel, Op, sequelize } = require('../models/global-model');


exports.listarRegistros = async (req, res) => {

    try {
        const global = await globaisModel.findAll({});

        res.status(200).json({
            status: 'OK',
            global
        })
    } catch (error) {
        res.status(404).json({
            status: 'erro',
            message: 'Não foi possível recuperar os dados globais' + error
        })
    }
}

exports.listarRegistrosPorID = async (req, res) => {
    try {
        let data = req.params.id;

        const global = await globaisModel.findAll({
            where: {
                data: { [Op.startsWith]: `${req.params.id}%` }
            }
        })

        if (global) {
            res.status(200).json({
                status: "ok",
                message: "usuário encontrado com sucesso!",
                global
            })
        } else {
            res.status(406).json({
                status: "erro",
                message: `Não foi possivel localizar o usuário de id ${data}!`
            })
        }
    } catch (erro) {
        res.status(404).json({
            status: "erro",
            message: `Erro ao localizar o usuários com id ${data}!`
        })
    }
}

