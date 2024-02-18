import { Injectable } from '@angular/core';
import { clienteAxios } from '../helpers/setState';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  ///
  public isError!:boolean;
 
  ///
  constructor() {
  }
  ///
  async crearUsuario(usuario:any):Promise<any>{
    try {
      // TODO: Mover hacia un cliente Axios
      const { data } = await clienteAxios.post("/usuarios",usuario);
      //console.log(data.msg);
      this.isError = false;
      
      return {msg:data.msg,error:this.isError};
    } catch (error) {
      let resp:any = error;
      this.isError = true;
      
      return {msg:resp.response.data.msg,error:this.isError};
    };
  };
  
  confirmarCuenta = async (id:string) => {
    try {
      const url = `/usuarios/confirmar/${id}`;
      const { data } = await clienteAxios(url);
      this.isError = false;
      return {msg:data.msg,error:this.isError};
    } catch (error) {
      let res:any = error;
      this.isError = true;
      return {msg:res.response.data.msg,error:this.isError};
    }
  };

  olvidePass = async (email:string) => {
    try {
      const url = `/usuarios/olvide-passw`;
      const { data } = await clienteAxios.post(url,{email});
      console.log(data.msg);
      this.isError=false;
      return {msg:data.msg,error:this.isError}
    } catch (error) {
      let err:any = error;
      this.isError=true;
      return {msg:err.response.data.msg,error:this.isError};      
    }
  };

  comprobarToken = async (token:any) => {
    const url = `/usuarios/olvide-passw/${token}`
    try {
      const { data } = await clienteAxios.get(url);
      this.isError=false;
      return{msg:data.msg,error:this.isError};
    } catch (error) {
      let err:any = error;
      this.isError=true;
      return {msg:err.response.data.msg,error:this.isError}
    }
  };

  cambiarPassword = async (token:any,pass:string) => {
    try {
      const url = `/usuarios/olvide-passw/${token}`
      const { data } = await clienteAxios.post(url,{pass});
      this.isError=false;
      return{msg:data.msg,error:this.isError};
    } catch (error) {
      let err:any = error;
      this.isError
      return {msg:err.response.data.msg,error:this.isError}

    }
  };

  autenticarUsusrio = async (email:string,pass:string) => {
    try {
      const url = `/usuarios/login`; // ap
      const { data } = await clienteAxios.post(url,{email,pass});
      localStorage.setItem('token',data.token);
      //console.log(data);
      return null;
    } catch (error) {
      // envira msgs de error
      let err:any = error;
      return err.response.data.msg;
    }
  };

}

