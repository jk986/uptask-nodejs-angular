import express from "express";
import { 
    registrar,
    autenticar,
    confirmar,
    olvidePass,
    comprobarToken,
    cambiarPass,
    mostrarPerfil
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/chekAuth.js";

// con esto puedo usar los metodos http
const router = express.Router();

/*
 * '/' -> indica que se usara la misma url que hay en index('/api/usuarios')
 * router.get('/',usuarios);
    router.post('/',crearUsuario);
*/

// Autenticacicón, Registro y Confirmacion de Usuarios

router.post('/',registrar); // Crea un nuevo usuario
router.post("/login",autenticar);
router.get("/confirmar/:token",confirmar); // confirmacion de la cuenta
router.post("/olvide-passw",olvidePass); // enviar un nuevo token para cambio de passw
// comprobar token de recuperacion y nuevo passw
router.route("/olvide-passw/:token").get(comprobarToken).post(cambiarPass);
router.get('/perfil',checkAuth,mostrarPerfil);
export default router;