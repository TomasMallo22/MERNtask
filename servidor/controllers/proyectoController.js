const Proyecto = require('../models/Proyecto')

const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) => {
     
    //revisar si hay errores  
     const errores = validationResult(req)

     if(!errores.isEmpty()) {
         return res.status(400).json({errores: errores.array()})
     }

     //la logica para crear un proyecto

     try {
         
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body)
        //guardar el creador via JWT
        proyecto.creador = req.usuario.id
        //guardar el proyecto propiamente dicho
        proyecto.save()

        res.json(proyecto)
        //por ultimo vamos a devolver el proyecto guardado
        

     } catch (error) {
         console.log(error)
         res.status(500).send('Hubo un error')
     }

}

    // obtener proyectos
    exports.obtenerProyectos = async (req, res) => {
        try {
            const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1})
            res.json({proyectos})
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error')
        }
}

//actualizar proyecto

exports.actualizarProyectos = async (req, res) => {
    const errores = validationResult(req)

     if(!errores.isEmpty()) {
         return res.status(400).json({errores: errores.array()})
     }

     //extraer la informacion del proyecto desde body
     const { nombre } = req.body
     const nuevoProyecto = {}

     if(nombre){
         nuevoProyecto.nombre = nombre
     }

     try {
         //revisar el id
         let proyecto = await Proyecto.findById(req.params.id)

         //si el proyecto no existe
         if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'})
         }

         // validar si el creador es creador del proyecto 
         if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No estás autorizado'})
         }

         //actualizar en la base de datos
         proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true})

         res.json({proyecto})
     } catch (error) {
         console.log(error)
         res.status(500).send('Hubo un error')
     }
}

//eliminar proyecto de manera física
exports.eliminarProyectos = async (req, res) => {
    
     try {
         //revisar el id
         let proyecto = await Proyecto.findById(req.params.id)

         //si el proyecto no existe
         if(!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'})
         }

         // validar si el creador es creador del proyecto 
         if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No estás autorizado'})
         }

         //eliminar en la base de datos
         await Proyecto.findOneAndRemove({_id: req.params.id})

         res.json({msg:'Proyecto eliminado'})
     } catch (error) {
         console.log(error)
         res.status(500).send('Hubo un error')
     }
}