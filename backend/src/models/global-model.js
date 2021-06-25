const Sequelize = require('../services/conect.mysql').Sequelize;
const Op = Sequelize.Op;

const mysql = require('../services/conect.mysql').sequelize;


const globaisModel = mysql.define('globais', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    NewConfirmed: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    TotalConfirmed: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    NewDeaths: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    TotalDeaths: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    NewRecovered: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    TotalRecovered: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Data: {
        type: Sequelize.STRING,
        allowNull: false
    },   
});

module.exports = { globaisModel, Op } 