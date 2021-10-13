const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
    
    //revisar si hay errores  
    const errores = validationResult(req)

    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //extraer mail y el pass
    const {email, password} = req.body

    
    try{
        //revisar si el usuario existe en la base
        let usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.status(400).json({msg: 'Usuario y/o contraseña incorrecto'})
        }

        //revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password)
        if(!passCorrecto){
            return res.status(400).json({msg: 'Usuario y/o contraseña incorrecto'})
        }

        //crear y firmar el jwt
        const payload = {
            //que se guarda
            usuario : {
                id: usuario.id
            }
        }

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error

            res.json({token})
        })
    

    } catch(error){
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}