//Variaveis de ambiente 
require('dotenv').config({
  path: ".env"
});

const express = require('express');
var cors = require('cors');

const syncPG = require('./services/conect.mysql').sincronizarPostgres;
const app = express();

const port = process.env.APP_PORT;
const hostname = process.env.APP_HOSTNAME;

(async () => await syncPG())() //Sincroniza o Postgres

const defaultRoutes = require('./routes/default-routes');
const globalRoutes = require('./routes/global-routes');



//Parsing do conteúdo das requisições 
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(cors());

//Rotas 
app.use('/', defaultRoutes);

//Rotas - Postgres
app.use('/global', globalRoutes);


app.listen(port, hostname, () => {
  console.log(`Servidor rodando no endereço: http://${hostname}:${port}\n\n`);
});

