import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Cotazacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import imagen from './cryptomonedas.png';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media ( min-width: 992px ){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;

`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  //Crear el state
  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ resultado, guardarResultado ] = useState('');
  const [ cargando, guardarCargando ] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async() => {

      //Evitamos que se ejecute la primera vez
      if (moneda === '') return;

      //Consultar la API para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //Mostrar el Spinner
      guardarCargando(true);
    
      
      //Ocultar el Spinner y mostrar resultado
      setTimeout(() => {
        
        //Cambiar el estado de cargando
        guardarCargando(false);

        //Guardar Cotizacion
        //Se tiene que agregar los dos corchetes ya que la API cambia el nombre de las llaves de cada peticion
        //para resolver esto agregamos los datos a consultar como moneda y criptomoneda para acceder al resultado de manera dinamica
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

      }, 3000);

    } 

    cotizarCriptomoneda();

  }, [moneda, criptomoneda])

  //Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotazacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
          <Imagen 
            src={imagen}
            alt='Imagen criptomonedas'
          />
      </div>

      <div>
        <Heading>
          Cotiza Criptomonedas la Instante
        </Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        
        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
