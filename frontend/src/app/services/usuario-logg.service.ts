import { Injectable, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { clienteAxios } from '../helpers/setState';

interface State{
  user:any;
  loading:boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UsuarioLoggService {
  ///
   // señal computada de solo lectura
   private state:WritableSignal<any> = signal(undefined);
   public user:Signal<any> = computed( () => this.state());
  
  ///
  constructor() { 
    effect(() => {
      console.log(`La señal state ha cambiado ${this.state()}`);
    });
  }
  
  ///
  obtenerPerfil = async (token:string) => {
    const config = {
      headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    };

    try {
      const {data} = await clienteAxios("/usuarios/perfil",config);
      //console.log(data);
      //console.log(this.state());
      this.setSignal(data);
      return data;
    } catch (error) {
      console.log(`Error: ${error}`);
    };

  }

  setSignal(data:any){
    this.state.set(data);
  }

  updateSignal(){
    let data = {user:{name:"jose",email:"jos@email.com",token:"bcducbudb"}};
    this.state.set(data);
  }


}
