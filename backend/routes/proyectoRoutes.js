import express from "express";

import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agrearColaborador,
    eliminarColaborador,
} from "../controllers/proyectoController.js";

import checkAuth from "../middleware/chekAuth.js"; 

const router = express.Router();
// obtener y crear proyectos
router
    .route('/')
    .get(checkAuth,obtenerProyectos)
    .post(checkAuth,nuevoProyecto)
;
// Obtenr un proyecto, editar proyecto, eliminar proyecto completo
router
    .route('/:id')
    .get(checkAuth,obtenerProyecto)
    .put(checkAuth,editarProyecto)
    .delete(checkAuth,eliminarProyecto)
;
// Agregar colaborador
router.post("/agregar-colaborador/:id",checkAuth,agrearColaborador);
// Eliminar colaborador
router.post("/eliminar-colaborador/:id",checkAuth,eliminarColaborador);


export default router;