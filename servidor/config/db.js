const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'})

const conectarDB = async () => {
    
    try {
        //son las operaciones que van a estar siendo evaluadas
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Base de datos conectada')
        
    }catch (error) {
        //la ejecución de operaciones si el bloque try falla
        console.log('Ocurrió un error')
        console.log(error)
        process.exit(1)
    }
}

module.exports = conectarDB;