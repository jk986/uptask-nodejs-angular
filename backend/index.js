import  express, { json }  from "express";
import dotenv from 'dotenv';
import cors from "cors"; // permitir coneiones desde el domini del front

import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"

// concentra la funcionalidad de express
const app = express();
app.use(express.json()); // para que procese informacion json correctamente


// Esto va a buscar por un archivo .env
dotenv.config()

// conectar a la base de datos
conectarDB();

// Configurar CORS
    // Dominios Permitidos
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin:function(origin,callback){
        // Comprobar en la lista blanca
        if(whiteList.includes(origin)){
            // Puede consultar la API
            callback(null,true);
        }else{
            // No esta permitido
            callback(new Error("Error de CORS"));
        };
    }
};
app.use(cors(corsOptions));

// Routing
/* app.get('/api/usuarios',(req,res)=>{
    res.send('Hola mundo') //send permite mostrar info en la pantalla
    res.json({msg:'ok'}) //  respuesta tipo json para acceder a datos
}) */
app.use('/api/usuarios',usuarioRoutes);
app.use("/api/proyectos",proyectoRoutes);
app.use("/api/tareas",tareaRoutes);

// puerto
const PORT = process.env.PORT || 4000; 

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});