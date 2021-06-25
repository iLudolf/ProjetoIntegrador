const { Sequelize } = require('sequelize');

// Docker
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql'
})


const sincronizarPostgres = async () => {
    try {
        sequelize.sync();
        console.log("\n\nTodos os modelos foram sincronizados com sucesso. \n");
    } catch (erro) {
        console.error(erro);
    }
}



module.exports = { sequelize, Sequelize, sincronizarPostgres };