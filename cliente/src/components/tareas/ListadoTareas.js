import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoTareas = () => {
    
    //obtener el state del proyecto para poder reutilizarlo
    const proyectosContext = useContext(proyectoContext)
    const { proyectoseleccionado, eliminarProyecto } = proyectosContext
   
    //obtener el state de la tarea para poder reutilizarlo
    const tareasContext = useContext(tareaContext)
    const { tareasproyecto } = tareasContext
    
    if(!proyectoseleccionado) return <h2>Selecciona un proyecto</h2>

    

    const onClickEliminar = () => {
        eliminarProyecto(proyectoseleccionado.id)
    }
    
    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoseleccionado.nombre} </h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ?  (<li className="tarea"><p>No hay tareas</p></li>)
                    : 
                    <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={500}
                                classNames="tarea"
                            >
                                <Tarea 
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }                
            </ul>

            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;