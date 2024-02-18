import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { AlertaComponent } from '../../shared/alerta/alerta.component';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioLoggService } from '@services/usuario-logg.service';

import { setAlerta } from '../../helpers/setState';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AlertaComponent,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit{
  ///
  public email:string;
  public pass:string;
  public alerta:any = {};
  ///
  constructor(
    private _usuarioService:UsuarioService,
    private _usuarioLogService:UsuarioLoggService,
    private _router:Router
    ){
    this.email = "";
    this.pass = "";
  }
  ///
  ngOnInit(): void {
    const router = this._router;
    const token = localStorage.getItem("token");
    // valida que exista un token
    if(token){
      router.navigate(["/proyectos"]);
    };

  };

  onSumbit(){
    // para agregar token a LS
    if([this.email,this.pass].includes("")){
      this.alerta = setAlerta("Todos los campos son obligatorios",true);
      return;
    }
    //console.log({email:this.email,pass:this.pass});
    this._usuarioService.autenticarUsusrio(this.email,this.pass).
      then((data)=>{
        // la data aqui son los mensajes que envia el servidor
        this.alerta = setAlerta(data,false);
        //console.log(data);
        //console.log(this.alerta);
      });
    
  }

}
