import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import PropType from 'prop-types';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    --webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useMoneda = (label, stateInicial, opciones) => {

    //State de nuestro custom hook
    const [ state, actualizarState ] = useState(stateInicial);

    //Nuestro select que mostrara las opciones a convertir las criptomonedas
    const Seleccionar = () => (
        <Fragment>
            <Label>{label}:</Label>
            <Select
                onChange= { e => actualizarState(e.target.value) }
                value={state}
            >
                <option value="">- Seleccione -</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    );

    //Retornar state, interfaz y funcion modificada del state
    return [ state, Seleccionar, actualizarState ];

}

useMoneda.propType = {
    label: PropType.string.isRequired,
    stateInicial: PropType.string.isRequired,
    opciones: PropType.object.isRequired,
}
export default useMoneda;