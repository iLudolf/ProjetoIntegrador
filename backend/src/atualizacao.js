/*Necessario criar o arquivo package.json com o comando “npm init”;
 package.json, que é o arquivo de configuração do projeto.

 Dependências: 

 npm install mssql2 -save
 npm install cors --save
 npm i node-fetch --save
 npm i node-schedule --save
 
 */
const fetch = require("node-fetch"); 
const mysql = require('mysql');
const schedule = require('node-schedule');

//Parâmetros de conexão ao Banco de Dados
let pool  = mysql.createPool({
  connectionLimit : 10, // default = 10
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'example',
  database : 'dashboard',
  // debug: false,
});




console.log("Serviço de atualização: On-line! \n")




//Rotina de Atualização: tablela Countries - 01
//Processo um pouco mais demorado
const job01 = schedule.scheduleJob( tratativaErro(), function(){
    
  pool.getConnection(function(err){
    if(err) return console.log(err);
    console.log('\n \n Conectado ao Banco de dados: ' + data() +'\n');
    imDadosApiCountries(pool); 
          
  })  //Fim do Connect
}); //Fim schedule

//Rotina de Atualização: tablela Global - 02
const job02 = schedule.scheduleJob(tratativaErro(), function(){
    
  pool.getConnection(function(err){
    if(err) return console.log(err);
    console.log('\n \n Conectado ao Banco de dados: ' + data() +'\n');
    imDadosApiGlobal(pool); 
  
         
  })  //Fim do Connect
}); //Fim schedule


// Importar dados da API
function imDadosApiGlobal(pool){ 
    
  // Conexão com a API 
   fetch('https://api.covid19api.com/summary',{
      method:'GET',
      headers: {
          'Content-Type': 'application/json;charset=utf-8' ,
          'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
          'Accept': 'application/json',        
          'mode': 'cors',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // Solicitações sem credenciais , o valor literal "*" 
                 
   }})
  
   .then(response => {
     if(response.ok){
          return response.json();
     } else {
      tratativaErro()
      return Promise.reject({ status: response.status, statusText: response.statusText });
          }      
     
   })
   
    //Retorno fetch
    .then(data =>{   
     
     //Registros da tabela
     const sql = "INSERT INTO globais(NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered, Data) VALUES ?";
      
     const values = [
           [data.Global.NewConfirmed, data.Global.TotalConfirmed, data.Global.NewDeaths, data.Global.TotalDeaths, data.Global.NewRecovered, data.Global.TotalRecovered, data.Global.Date]       
         ];
         pool.query(sql, [values], function (error, results, fields){
             if(error) return console.log(error);
             console.log('Registros Adicionados! \n\n "Global": {' + '\n'+
            "Total de Novos Casos: " +data.Global.NewConfirmed  +'\n',
            "Total de Casos Confirmados: " +data.Global.TotalConfirmed +'\n',
            "Total de Novas Mortes: " +data.Global.NewDeaths +'\n',
            "Total de Mortes:"  +data.Global.TotalDeaths +'\n',
            "Total de Novos Casos:" +data.Global.NewRecovered +'\n',
            "Total de Casos:" +data.Global.TotalRecovered +'\n',
             "Data: " +data.Global.Date             
             +'\n}');
            
         }); 
        //  pool.end();//Fecha a conexão MySQL
        //  connection.release();
       
     }); // fim do fetch 
     
  }

 // Importar dados da API
 function imDadosApiCountries(pool){ 
    
    // Conexão com a API 
     fetch('https://api.covid19api.com/summary',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8' ,
            'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
            'Accept': 'application/json',        
            'mode': 'cors',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 
                   
     }})
    
     .then(response => {
      if(response.ok){
           return response.json();
      } else {
        tratativaErro();
       return Promise.reject({ status: response.status, statusText: response.statusText });    }     
     
    })
      //Retorno fetch
      .then(data =>{   
       
        
       
       //Adicionar registros na tabela
        for(indice in data.Countries){       
          const sql = "INSERT INTO countries(Country, CountryCode, Slug, NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered, Data) VALUES ?";
          const values = [
            [data.Countries[indice].Country, 
             data.Countries[indice].CountryCode, 
             data.Countries[indice].Slug, 
             data.Countries[indice].NewConfirmed, 
             data.Countries[indice].TotalConfirmed, 
             data.Countries[indice].NewDeaths, 
             data.Countries[indice].TotalDeaths, 
             data.Countries[indice].NewRecovered, 
             data.Countries[indice].TotalRecovered, 
             data.Countries[indice].Date]       
           ];

          //  console.log(values)
          pool.query(sql, [values], function (error, results, fields){
            
               
        if(error) return console.log(error);
               console.log('Registros Adicionado! ');
              
           });

          } //FIM DO FOR  
          // pool.end(),
         
         }); // fim do fetch 
        
    } 
  
   

//Criar a tabela Global
function createTableGlobal(conn){
    let nomeTabela = "globais";
  
     // Remover tabela  "DROP DATABASE database_name;"
    //  const sql = (  "CREATE DATABASE IF NOT EXISTS database_name;" ); 
  
    const sql = ( "CREATE TABLE IF NOT EXISTS " + nomeTabela + " (n"+
          "ID int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
          "NewConfirmed varchar(30) NOT NULL,"+
          "TotalConfirmed varchar(30) NOT NULL,"+
          "NewDeaths varchar(30),"+    
          "TotalDeaths varchar(30),"+
          "NewRecovered varchar(30),"+   
          "TotalRecovered varchar(30),"+     
          "Data varchar(30) NOT NULL);"               
                    
                    );
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('Tabela Criada!' +'\nNome: '+nomeTabela +'\nData: ' +data()+'\n');
          // imDadosApiGlobal(conn) //Chamar função para adiciar registros pegando da api - Global
              });
  }
  
//Criar a tabela Countries
function createTableCountries(conn){
  let nomeTabela = "countries";
  
     // Remover tabela  "DROP DATABASE database_name;"
    //  const sql = (  "CREATE DATABASE IF NOT EXISTS database_name;" ); 
  
    const sql = ( "CREATE TABLE IF NOT EXISTS " + nomeTabela + " (n"+
          "ID int NOT NULL AUTO_INCREMENT PRIMARY KEY," +
          "Country varchar(45) NOT NULL,"+
          "CountryCode varchar(45) NOT NULL,"+
          "Slug varchar(45),"+    
          "NewConfirmed varchar(45),"+
          "TotalConfirmed varchar(45),"+   
          "NewDeaths varchar(45),"+    
          "TotalDeaths varchar(45),"+ 
          "NewRecovered varchar(45),"+ 
          "TotalRecovered varchar(45),"+ 
          "Data varchar(30) NOT NULL);"             
                   
                    );
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('Tabela Criada!'  +'\nNome: '+nomeTabela +'\nData: ' +data()+'\n');
          // imDadosApiCountries(conn) //Chamar função para adiciar registros pegando da api - Countries
      });
  }

   
function data(){
      const data = new Date();
      return data
    }
    

function tratativaErro(){
  
  const data = new Date();

  var hora = data.getHours(); 
  var minuto = data.getMinutes();  
 
  return '00 '+(minuto+1)+' '+hora+' * * *'
}