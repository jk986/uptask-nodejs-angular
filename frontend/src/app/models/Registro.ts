export class Registro{
    nombre:string;
    email:string;
    pass:string;
    repeatPass!:string;
    constructor(_nombre:string,_email:string,_pass:string){
        this.nombre = _nombre;
        this.email = _email;
        this.pass = _pass;
    }

}