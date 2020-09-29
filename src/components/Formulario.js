import React, { useState , useEffect } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomonedas';
import Error from './Error';
import axios from 'axios';
import PropType from 'prop-types';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {

    //State del listado de criptomonedas
    const [ listacripto, guardarCriptomonedas ] = useState([]);

    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'},
        { codigo: 'NIC', nombre: 'Cordoba Nicaragüense'}
    ];

    // Utilizamos useMoneda como un state normal
    //El valor de la izquierda en este caso moneda es la opcion que selecciono el usuario en la pagina
    //El dato de la derecha en este caso SelectMoneda es la funicon que utilizaremos para llamar al hook como componente en el return
    const [ moneda, SelectMoneda ] = useMoneda('Elije tu moneda', '', MONEDAS);

    //Utilizamos useCriptomoneda
    //El valor de la izquierda en este caso  criptomoneda es la opcion que selecciono el usuario en la pagina
    //El dato de la derecha en este caso SelectCripto es la funicon que utilizaremos para llamar al hook como componente en el return
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elije tu Criptomoneda', '', listacripto);

    //Ejecutar llamado de la API
    useEffect(() => {
        const ConsultarAPI = async() => {
            const url ='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            
            //Consultando datos a la API con Axios
            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        ConsultarAPI();
    }, []);

    //Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //Validar si ambos campos estan llenos
        if ( moneda === '' || criptomoneda === '') {
            guardarError(true);
            return;
        }

        //Pasar los datos al componenten principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);


    }

    return (  

        <form
            onSubmit={cotizarMoneda}
        >
            { error ? <Error mensaje='Todos los campos son obligatorios' /> : null}

            <SelectMoneda />

            <SelectCripto />

            <Boton 
                type='submit'
                value='Calcular'
            />
        </form>
    );
}
Formulario.propType = {
    guardarMoneda: PropType.func.isRequired,
    guardarCriptomoneda: PropType.func.isRequired
}
export default Formulario;