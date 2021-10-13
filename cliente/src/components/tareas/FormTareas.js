import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {v4 as uuid} from 'uuid'

const FormTareas = () => {

    //obtener el state del proyecto para poder reutilizarlo
    const proyectosContext = useContext(proyectoContext)
    const { proyectoseleccionado } = proyectosContext
   
    //obtener el state de la tarea para poder reutilizarlo
    const tareasContext = useContext(tareaContext)
    const { agregarTarea, obtenerTareas, errortarea, validarTarea } = tareasContext


    //state para form de tarea
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    //extraer el nombre del state tarea
    const {nombre} = tarea

    if(!proyectoseleccionado) return null

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    //agregar una nueva tarea
    const onSubmit = e => {
        e.preventDefault()

        //validar el state o el form
        if(nombre.trim() === ''){
            validarTarea()
            return 
        }

        //agregar tarae nueva
        tarea.id = uuid()
        tarea.proyectoId = proyectoseleccionado.id
        tarea.estado = false


        agregarTarea(tarea)
        
        //obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoseleccionado.id)

        //reinicar el formulario
        guardarTarea({
            nombre: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                    
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea"

                    />

                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
        </div>
     );
}
 
export default FormTareas;
