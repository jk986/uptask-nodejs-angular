import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Registro } from '../../models/Registro';
import { AlertaComponent } from '../../shared/alerta/alerta.component';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [RouterModule, FormsModule, AlertaComponent],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export default class RegistrarComponent{  
  //
  public modelRegistro:Registro;
  public alerta:any;
  //
  constructor(
    private _usuarioService:UsuarioService
  ){
    this.modelRegistro = new Registro("","","");
    this.alerta = {msg:'',error:true};
  }
  //
  onSubmit(){
    const {nombre, email, pass, repeatPass } = this.modelRegistro;
    if([nombre,email,pass,repeatPass].includes('')){
      this.setAlerta("Todos los campos son obligatorios");
      return;
    }else if(pass !== repeatPass){
      this.setAlerta("Los passwords deben coincidir");
      return;
    }else if(pass.length < 6){
      this.setAlerta("El password es muy corto, el mínimo son seis caracteres");
      return;
    }
    // eliminar alertas
    this.setAlerta("");
    // creando el usuario en la API
    let nuevoUsuario = new Registro(nombre,email,pass);
    this._usuarioService.crearUsuario(nuevoUsuario).then(data=>{
      this.setAlerta(data.msg,data.error);
    });
    
  }

  /**
   * Funcion para mostar una alerta 
   * @param mensage mensage que se mostrara al usuario
   * @param tipoMensaje admite cualquier cadena para no mostrar como error
   */
  setAlerta(mensage:string,isError:boolean=true):void{
    let data = { msg:mensage, error:isError };
    if(isError===true){
      this.alerta.msg = data.msg;
    }else{
      this.alerta = data;
    }
  }
}
