import React from 'react'

const Barra = () => {
    return ( 
        <header className="app-header">
                    <p className="nombre-usuario">Hola Tomás</p>
                    <nav className="nav-principal">
                        <button
                            className="btn btn-blank cerrar-sesion"
                        >
                          Cerrar sesion</button>
                    </nav>
        </header>
     );
}
 
export default Barra;