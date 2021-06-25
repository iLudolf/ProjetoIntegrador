$(function(){   
  
  var aux = dataAtualFormatada();
  aux.substring()

  var dia, mes, ano, calc; 
  dia =  aux.substring(8,10)
  mes =  aux.substring(5,7)
  ano =  aux.substring(0,4) 


  document.querySelector("#idDataFinal").innerHTML = dia+"/"+mes+"/"+ano;


  tableCountries();
  const minConfirmed = 50;
  const myMap = L.map("mapid").setView([45, 0], 2);
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(myMap);
  
  data
    .filter(d => d.Confirmed > minConfirmed)
    .forEach(d => {
      const marker = L.circle([d.Lat, d.Long_], {
        color: "red",
        fillColor: "red",
        fillOpacity: 0.5,
        // radius: (5000000 * d.Deaths) / (d.Confirmed + d.Deaths + d.Active)
        radius: d.Deaths * 100
      }).addTo(myMap);
      marker.bindPopup(
        `<h2>${d.Province_State ||
          d.Country_Region}</h2><p class="popup"><br>Confirmed cases:${
          d.Confirmed
        }<br>Deaths:${d.Deaths}<br>Recovered:${d.Recovered}<br>Active:${
          d.Active
        }</p>`
      );
       });
  
     


      
      });// Fim da função




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
     '</tr>'; }

    document.querySelector("#tableCountries").innerHTML = paises;
   
    spinner();   
   }); // fim do fetch 

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

function spinner() {    

  document.getElementById("loading").style.display = "none";
  document.getElementById("conteudo").style.display = "inline";


// let test = document.querySelector("#body").innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';

}