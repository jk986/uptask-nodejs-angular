import mongoose from "mongoose";

const proyectoSchemma = mongoose.Schema({
    nombre:{
        type: String,
        trim: true,
        required: true,
    },
    descripcion:{
        type: String,
        trim: true,
        required: true,
    },
    fechaEntrega:{
        type:Date,
        default: Date.now(),
    },
    cliente: {
        type: String,
        trim: true,
        required: true,

    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"usuario",
    },
    colaboradores:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"usuario",
        }
    ],
}, {timestamps:true} );

// convertir el esquema a modelo para poderlo trabajar
const Proyecto = mongoose.model("proyecto",proyectoSchemma);

export default Proyecto;