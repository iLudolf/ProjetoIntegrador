$(function () {

  Dashboard01();
  Dashboard02();
  Dashboard03();
  Dashboard04();
  Dashboard05();
  PorcentagemDeCasosRecuperadas();
  tableCountries();
  spinner();


});

function Dashboard01() {

  // Conexão com a API 
  fetch('http://localhost:3000/global', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      'Accept': 'application/json',
      'mode': 'cors',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 

    }
  })

    .then(response => {
      return response.json();

    })

    //Retorno fetch
    .then(data => {

      const num = data.global.length - 1;

      // // Pegar data da atualização
      var aux = "" + data.global[num].Data
      aux.substring()

      var dia, mes, ano, calc;
      dia = aux.substring(8, 10)
      mes = aux.substring(5, 7)
      ano = aux.substring(0, 4)

      // //Atualizar Data
      var att = dia + "/" + mes + "/" + ano
      document.querySelector("#idAtualizacao").innerHTML = "Atualizado em: " + att;

      //DATA FINAL
      document.querySelector("#idDataFinal").innerHTML = att;


      //Atualizar Total de Casos
      document.querySelector("#idTotalDeCasos").innerHTML = abreviarNum(data.global[num].TotalConfirmed);

      //Atualizar Recuperados
      document.querySelector("#idRecuperados").innerHTML = abreviarNum(data.global[num].TotalRecovered);

      //Atualizar Recuperados
      document.querySelector("#idObitos").innerHTML = abreviarNum(data.global[num].TotalDeaths);

      aux = "" + ((data.global[num].TotalDeaths / data.global[num].TotalConfirmed) * 100) + ""


      // //Atualizar Taxa de Mortalidade

      document.querySelector("#TaxadeMortalidade").innerHTML = abreviarNum(aux) + "%";

      // Dashboard 01 

      //Base de dados        
      var dashData0 = []; //dados total de casos confirmados
      var dashData1 = []; //dados total de registros por data   
      var dashData01 = [] //Novos Casos


      //Preencher base de dados
      for (indice in data.global) {

        dashData0.push(data.global[indice].TotalConfirmed)
        dashData01.push(data.global[indice].NewConfirmed)
        dashData1.push(data.global[indice].Data.substring(0, 10))

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

          }, {
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
                beginAtZero: false,
                fontSize: 10,
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: false,
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
  fetch('http://localhost:3000/global', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      'Accept': 'application/json',
      'mode': 'cors',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 

    }
  })

    .then(response => {
      return response.json();

    })

    //Retorno fetch
    .then(data => {

      const num = data.global.length - 1;


      //Calcular taxa de crescimento de casos
      var calcularPorcentAtual = "" + (((data.global[num].TotalConfirmed - data.global[num - 1].TotalConfirmed) / data.global[num - 1].TotalConfirmed) * 100);
      var calcularPorcentAnterior = "" + (((data.global[num - 1].TotalConfirmed - data.global[num - 2].TotalConfirmed) / data.global[num - 2].TotalConfirmed) * 100);


      if (data.global[num].TotalConfirmed > data.global[num - 1].TotalConfirmed) {
        // Se Numero de casos for maior que a dia anterior
        document.querySelector("#porcentAtual").innerHTML = abreviarNum(data.global[num].TotalConfirmed) + '<i id="icoPorcentAtual" class="icon ion-md-trending-up tx-success"></i><small>' + abreviarNum(calcularPorcentAtual) + '%</small>';

      } if (data.global[num].TotalConfirmed < data.global[num - 1].TotalConfirmed) {
        //Se Numero de casos for menor que a dia anterior
        document.querySelector("#porcentAtual").innerHTML = abreviarNum(data.global[num].TotalConfirmed) + ' M<i id="icoPorcentAtual" class="icon ion-md-trending-down tx-danger"></i> <small>' + abreviarNum(calcularPorcentAtual) + '%</small>';


      }

      //Base de dados        
      var dashData2 = [];


      //Preencher base de dados
      for (indice in data.global) {
        dashData2.push([data.global[indice].id, data.global[indice].TotalConfirmed])

      }

      console.log(data.global)
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
            fillColor: { colors: [{ opacity: 0.2 }, { opacity: 0.2 }] }
          }
        },
        grid: {
          borderWidth: 0,
          labelMargin: 0
        },
        yaxis: {
          show: false,
          min: 0,
          max: data.global[num].TotalConfirmed,
        },
        xaxis: {
          show: false,
          max: data.global.length,
        }
      }); // fim do Dashboard 02 

    }); // fim do fetch 
}

function Dashboard03() {

  // Conexão com a API 
  fetch('http://localhost:3000/global', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      'Accept': 'application/json',
      'mode': 'cors',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 

    }
  })

    .then(response => {
      return response.json();

    })

    //Retorno fetch
    .then(data => {

      const num = data.global.length - 1;

      //Base de dados        
      var dashData3 = [];
      var dashData2 = [];

      //Preencher base de dados
      for (indice in data) {
        dashData3.push(data.global[indice].NewConfirmed)
        dashData2.push(data.global[indice].Data.substring(0, 10))       
      }

      
      //Calcular taxa de NOVOS  casos
      var calcularPorcentAtualNew = "" + (((data.global[num].NewConfirmed - data.global[num - 1].NewConfirmed) / data.global[num - 1].NewConfirmed) * 100);



      if (data.global[num].NewConfirmed > data.global[num - 1].NewConfirmed) {
        // console.log("Numero de casos é maior" )
        document.querySelector("#totaldeCasos").innerHTML = data.global[num].NewConfirmed.substring(0, 3) + " mil" + '<i id="icoPorcentAtual" class="icon ion-md-trending-up tx-success"></i> <small>' + calcularPorcentAtualNew.substring(0, 2) + '%</small>';

      } if (data.global[num].NewConfirmed < data.global[num - 1].NewConfirmed) {
        // console.log("Numero de casos é menor" )
        document.querySelector("#totaldeCasos").innerHTML = data.global[num].NewConfirmed.substring(0, 3) + " mil" + '<i id="icoPorcentAtual" class="icon ion-md-trending-down tx-danger"></i> <small>' + calcularPorcentAtualNew.substring(0, 2) + '%</small>';

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
          }, {
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
                beginAtZero: true,
                fontSize: 10,
                //  max: 80
              }
            }],
            xAxes: [{
              ticks: {
                display: false,
                beginAtZero: true,
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
  fetch('http://localhost:3000/global', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      'Accept': 'application/json',
      'mode': 'cors',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 

    }
  })

    .then(response => {
      return response.json();

    })

    //Retorno fetch
    .then(data => {
      const num = data.global.length - 1;

      //Base de dados        
      var totalCData03 = []; //Dados total de casos confirmados
      var newCData03 = []; //Dados total de registros por data   
      var dData03 = [] //Novos Casos

      var valor = data.global[num].NewConfirmed.length;
      console.log()
      //Preencher base de dados
      for (indice in data.global) {
        newCData03.push(parseInt(data.global[indice].NewConfirmed))
        dData03.push(data.global[indice].Data.substring(0, 10))

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
                beginAtZero: true,
                fontSize: 10,
              }
            }],
            xAxes: [{
              barPercentage: 0.6,
              ticks: {
                display: false,
                beginAtZero: true,
                fontSize: 11

              }
            }]
          }
        }
      });




      document.querySelector("#novosCasos").innerHTML = calcularPorcentAtualNew.substring(0, 2) + '%';


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


console.log(dataAtualFormatada())


  const url = `http://localhost:3000/countries/${dataAtualFormatada()}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      'Accept': 'application/json',
      'mode': 'cors',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 

    }
  })

    .then(response => {
      return response.json();

    })

    //Retorno fetch
    .then(data => {


    




      var dadosPais = "";
      var infdados = "";
      var color = ['bg-purple', 'bg-primary', 'bg-info', 'bg-teal', 'bg-gray'];
      var dashdata = [];



      for (var i = 0; i <= 4; i++) {
        dashdata.push(data.global[i].Country);

        var valores = abreviarNum(data.global[i].TotalConfirmed).replace("M", " ");
        var dataValores = valores.replace(",", ".");



        dadosPais += '<div class="az-traffic-detail-item">' +
          '<div>' +
          '<span>' + data.global[i].Country + '</span>' +
          '<span>' + abreviarNum(data.global[i].TotalConfirmed) + '<span></span></span>' +
          '</div>' +
          '<div class="progress">' +
          '<div class="progress-bar ' + color[i] + ' "style="width: ' + parseInt(dataValores) + '%" ></div>' +
          '</div>' +
          '</div>';


        infdados += '<div class="az-list-item">' +
          '<div>' +
          '<h6>' + data.global[i].Country + '</h6>' +
          '<span>Total casos confirmados</span>' +
          '</div>' +
          '<div>' +
          '<h6 class="tx-primary">' + abreviarNum(data.global[i].NewConfirmed) + '</h6>' +
          '<span>' + abreviarNum(data.global[i].TotalConfirmed) + '</span>' +
          '</div>' +
          '</div>';

      }

      document.querySelector("#totaldeCasosDash05").innerHTML = infdados;
      document.querySelector("#teste").innerHTML = dadosPais;
 
      // Donut Chart
      var datapie = {
        labels: dashdata,
        datasets: [{
          data: [data.global[0].TotalConfirmed, data.global[1].TotalConfirmed, data.global[2].TotalConfirmed, data.global[3].TotalConfirmed, data.global[4].TotalConfirmed],
          backgroundColor: ['#6f42c1', '#007bff', '#17a2b8', '#00cccc', '#adb2bd']
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
      var ctxpie = document.getElementById('chartDonut');
      var myPieChart6 = new Chart(ctxpie, {
        type: 'doughnut',
        data: datapie,
        options: optionpie
      });




    }); // fim do fetch 

}

function PorcentagemDeCasosRecuperadas() {

  const url = `http://localhost:3000/global/${dataAtualFormatada()}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      'Accept': 'application/json',
      'mode': 'cors',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 

    }
  })

    .then(response => {
      return response.json();

    })

    //Retorno fetch
    .then(data => {

      document.getElementById('infT').innerHTML = "Doença coronavírus (COVID-19)";

      //Estatísticas
      var dadosTotalCasos = `<div class="card-chart bg-purple">` +
        `<span class="peity-bar" data-peity='{"fill": ["#fff"], "width": 20, "height": 20 }'>6,4,7,5,7</span>` +
        `</div>` +
        `<div>` +
        `<label>Total de Casos</label>` +
        `<h4>${abreviarNum(data.global[0].TotalConfirmed)}</h4>` +
        `</div>`;

      document.getElementById('peityBarNovosCasos').innerHTML = dadosTotalCasos;


      var dadosNovosCasos = `<div class="card-chart bg-primary">` +
        `<span class="peity-bar" data-peity='{"fill": ["#fff"], "width": 20, "height": 20 }'>6,4,7,5,7</span>` +
        `</div>` +
        `<div>` +
        `<label>Novos Casos</label>` +
        `<h4>${abreviarNum(data.global[0].NewConfirmed)}</h4>` +
        `</div>`;

      document.getElementById('peityBarTotalCasos').innerHTML = dadosNovosCasos;


      $('.peity-bar').peity('bar'); //Criar Canvas 


      $('.peity-donut').peity('donut');


    }); // fim do fetch 
}

function tableCountries() {

  const url = `http://localhost:3000/countries/${dataAtualFormatada()}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864',
      'Accept': 'application/json',
      'mode': 'cors',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 

    }
  })

    .then(response => {
      return response.json();

    })

    //Retorno fetch
    .then(data => {

      const num = data.global.length - 1;
      console.log(data.global[num].Country);
      var paises = "";


      for (key in data.global) {

        paises += '<tr>' +
          '<td><i class="flag-icon flag-icon-' + data.global[key].CountryCode.toLowerCase() + ' flag-icon-squared"></i></td>' +
          '<td><strong>' + data.global[key].Country + '</strong></td>' +
          '<td><strong>' + abreviarNum(data.global[key].TotalConfirmed) + '</strong></td>' +
          '<td>' + abreviarNum(data.global[key].TotalRecovered) + '</td>' +
          '<td>' + abreviarNum(data.global[key].TotalDeaths) + '</td>' +
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
function intlFormat(num) {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}
function abreviarNum(num) {
  if (num >= 1000000)
    return intlFormat(num / 1000000) + ' M ';
  if (num >= 1000)
    return intlFormat(num / 1000) + ' mil';
  return intlFormat(num);
}

function calcularPorcent(params1, params2) {
  console.log(params1, params2)
  return ((((params1 - params2) / params2) * 100) * 100)
}

function dataAtualFormatada() {
  var data = new Date(),
    dia = data.getDate().toString(),
    diaF = (dia.length == 1) ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = (mes.length == 1) ? '0' + mes : mes,
    anoF = data.getFullYear();
  return anoF + "-" + mesF + "-" + diaF;
}

function iframe() {

  var iframe = '<iframe id="idIframing" src="../template/countries.html" frameborder="1" ></iframe><br />';
  document.querySelector("#iframe").innerHTML = iframe;

  //   var $login = $("#idIframing")
  //   $button = $("#testBTN");

  // $button.on("click",function(){  
  // $button.prop('disabled',true);
  //   $login.slideDown(300,function(){

  //       $button.prop('disabled',false);

  //       $(document).on('click.slideForm',function(e){
  //           e = [e.target.id,e.target.parentNode.id].join('');
  //           if (e !== 'idIframing') {
  //               $login.hide('fast');
  //               $(this).off('click.slideForm');
  //           }

  //       })
  //   });
  // });

}


