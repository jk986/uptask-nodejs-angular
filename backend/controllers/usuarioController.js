import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailResgistro,emailOlvidePassw } from "../helpers/email.js";

/**
 * Funcion que registra a un usuario nuevo
*/
const registrar = async (req,res)=>{
    // evitar registros duplicados
    const { email,pass } = req.body; // extraer email
    const existeUsuario = await Usuario.findOne({email}); // --> || {email:email} encontrar el primero que coincida con el email
    try {
        if(existeUsuario){
            const error =  new Error('El Usuario Ya Esta Registrado');
            return res.status(400).json({msg:error.message});
        }else{

            const usuario = new Usuario(req.body); // crear un nuevo objeto de tipo usuario usando el modelo
            usuario.token = generarId();
            const usuarioAlmacenado = await usuario.save(); //para almacenar el objeto en la base de datos
            //res.json({usuarioAlmacenado});
            // Enviar el email de confirmación
            emailResgistro({
                email:usuario.email,
                nombre:usuario.nombre,
                token: usuario.token
            });
            res.json({msg:"Usuario Creado Correctamente, Revisa tu Email para Confirmar tu cuenta"});
            //console.log(usuarioAlmacenado);
        }
    } catch (error) {
        const erro = new Error("Faltan Datos")
        return res.status(404).json({msg:erro.message});
        console.log(error);
    }
};

/*
 * Funcion que autentica un usuario
*/
const autenticar = async (req,res)=>{
    const {email,pass} = req.body;
    // comprobar si el usuario existe
    const usuario = await Usuario.findOne({email}); // instancia del model Usuario
    if(!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg:error.message});
    }
    // comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({msg:error.message});
    }
    // coprobar su password
    if(await usuario.comprobarPass(pass)){
        // usuario encontrado
        return res.json({
            _id:usuario._id,
            nombre:usuario.nombre,
            email:usuario.email,
            token:generarJWT(usuario._id),
        });
    }else{
        const error = new Error("El password es incorrecto");
        return res.status(403).json({msg:error.message});
    }
};

/**
 * Funcion para confirmar usuario por medio de 
 * un token 
 */

const confirmar = async (req,res) =>{
    const {token} = req.params;
    // identificar al usuario
    
    /* if(!usuarioConfirmar){
        const error = new Error("Token no válido");
        return res.status(403).json({msg:error.message});
    }; */
    
    try {
        const usuarioConfirmar = await Usuario.findOne({token});
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({msg:"Usuario Confirmado Correctamente"});

    } catch (error) {
        const errors = new Error("Token no válido");
        return res.status(403).json({msg:errors.message});
        //console.log(errors.message);
    };
}

/**
 * Funcion que genera un nuevo token al solicitar 
 * un cambio de contraseña.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const olvidePass = async (req,res) => {
    const { email } = req.body; // recupero email del formulario
    // identifiar al usuario
    const usuarioACambiarPass = await Usuario.findOne({email});
        // si el usuario seleccionado no existe:
    if(!usuarioACambiarPass){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg:error.message});
    };
    try {
        usuarioACambiarPass.token = generarId();
        await usuarioACambiarPass.save();
        //  Enviar Email
        emailOlvidePassw({
            email:usuarioACambiarPass.email,
            nombre:usuarioACambiarPass.nombre,
            token:usuarioACambiarPass.token
        });
        res.json({msg:"Hemos enviado un email con las instrucciones"});
    } catch (error) {
        console.log(error);
    }
};

/**
 * Funcion para validar el token de cambio 
 * de contraseña.
 */
const comprobarToken = async (req,res) => {
    const {token} = req.params;
    const usuarioToken = await Usuario.findOne({token});
    if(usuarioToken){
        res.json({msg:"Usuario exitente && token válido"});
    } else {
        const error = new Error("Token no válido");
        res.status(404).json({msg:error.message});
    };
}

/**
 * Funcion para cambiar el password de 
 * un usuario
 */
const cambiarPass = async (req,res) => {
    const {token} = req.params;
    const { pass } = req.body;
    const usuario = await Usuario.findOne({token});
    if(usuario){
        try {
            usuario.pass = pass;
            usuario.token = '';
            await usuario.save();
            res.json({msg:"Password Modificado Correctamente"});    
        } catch (error) {
            console.log(error);
        }
    }else{
        const error = new Error("Token no válido");
        res.status(404).json({msg:error.message});
    }
}

/**
 * Funcion que devuelve un usuario 
 * existente
 */
const mostrarPerfil = async (req,res) =>{
    const { usuario } = req;
    res.json({usuario});
}

export {
    registrar,
    autenticar,
    confirmar,
    olvidePass,
    comprobarToken,
    cambiarPass,
    mostrarPerfil
};