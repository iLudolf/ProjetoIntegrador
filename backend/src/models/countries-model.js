const Sequelize = require('../services/conect.postgres').Sequelize;
const postgres = require('../services/conect.postgres').sequelize;

const agendamentoModel = postgres.define('countries', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Country: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    CountryCode: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    Slug: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    NewConfirmed: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    TotalConfirmed: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    NewDeaths: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    TotalDeaths: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    NewRecovered: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },
    TotalRecovered: {
        type: Sequelize.VARCHAR,
        allowNull: false
    },

});

module.exports = agendamentoModel