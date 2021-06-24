import React, { useState, useEffect } from 'react';
import './styles.css';

const Home = () => {

  const [cardapio, setCardapio] = useState([]); 

  useEffect(() => {
    loadDados();
     }, []);

(function loadDados (){
  Dashboard01();
  Dashboard02();
  Dashboard03();
  Dashboard04();
})

function Dashboard01(){ 
    
  // Conexão com a API 
   fetch('https://iludolf.ddns.net:3000/global',{
      method:'GET',
      headers: {
          'Content-Type': 'application/json;charset=utf-8' ,
          'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
          'Accept': 'application/json',        
          'mode': 'cors',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 
                 
   }})
  
   .then(response => {
     return response.json();
     
   })
   
    //Retorno fetch
    .then(data =>{   
      const num = data.length-1;
     
      // // Pegar data da atualização
      var aux = ""+data[num].Data
      aux.substring()
  
      var dia, mes, ano, calc; 
      dia =  aux.substring(8,10)
      mes =  aux.substring(5,7)
      ano =  aux.substring(0,4)
     
      // //Atualizar Data
      var att = dia +"/"+ mes+"/"+ano
     
      
      //DATA FINAL
     
      
         
      //Atualizar Total de Casos
      document.querySelector("#idTotalDeCasos").innerHTML = abreviarNum(data[num].TotalConfirmed);
  
      //Atualizar Recuperados
      document.querySelector("#idRecuperados").innerHTML = abreviarNum(data[num].TotalRecovered);
  
      //Atualizar Recuperados
      document.querySelector("#idObitos").innerHTML =  abreviarNum(data[num].TotalDeaths);
  
      aux = ""+((data[num].TotalDeaths / data[num].TotalConfirmed) *100 )+""
      
      
      // //Atualizar Taxa de Mortalidade
      
      document.querySelector("#TaxadeMortalidade").innerHTML = abreviarNum(aux)+"%"; 
  
       // Dashboard 01 
  
       //Base de dados        
       var dashData0 = []; //dados total de casos confirmados
       var dashData1 = []; //dados total de registros por data   
       var dashData01 = [] //Novos Casos
          
       //Preencher base de dados
       for(indice in data){
       
        dashData0.push(data[indice].TotalConfirmed )
        dashData01.push(data[indice].NewConfirmed )
        dashData1.push(data[indice].Data.substring(0,10))   
  
             } 
  
          
         
    /** AREA CHART **/
    var ctx3 = document.getElementById('flotChart0').getContext('2d');
    var ctx9 = document.getElementById('flotChart0');
  
    var gradient1 = ctx3.createLinearGradient(0, 350, 0, 0);
    gradient1.addColorStop(0, 'rgba(241,0,117,0)');
    gradient1.addColorStop(1, 'rgba(241,0,117,.5)');
  
    
    var gradient2 = ctx3.createLinearGradient(0, 280, 0, 0);
    gradient2.addColorStop(0, 'rgba(0,123,255,0)');
    gradient2.addColorStop(1, 'rgba(0,123,255,.3)');
  
    new Chart(ctx9, {
      type: 'line',
      data: {
        labels: dashData1,
       
        datasets: [{
          label: 'Casos Confirmados',
          data: dashData0,
          borderColor: '#512E5F',
          borderWidth: 1,
          backgroundColor: gradient1,
              
        },{        
          label: 'Novos Casos',
          data: dashData01,
          borderColor: '#007bff',
          borderWidth: 1,
          backgroundColor: gradient2,
             }]
      },
      options: {
         maintainAspectRatio: false,
        legend: {
            position: "bottom",
            display: true,
            labels: {            
              display: true,
                        }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:false,
              fontSize: 10,             
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero:false,
              fontSize: 10,
              display: false
  
            }
          }]
        }
      }
    });// fim Dashboard  
        
      }); // fim do fetch 
  
  
   
  
    } // Fim da Função
  
  function Dashboard02() {
  
    // Conexão com a API 
  fetch('https://iludolf.ddns.net:3000/global',{
    method:'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8' ,
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
        'Accept': 'application/json',        
        'mode': 'cors',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 
               
  }})
  
  .then(response => {
   return response.json();
   
  })
  
  //Retorno fetch
  .then(data =>{           
      
    const num = data.length-1;
      
   
  
  
  
  
  
     //Calcular taxa de crescimento de casos
     var calcularPorcentAtual =  ""+(((data[num].TotalConfirmed - data[num-1].TotalConfirmed)/data[num-1].TotalConfirmed)*100); 
     var calcularPorcentAnterior = ""+(((data[num-1].TotalConfirmed - data[num-2].TotalConfirmed)/data[num-2].TotalConfirmed)*100); 
     
  
     if(data[num].TotalConfirmed > data[num-1].TotalConfirmed){
       // Se Numero de casos for maior que a dia anterior
       document.querySelector("#porcentAtual").innerHTML =  abreviarNum(data[num].TotalConfirmed)+'<i id="icoPorcentAtual" class="icon ion-md-trending-up tx-success"></i><small>'+abreviarNum(calcularPorcentAtual)+'%</small>';
  
     }if( data[num].TotalConfirmed < data[num-1].TotalConfirmed){
       //Se Numero de casos for menor que a dia anterior
       document.querySelector("#porcentAtual").innerHTML =  abreviarNum(data[num].TotalConfirmed)+' M<i id="icoPorcentAtual" class="icon ion-md-trending-down tx-danger"></i> <small>'+abreviarNum(calcularPorcentAtual)+'%</small>';
     
       
     }
   
      //Base de dados        
      var dashData2 = [];
         
    
     //Preencher base de dados
     for(indice in data){
       dashData2.push([data[indice].ID,data[indice].TotalConfirmed])
         
      } 
       
     // console.table(dashData2)
     
     $.plot('#flotChart1', [{
       data: dashData2,
       color: '#00cccc'
     }], {
       series: {
         shadowSize: 5,
         lines: {
           show: true,
           lineWidth: 2,
           fill: true,
           fillColor: { colors: [ { opacity: 0.2 }, { opacity: 0.2 } ] }
         }
       },
       grid: {
         borderWidth: 0,
         labelMargin: 0
       },
       yaxis: {
         show: false,
         min: 0,
         max: data[num].TotalConfirmed,
       },
       xaxis: {
         show: false,
         max: data.length,
       }
     }); // fim do Dashboard 02 
  
        }); // fim do fetch 
    }
  
  function Dashboard03() {
  
    // Conexão com a API 
   fetch('https://iludolf.ddns.net:3000/global',{
    method:'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8' ,
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
        'Accept': 'application/json',        
        'mode': 'cors',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 
               
  }})
  
  .then(response => {
   return response.json();
   
  })
  
  //Retorno fetch
  .then(data =>{   
   
    const num = data.length-1;
                    
        //Base de dados        
         var dashData3 = [];   
         var dashData2 = [];       
       
         //Preencher base de dados
         for(indice in data){
           dashData3.push(data[indice].NewConfirmed)
           dashData2.push(data[indice].Data.substring(0,10))
          } 
   
         //Calcular taxa de NOVOS  casos
         var calcularPorcentAtualNew =  ""+(((data[num].NewConfirmed - data[num-1].NewConfirmed)/data[num-1].NewConfirmed)*100); 
        
       
   
         if(data[num].NewConfirmed > data[num-1].NewConfirmed){
           // console.log("Numero de casos é maior" )
           document.querySelector("#totaldeCasos").innerHTML = data[num].NewConfirmed.substring(0,3)+" mil" +'<i id="icoPorcentAtual" class="icon ion-md-trending-up tx-success"></i> <small>'+calcularPorcentAtualNew.substring(0,2)+'%</small>';
   
         }if(data[num].NewConfirmed < data[num-1].NewConfirmed){
           // console.log("Numero de casos é menor" )
           document.querySelector("#totaldeCasos").innerHTML =  data[num].NewConfirmed.substring(0,3)+" mil" +'<i id="icoPorcentAtual" class="icon ion-md-trending-down tx-danger"></i> <small>'+calcularPorcentAtualNew.substring(0,2)+'%</small>';
                  
         }       
  
  
         var ctx8 = document.getElementById('flotChart2');
         new Chart(ctx8, {
           type: 'line',
           data: {
             labels: dashData2,
             datasets: [{
              //  data: [12, 15, 18],
              //  borderColor: '#f10075',
              //  borderWidth: 1,
              //  fill: false
             },{
               data: dashData3,
               borderColor: '#007bff',
               borderWidth: 1,
               fill: false
             }]
           },
           options: {
             maintainAspectRatio: false,
             legend: {
               display: false,
                 labels: {
                   display: false
                 }
             },
             scales: {
               yAxes: [{
                 ticks: {
                   display: false,
                   beginAtZero:true,
                   fontSize: 10,
                  //  max: 80
                 }
               }],
               xAxes: [{
                 ticks: {
                   display: false,
                   beginAtZero:true,
                   fontSize: 11
                 }
               }]
             }
           }
         });
                  
         
     
    }); // fim do fetch 
  
    }  
  
  function Dashboard04() {
  
    // Conexão com a API 
   fetch('https://iludolf.ddns.net:3000/global',{
    method:'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8' ,
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
        'Accept': 'application/json',        
        'mode': 'cors',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 
               
  }})
  
  .then(response => {
   return response.json();
   
  })
  
  //Retorno fetch
  .then(data =>{   
    const num = data.length-1;     
      
    //Base de dados        
    var totalCData03 = []; //Dados total de casos confirmados
    var newCData03 = []; //Dados total de registros por data   
    var dData03 = [] //Novos Casos
    
    var valor= data[num].NewConfirmed.length;
    console.log()
    //Preencher base de dados
    for(indice in data){   
      newCData03.push(parseInt(data[indice].NewConfirmed))
      dData03.push(data[indice].Data.substring(0,10))   
  
          } 
  
  
  
  var ctx3 = document.getElementById('chartBar5').getContext('2d');
  
    var gradient = ctx3.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, '#560bd0');
    gradient.addColorStop(1, '#00cccc');
  
    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: dData03,      
        datasets: [{
          label: 'Novos Casos',
          data: newCData03,
          backgroundColor: gradient
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
            labels: {
              display: false
            }
        },
        scales: {
          yAxes: [{
            ticks: {
              display: false,
              beginAtZero:true,
              fontSize: 10,
                 }
          }],
          xAxes: [{
            barPercentage: 0.6,
            ticks: {
              display: false,
              beginAtZero:true,
              fontSize: 11
              
            }
          }]
        }
      }
    });
        
   
        
       
    document.querySelector("#novosCasos").innerHTML = calcularPorcentAtualNew.substring(0,2)+'%';
      
      
      //Fim Dashboard 
    }); // fim do fetch 
  
    }  
  
    function Dashboard05() {
   
      //TABELA - PAIS
      var dataAtual = new Date();
      var dia = dataAtual.getDate();
      var mes = (dataAtual.getMonth() + 1);
      var ano = dataAtual.getFullYear();
     //  var horas = dataAtual.getHours();
     //  var minutos = dataAtual.getMinutes();
  
  
     
     
  
   const url = `https://iludolf.ddns.net:3000/countries/${dataAtualFormatada()}`; 
      
   fetch(url,{
    method:'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8' ,
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
        'Accept': 'application/json',        
        'mode': 'cors',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 
               
  }})
  
  .then(response => {
   return response.json();
   
  })
  
  //Retorno fetch
  .then(data =>{   
  
  
  
   
   
  
  
   var dadosPais="";
   var infdados ="";
   var color = ['bg-purple','bg-primary','bg-info', 'bg-teal', 'bg-gray'];
   var dashdata =[];
  
  
  
   for(var i = 0; i <= 4; i++){
     dashdata.push(data[i].Country); 
     
     var valores  = abreviarNum(data[i].TotalConfirmed).replace("M"," ");
     var dataValores  = valores.replace(",",".");
  
          
  
     dadosPais += '<div class="az-traffic-detail-item">'+
     '<div>'+
     '<span>'+data[i].Country+'</span>'+
     '<span>'+abreviarNum(data[i].TotalConfirmed)+'<span></span></span>'+
     '</div>'+
     '<div class="progress">'+
    '<div class="progress-bar '+color[i]+' "style="width: '+parseInt (dataValores)+'%" ></div>'+
    '</div>'+
    '</div>';
  
  
    infdados += '<div class="az-list-item">'+
      '<div>'+
    '<h6>'+data[i].Country+'</h6>'+
    '<span>Total casos confirmados</span>'+
    '</div>'+
    '<div>'+
    '<h6 class="tx-primary">'+abreviarNum(data[i].NewConfirmed)+'</h6>'+
    '<span>'+abreviarNum(data[i].TotalConfirmed)+'</span>'+
    '</div>'+
    '</div>';
   
   }
  
   document.querySelector("#totaldeCasosDash05").innerHTML = infdados;
   document.querySelector("#teste").innerHTML = dadosPais;
   
   // Donut Chart
   var datapie = {
     labels: dashdata,
     datasets: [{
       data: [data[0].TotalConfirmed, data[1].TotalConfirmed, data[2].TotalConfirmed, data[3].TotalConfirmed,data[4].TotalConfirmed],
       backgroundColor: ['#6f42c1', '#007bff','#17a2b8','#00cccc','#adb2bd']
     }]
   };
  
   var optionpie = {
     maintainAspectRatio: false,
     responsive: true,
     legend: {
       display: false,
     },
     animation: {
       animateScale: true,
       animateRotate: true
     }
   };
  
   // For a doughnut chart
   var ctxpie= document.getElementById('chartDonut');
   var myPieChart6 = new Chart(ctxpie, {
     type: 'doughnut',
     data: datapie,
     options: optionpie
   });
  
  
  
  
    }); // fim do fetch 
  
  }   
  
  function PorcentagemDeCasosRecuperadas(){
    
    const url = `https://iludolf.ddns.net:3000/global/${dataAtualFormatada()}`; 
      
    fetch(url,{
    method:'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8' ,
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
        'Accept': 'application/json',        
        'mode': 'cors',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 
               
  }})
  
  .then(response => {
   return response.json();
   
  })
  
  //Retorno fetch
  .then(data =>{   
    
    document.getElementById('infT').innerHTML =  "Doença coronavírus (COVID-19)" ; 
  
    //Estatísticas
    var dadosTotalCasos = `<div class="card-chart bg-purple">`+
               `<span class="peity-bar" data-peity='{"fill": ["#fff"], "width": 20, "height": 20 }'>6,4,7,5,7</span>`+
               `</div>`+
               `<div>`+
               `<label>Total de Casos</label>`+
               `<h4>${abreviarNum(data[0].TotalConfirmed)}</h4>`+
               `</div>`;
    
      document.getElementById('peityBarNovosCasos').innerHTML =  dadosTotalCasos; 
  
  
      var dadosNovosCasos = `<div class="card-chart bg-primary">`+
      `<span class="peity-bar" data-peity='{"fill": ["#fff"], "width": 20, "height": 20 }'>6,4,7,5,7</span>`+
      `</div>`+
      `<div>`+
      `<label>Novos Casos</label>`+
      `<h4>${abreviarNum(data[0].NewConfirmed)}</h4>`+
      `</div>`;
  
      document.getElementById('peityBarTotalCasos').innerHTML =  dadosNovosCasos;
      
    
  $('.peity-bar').peity('bar'); //Criar Canvas 
       
  
  $('.peity-donut').peity('donut');  
    
        
    }); // fim do fetch 
   } 
  
  function tableCountries() {
    
        const url = `https://iludolf.ddns.net:3000/countries/${dataAtualFormatada()}`; 
      
       fetch(url,{
       method:'GET',
       headers: {
           'Content-Type': 'application/json;charset=utf-8' ,
           'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
           'Accept': 'application/json',        
           'mode': 'cors',
           'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 
                  
    }})
   
    .then(response => {
      return response.json();
      
    })
    
     //Retorno fetch
     .then(data =>{   
      
       const num = data.length-1;
       console.log(data[num].Country);
       var paises = "";
         
  
        for (key in data) {         
         
          paises += '<tr>'+
         '<td><i class="flag-icon flag-icon-'+data[key].CountryCode.toLowerCase()+' flag-icon-squared"></i></td>'+
         '<td><strong>'+data[key].Country+'</strong></td>'+
         '<td><strong>'+abreviarNum(data[key].TotalConfirmed)+'</strong></td>'+
         '<td>'+abreviarNum(data[key].TotalRecovered)+'</td>'+
         '<td>'+abreviarNum(data[key].TotalDeaths)+'</td>'+
       '</tr>';
  
       
        }
  
  
        document.querySelector("#idPais").innerHTML = paises;
        
       }); // fim do fetch 
  
    }    
  
  
  function spinner() {    
  
      document.getElementById("loading").style.display = "none";
      document.getElementById("conteudo").style.display = "inline";
  
  
    // let test = document.querySelector("#body").innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    
  }
  
  //Abrevie um número milhares (1k) e milhões (1m)
  function intlFormat(num)
  {
    return new Intl.NumberFormat().format(Math.round(num*10)/10);
  }
  function abreviarNum(num)
  {
    if(num >= 1000000)
      return intlFormat(num/1000000)+' M ';
    if(num >= 1000)
      return intlFormat(num/1000)+' mil';
    return intlFormat(num);
  }
  
  function calcularPorcent(params1, params2) {
    console.log(params1, params2)
    return ((((params1-params2)/params2)*100)*100)
  }
  
  function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return anoF+"-"+mesF+"-"+diaF;
  }
  

  return (
    <>

      <div id="conteudo">
        <div class="az-content az-content-dashboard">
          <div class="container">
            <div class="az-content-body">

              <div class="row row-sm mg-b-20">
                <div class="col-lg-7 ht-lg-100p">
                  <div class="card card-dashboard-one">
                    <div class="card-header">
                      <div>
                        <h6 class="card-title">Vista Geral de Casos</h6>
                        <p class="card-text"></p>
                      </div>
                      <div class="btn-group">
                        <button class="btn active">Total de casos</button>
                        <button class="btn">Recuperados</button>
                        <button class="btn">Óbitos</button>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="card-body-top">
                        <div>
                          <label class="mg-b-0">Total de casos: &nbsp</label>
                          <b><label id="idTotalDeCasos" class="float-right"> </label></b>
                        </div>
                        <div>
                          <label class="mg-b-0" >Recuperados: &nbsp</label>
                          <b><label id="idRecuperados" class="float-right"></label></b>
                        </div>
                        <div>
                          <label class="mg-b-0" >Óbitos: &nbsp</label>
                          <b><label id="idObitos" class="float-right"></label></b>
                        </div>
                        <div>
                          <label class="mg-b-0" >Taxa de Mortalidade: &nbsp</label>
                          <b><label id="TaxadeMortalidade" class="float-right"></label></b>
                        </div>
                      </div>
                      <div class="">
                        <div id="flotChart" class="flot-chart"><canvas id="flotChart0" ></canvas></div>
                      </div>

                    </div>

                  </div>


                </div>
                <div class="col-lg-5 mg-t-20 mg-lg-t-0">
                  <div class="row row-sm">
                    <div class="col-sm-6">
                      <div class="card card-dashboard-two">
                        <div class="card-header">
                          <h6 id="porcentAtual"></h6>
                          <p id="txdEvolucao">Total de casos</p>
                        </div>
                        <div class="card-body">
                          <div class="chart-wrapper">
                            <div id="flotChart1" class="flot-chart"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-6 mg-t-20 mg-sm-t-0">
                      <div class="card card-dashboard-two">
                        <div class="card-header">
                          <h6 id="totaldeCasos">86k </h6>
                          <p>Novos Casos</p>
                        </div>
                        <div class="card-body">
                          <div class="chart-wrapper">
                            <div class="flot-chart"><canvas id="flotChart2" ></canvas></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 mg-t-20">
                      <div class="card card-dashboard-three">
                        <div class="card-header">
                          <p>Novos Casos</p>
                          <h6 id="novosCasos">16,869 </h6>
                          <small></small>
                        </div>
                        <div class="card-body">
                          <div class="chart"><canvas id="chartBar5"></canvas></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



              </div>

            </div>


          </div>



        </div>



      </div>
    </>
  );
}



export default Home;