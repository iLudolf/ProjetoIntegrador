const { Sequelize, sequelize  }= require('../services/conect.mysql').Sequelize;
const Op = Sequelize.Op;


const mysql = require('../services/conect.mysql').sequelize;

const countriesModel = mysql.define('countries', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    CountryCode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Slug: {
        type: Sequelize.STRING,
        allowNull: false
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



module.exports = { countriesModel, Op,sequelize }