import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js"

/**
 * Funcion para agregar una nueva tarea a un proyecto
 */
const agregarTarea = async (req,res) => {
    console.log(req.body);
    const {proyecto} = req.body;
    // verificar existencia proyecto
    try {
        const existeProyecto = await Proyecto.findById(proyecto);
        if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error("No tienes los permisos para añadir tareas");
            return res.status(403).json({msg:error.message});
        };
        
        // crear tarea
        const tareaAlmacenada = await Tarea.create(req.body);
        return res.json(tareaAlmacenada);

    } catch (error) {
        return res.status(404).json({msg:"No existe el proyecto"});
    }

};

/**
 * Funcion para obtener una tarea
 */

const obtenerTarea = async (req,res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");
    console.log(tarea);
    // validar si el usuario pertenece al proyecto y asi mostrarle la tarea
    try{
        if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error("Acción no válida, no tienes permisos");
            return res.status(403).json({msg:error.message});
        };
        return res.json(tarea);
    }catch(err){
        return res.status(404).json({msg:"Tarea no econtrada"});
    };
    
};

/*
 * Funcion para actualizar una tarea  
 */
const actualizarTarea = async (req,res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");
    console.log(tarea);
    // validar si el usuario pertenece al proyecto y asi mostrarle la tarea
    try{
        if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error("Acción no válida, no tienes permisos");
            return res.status(403).json({msg:error.message});
        };
        // Actualizar valores
        tarea.nombre = req.body.nombre || tarea.nombre;
        tarea.descripcion = req.body.descripcion || tarea.descripcion;
        tarea.prioridad = req.body.prioridad || tarea.prioridad;
        tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada);
    }catch(err){
        return res.status(404).json({msg:"Tarea no econtrada"});
    }
};

/*
 * Funcion para eliminar una tarea
*/
const eliminarTarea = async (req,res) => {
    const { id } = req.params;
    // buscar tarea
    const tareaBorrar = await Tarea.findById(id).populate("proyecto");
    try{
        if(tareaBorrar.proyecto.creador.toString() !== req.usuario._id.toString()){
            const error = new Error("Acción no válida, no tienes permisos");
            return res.status(403).json({msg:error.message});
        };
        await tareaBorrar.deleteOne();
        res.status(200).json({msg:"Tarea eliminada"})
    }catch(err){
        return res.status(404).json({msg:"Tarea no encontrada"});
    }
};

const cambiarEstado = async (req,res) => {};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
}

