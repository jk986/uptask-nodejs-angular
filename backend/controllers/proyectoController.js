import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const obtenerProyectos = async (req,res) => {
    // traer todos los proyectos
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario._id);
    res.json(proyectos);
};

const nuevoProyecto = async (req,res) => {
    // instanciar proyecto
    const proyecto = new Proyecto(req.body);
    // establecer creador
    proyecto.creador = req.usuario._id;
    try {
        // almacenar en la BBDD
        const proyetoAlmacenado = await proyecto.save();
        res.json(proyetoAlmacenado);
    } catch (error) {
        console.log(error);
    }
    //console.log(req.body);
    //console.log(req.usuario);
};

const obtenerProyecto = async (req,res) => {
    // obneter id del proyecto
    const { id } = req.params;
    // buscar proj por ID
    const proyecto = await Proyecto.findById(id);
    // validaciones
    if(!proyecto){
        const error = new Error("No Encontrado");
        return res.status(404).json({msg:error.message});
    }else if(proyecto.creador.toString() !== req.usuario._id.toString()){
        // tiene que coincidir el creador con el usuario actual
        const error = new Error("Acción No Válida");
        return res.status(401).json({msg:error.message});
    } else {
        // Obtener tareas
        const tareas = await Tarea.find().where("proyecto").equals(proyecto._id);
        // asigno una copia de proyecto y una copia de tareas
        const respuesta = {...proyecto,...tareas};
        return res.json({proyecto,tareas});
    };

    
};

const editarProyecto = async (req,res) => {
    // obneter id del proyecto
    const { id } = req.params;
    // buscar proj por ID
    const proyecto = await Proyecto.findById(id);
    // validaciones
    if(!proyecto){
        const error = new Error("No Encontrado");
        res.status(404).json({msg:error.message});
    }else if(proyecto.creador.toString() !== req.usuario._id.toString()){
        // tiene que coincidir el creador con el usuario actual
        const error = new Error("Acción No Válida");
        res.status(401).json({msg:error.message});
    } else {
        proyecto.nombre = req.body.nombre || proyecto.nombre;
        proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
        proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
        proyecto.cliente = req.body.cliente || proyecto.cliente;
        try {
            const proyectoEditado = await proyecto.save();
            return res.json(proyectoEditado);
        } catch (error) {
            console.log(error);
        }
        
    };
};

const eliminarProyecto = async (req,res) => {
    // obneter id del proyecto
    const { id } = req.params;
    // buscar proj por ID
    const proyecto = await Proyecto.findById(id);
    // validaciones
    if(!proyecto){
        const error = new Error("No Encontrado");
        res.status(404).json({msg:error.message});
    }else if(proyecto.creador.toString() !== req.usuario._id.toString()){
        // tiene que coincidir el creador con el usuario actual
        const error = new Error("Acción No Válida");
        res.status(401).json({msg:error.message});
    } else {
        try {
            await proyecto.deleteOne();
            res.json({msg:"Proyecto Eliminado"});
        } catch (error) {
            console.log(error);
        }
    };
};

const agrearColaborador = async (req,res) => {

};

const eliminarColaborador = async (req,res) => {

};

/* const obtenerTareas = async (req,res) => {
    const { id } = req.params; // id del proyecto
    try {
        // tienes que ser creador o colaborador
        const existeProy = await Proyecto.findById(id);
        const tareas = await Tarea.find().where("proyecto").equals(id);
        return res.json(tareas);
    } catch (error) {
        return res.status(404).json({msg:"Proyecto no encontrado"});
    }
}; */

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agrearColaborador,
    eliminarColaborador,
};