import React, {Fragment, useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import {CSSTransition, TransitionGroup} from 'react-transition-group'


import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {
    
    const proyectosContext = useContext(proyectoContext)
    const { proyectos, obtenerProyectos } = proyectosContext

    useEffect(() => {
        obtenerProyectos()
    }, [])

    // if(proyectos.length === 0) return <p>No hay proyectos, comenza creando uno nuevo</p>

    return ( 
    <Fragment>
        
        {proyectos.length === 0 
        
        ? <p className="mensaje error">No hay proyectos, comenza creando uno nuevo</p>
        :
        
                <ul className="listado-proyectos">
                    <TransitionGroup>  
                        {proyectos.map(proyecto =>(
                            <CSSTransition
                                key={proyecto.id}
                                timeout={500}
                                classNames="proyecto"
                            >
                                <Proyecto
                                    proyecto={proyecto}
                                />
                            </CSSTransition>  
                        ))}
                    </TransitionGroup>
                </ul>
        
        }
    </Fragment> 
     );
}
 
export default ListadoProyectos;