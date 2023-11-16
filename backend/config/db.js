import mongoose from 'mogoose';

const conectarDB = async () => {
    try{
        const conection = await mongoose.connect('mongodb+srv://root:root@cluster0.mdy5jyq.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        let url = `${conection.conection.host}:${conection.conection.port}`;
        console.log(`MongoDb Conectado en: ${url}`)
    }catch(error){
        console.warn(`error: ${error}`);
        procces.exit(1); //para forzar a que el proceso termine
    }
}
export default conectarDB;