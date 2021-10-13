import React, { useReducer } from 'react'
import {v4 as uuid} from 'uuid'

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'

import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from '../../types'

const ProyectoState = props => {

   

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyectoseleccionado: null 
    }



    //dispatch para ejecutar las acciones que van a modificar mis state
    // se genera un destructuring de state y dispatch que son las dos funciones que vamos a usar de useReducer que pasando estos parametros ayuda a modificar el state
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //serie de funciones CRUD para proyectos 
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO,
        })
    }

    const obtenerProyectos = () => {
        const proyectos = [ 
            {id: 1, nombre: 'E-Commerce'},
            {id: 2, nombre: 'Diseño de sitio web'},
            {id: 3, nombre: 'Base de datos'},
            {id: 4, nombre: 'Web API'},
        ]

        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    const agregarProyecto = proyecto => {
        proyecto.id = uuid()
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        })
    }

    const mostrarError = () => {
        dispatch({
             type: VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }


    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
               formulario: state.formulario,
               errorformulario: state.errorformulario,
               proyectoseleccionado: state.proyectoseleccionado,
               mostrarFormulario,
               obtenerProyectos,
               agregarProyecto,
               mostrarError,
               proyectoActual,
               eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState