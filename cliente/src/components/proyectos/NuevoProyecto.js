import React, { Fragment, useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext)
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext

    //se crea state local para el formulario del proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    })
    
    //extraer nombre de proyecto
    const { nombre } = proyecto

    //leer contenido del input nombre
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        }) 
    }

    //cuando el usuario envia un proyecto (submit)
    const onSubmitProyecto = e => {
        e.preventDefault()

        //validar el formulario
        if(nombre === ''){
            mostrarError()
            return;
        }
        //agregar al state global el proyecto
        agregarProyecto(proyecto)
        //reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    const onClickFormulario = () => {
        mostrarFormulario()
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo Proyecto</button>
            
            {formulario ? 
            (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn block"
                        value="Agregar proyecto"
                    />
                </form>
            ) : null }
            
            { errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null }   
        </Fragment>
     );
}
 
export default NuevoProyecto;