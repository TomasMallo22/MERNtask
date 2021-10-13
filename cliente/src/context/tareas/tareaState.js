import React, { useReducer } from 'react'
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA
} from '../../types'
import TareaContext from './tareaContext'
import tareaReducer from './tareaReducer'

const TareaState = props => {
    const initialState = {
        tareas: [
            {id: 1 ,nombre:'Crear tablas', estado: false, proyectoId: 1},
            {id: 2 ,nombre:'Insertar datos', estado: false, proyectoId: 2},
            {id: 3 ,nombre:'Crear relaciones', estado: false, proyectoId: 3},
            {id: 4 ,nombre:'Organizar proyecto', estado: false, proyectoId: 4},
            {id: 5 ,nombre:'Agregar botones', estado: true, proyectoId: 3},
            {id: 6 ,nombre:'Diseño web responsive', estado: true, proyectoId: 2},
            {id: 7 ,nombre:'Agregar medio pago', estado: false, proyectoId: 1},
            {id: 8 ,nombre:'Boton pagar', estado: false, proyectoId: 2}
        ],
        tareasproyecto: null,
        errortarea: false
    }

    //crear dispatch y state 
    const [state, dispatch] = useReducer(tareaReducer, initialState)

    // obtener las tareas de un proyecto 
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    //agregar tareas
    const agregarTarea = tarea => {
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    } 

    //validar tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                obtenerTareas,
                agregarTarea,
                validarTarea,
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState