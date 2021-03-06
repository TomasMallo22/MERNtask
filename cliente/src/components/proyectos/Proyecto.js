import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const Proyecto = ({proyecto}) => {
    
    //obtener el state del proyecto para poder reutilizarlo
    const proyectosContext = useContext(proyectoContext)
    const { proyectoActual } = proyectosContext
    
    //obtener el state de tarea para poder reutilizarlo
    const tareasContext = useContext(tareaContext)
    const { obtenerTareas } = tareasContext

    const seleccionarProyecto = id => {
        proyectoActual(id) //selecciona el proyecto 
        obtenerTareas(id) //seleccionar tareas por proyecto
    }
    
    return ( 
        <li>
            <button 
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto.id)}
            >{proyecto.nombre}</button>    
        </li>
     );
}
 
export default Proyecto;