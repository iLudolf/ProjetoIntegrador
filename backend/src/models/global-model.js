const Sequelize = require('../services/conect.mysql').Sequelize;
const mysql = require('../services/conect.mysql').sequelize;

const agendamentoModel = mysql.define("globais", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    NewConfirmed: {
        type: Sequelize.STRING,
        allowNull: false
    },
    TotalConfirmed: {
        type: Sequelize.STRING,
        allowNull: false
    },
    NewDeaths: {
        type: Sequelize.STRING,
        allowNull: false
    },
    TotalDeaths: {
        type: Sequelize.STRING,
        allowNull: false
    },
    NewRecovered: {
        type: Sequelize.STRING,
        allowNull: false
    },
    TotalRecovered: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Data: {
        type: Sequelize.STRING,
        allowNull: false
    },   
});

module.exports = agendamentoModel