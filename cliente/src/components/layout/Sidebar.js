import React from 'react'
import NuevoProyecto from '../proyectos/NuevoProyecto'
import ListadoProyectos from '../proyectos/ListadoProyectos'

const Sidebar = () => {
    return ( 
        <aside>
                <h1>MERN<span>Task</span></h1>

                {/*  Nuevo Proyecto */}
                <NuevoProyecto/>

                <div className="proyectos">
                    <h2>Tus Proyectos</h2>

                    {/* Listado de proyectos */}
                    <ListadoProyectos/>
                </div>
        </aside>
     );
}
 
export default Sidebar;