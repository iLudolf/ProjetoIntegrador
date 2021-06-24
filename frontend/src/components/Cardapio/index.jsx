import React, { useState, useEffect } from 'react';
import './styles.css';

import Sidebars from '../../components/Sidebars/';
import Navbar from '../../components/Navbar/';
import Footer from '../../components/Footer';

import Spinner from '../../components/Spinner';

const Cardapio = () => {

  document.title = "Cardápio";

  const [cardapio, setCardapio] = useState([]);
  const [spinner, setSpinner] = useState();

  useEffect(() => {
    loadDadosCardapio();
    getLocation();
  }, []);

  window.onload = function () {
    getLocation()
  };


  //Verificar se o usuario liberou o navegador para pegar a localização 
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
  }

  function showPosition(position) {
    //LATITUDE E LONGITUDE ATUAL
    const LATITUDE = position.coords.latitude
    const LONGITUDE = position.coords.longitude

    //VIANA
    const LATITUDE_VIA = -20.385503
    const LONGITUDE_VIA = -40.497976

    //LINHARES
    const LATITUDE_LIN = -19.4860292
    const LONGITUDE_LIN = -40.1238165

    //TEIXEIRA DE FREIAS
    const LATITUDE_TXF = -17.5323359
    const LONGITUDE_TXF = -39.7126226

    //VITORIA DA CONQUISTA
    const LATITUDE_VCA = -14.8230273
    const LONGITUDE_VCA = -40.8172248



    if ((LATITUDE_VIA.toFixed(2) == LATITUDE.toFixed(2)) && (LONGITUDE_VIA.toFixed(2) == LONGITUDE.toFixed(2))) {
      let unidade = "viana";
      loadDadosCardapio(unidade);
      return
    } else if ((LATITUDE_LIN.toFixed(2) == LATITUDE.toFixed(2)) && (LONGITUDE_LIN.toFixed(2) == LONGITUDE.toFixed(2))) {
      let unidade = "linhares";
      loadDadosCardapio(unidade);
      return
    } else if ((LATITUDE_TXF.toFixed(2) == LATITUDE.toFixed(2)) && (LONGITUDE_TXF.toFixed(2) == LONGITUDE.toFixed(2))) {
      let unidade = "teixiera de freitas";
      loadDadosCardapio(unidade);
      return
    } else if ((LATITUDE_VCA.toFixed(2) == LATITUDE.toFixed(2)) && (LONGITUDE_VCA.toFixed(2) == LONGITUDE.toFixed(2))) {
      let unidade = "vitoria da conquista";
      loadDadosCardapio(unidade);
      return
    }
  }


  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("Usuário rejeitou a solicitação de Geolocalização.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Localização indisponível.");
        break;
      case error.TIMEOUT:
        console.log("A requisição expirou.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("Algum erro desconhecido aconteceu.");
        break;
    }
  }


  const loadDadosCardapio = async (params) => {
    setSpinner(false);
    let api_url;

    if (params == undefined) {
      api_url = `http://localhost:3001/menu/viana`;
    } else {
      api_url = `http://localhost:3001/menu/${params}`;
    }

    const response = await fetch(api_url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setCardapio(
      <tbody>
        <tr className="tableTD">
          <th><img src="./icons-cardapio/steak-one.svg" width="30" className="mx-5" height="30" title="Primeiro prato" alt="Primeiro prato"></img></th>
          <td>{converterMaiusculas(data.message[0].beefOneMonday)}</td>
          <td>{converterMaiusculas(data.message[0].beefOneTuesday)}</td>
          <td>{converterMaiusculas(data.message[0].beefOneWednesday)}</td>
          <td >{converterMaiusculas(data.message[0].beefOneThursday)}</td>
          <td>{converterMaiusculas(data.message[0].beefOneFriday)}</td>
        </tr>
        <tr className="tableTD">
          <th ><img src="./icons-cardapio/sausage-two.svg" className="mx-5" width="30" height="30" title="Segundo prato" alt="Segundo prato"></img></th>
          <td>{converterMaiusculas(data.message[0].beefTwoMonday)}</td>
          <td>{converterMaiusculas(data.message[0].beefTwoTuesday)}</td>
          <td>{converterMaiusculas(data.message[0].beefTwoWednesday)}</td>
          <td>{converterMaiusculas(data.message[0].beefTwoThursday)}</td>
          <td>{converterMaiusculas(data.message[0].beefTwoFriday)}</td>
        </tr>
        <tr className="tableTD">
          <th scope="row"><img src="./icons-cardapio/soup-bowl.svg" className="mx-5" width="30" height="30" title="Guarnição" alt="Guarnição"></img></th>
          <td>{converterMaiusculas(data.message[0].garnishMonday)}</td>
          <td>{converterMaiusculas(data.message[0].garnishTuesday)}</td>
          <td>{converterMaiusculas(data.message[0].garnishWednesday)}</td>
          <td>{converterMaiusculas(data.message[0].garnishThursday)}</td>
          <td>{converterMaiusculas(data.message[0].garnishFriday)}</td>
        </tr>
        <tr className="tableTD">
          <th ><img src="./icons-cardapio/broccoli.svg" className="mx-5" width="30" height="30" title="Salada" alt="Salada"></img></th>
          <td>{converterMaiusculas(data.message[0].saladMonday)}</td>
          <td>{converterMaiusculas(data.message[0].saladTuesday)}</td>
          <td>{converterMaiusculas(data.message[0].saladWednesday)}</td>
          <td>{converterMaiusculas(data.message[0].saladThursday)}</td>
          <td>{converterMaiusculas(data.message[0].saladFriday)}</td>
        </tr>
        <tr className="tableTD">
          <th className="tableTD"><img src="./icons-cardapio/drinks.svg" className="mx-5" width="30" height="30" title="Suco" alt="Suco"></img></th>
          <td>{converterMaiusculas(data.message[0].juiceMonday)}</td>
          <td>{converterMaiusculas(data.message[0].juiceTuesday)}</td>
          <td>{converterMaiusculas(data.message[0].juiceWednesday)}</td>
          <td>{converterMaiusculas(data.message[0].juiceThursday)}</td>
          <td>{converterMaiusculas(data.message[0].juiceFriday)}</td>
        </tr>
        <tr className="tableTD">
          <th ><img src="./icons-cardapio/watermelon.svg" className="mx-5" width="30" height="30" title="Sobremesa" alt="Sobremesa"></img></th>
          <td>{converterMaiusculas(data.message[0].dessertMonday)}</td>
          <td>{converterMaiusculas(data.message[0].dessertTuesday)}</td>
          <td>{converterMaiusculas(data.message[0].dessertWednesday)}</td>
          <td>{converterMaiusculas(data.message[0].dessertThursday)}</td>
          <td>{converterMaiusculas(data.message[0].dessertFriday)}</td>
        </tr>

      </tbody>
    );
    setSpinner(true);
  }

  function atualizarUnidade() {
    const LOCAL = document.getElementById(`UnidadeCardapio`).value;
    loadDadosCardapio(LOCAL);
  }


  function converterMaiusculas(valores) {
    var mySentence = valores;
    var words = mySentence.split(" ");

    //Preposições que devem ser ignoradas
    var prepos = ["da", "do", "das", "dos", "a", "e", "de", "de"];

    const palavra = words.map((word) => {

      for (var i = 0; i <= prepos.length; i++) {
        if (word == prepos[i]) {
          return word
        }
      }

      return word[0].toUpperCase() + word.substring(1);


    }).join(" ");

    return palavra;
  }

  return (
    <>
      <Sidebars />
      <Navbar />
      <div id="conteudoRamais" className="centralizar-conteudo">
        <div className="exampleDivider"></div>

        <div className="col-lg-10 mx-auto p-3 py-md-5">


          <div id="internaCabecalho" className="input-group ">
            <img src="./icons-cardapio/spoon-and-fork.svg" className="bi " width="50" height="50" title="cardapio" alt="cardapio"></img>
            <h1 className="ms-2"> <a href="/cardapio" style={{ textDecoration: "none", color: "#343a40" }}>Cárdapio da Semana </a> </h1>
          </div>

          <hr className="col-3 col-md-5 mb-3" />


          <div id="tableID">

            <div className="container input-group ">


              <div className="col-md-4 p-3" >
                <label for="state" className="form-label">Unidade:</label>
                <select className="form-select" id="UnidadeCardapio" onChange={() => atualizarUnidade()}>
                  <option value="">Selecione ...</option>
                  <option value={"linhares"}>Linhares</option>
                  <option value={"teixeira de freitas"}>Teixeira de Freitas</option>
                  <option value={"viana"}>Viana</option>
                  <option value={"vitoria da conquista"}>Vitoria da Conquista</option>
                </select>

              </div>
            </div>

            {spinner ? <table className="table table-hover border table-bordered">
              <thead>
                <tr className="text-uppercase">
                  <th className="text-uppercase"></th>
                  <th scope="col" >Seg.</th>
                  <th scope="col">Terç.</th>
                  <th scope="col">Qua.</th>
                  <th scope="col">Qui.</th>
                  <th scope="col">Sex.</th>
                </tr>
              </thead>
              {cardapio}
            </table>
              : <Spinner />}
          </div>

        </div>
        <div className="exampleDivider"></div>
      </div>
      <Footer />
    </>
  );
}



export default Cardapio;