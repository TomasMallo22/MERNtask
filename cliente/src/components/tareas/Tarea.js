import React, { Fragment, useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Tarea = ({tarea}) => {

    //obtener el state del proyecto para poder reutilizarlo
    const proyectosContext = useContext(proyectoContext)
    const { proyectoseleccionado } = proyectosContext

    //obtener el state de la tarea para poder reutilizarlo
    const tareasContext = useContext(tareaContext)
    const { eliminarTarea, obtenerTareas, guardarTareaActual, actualizarTarea } = tareasContext

    const tareaEliminar = id => {
        eliminarTarea(id)
        obtenerTareas(proyectoseleccionado.id)
    }

    //seleccionar la tarea actual
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }

    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        actualizarTarea(tarea)
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario "
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                
                <button
                    type="button"
                    className="btn btn-primario "
                    onClick={() => tareaEliminar(tarea.id)}
                >Eliminar</button>

            </div>
        </li>
     );
}
 
export default Tarea;