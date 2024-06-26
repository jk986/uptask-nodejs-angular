import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
} from "../controllers/tareaController.js";
import checkAuth from "../middleware/chekAuth.js";

import express from "express";

const router = express.Router();

router.post('/',checkAuth ,agregarTarea);
router
    .route("/:id")
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea)
;
router.post("/estado/:id",checkAuth,cambiarEstado);

export default router;