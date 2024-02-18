import { Component, OnInit } from '@angular/core';
import { UsuarioLoggService } from '@services/usuario-logg.service';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export default class ProyectosComponent implements OnInit{
  ///
  public token:any = "";
  public user:any;
  ///
  constructor(private _usuarioLogService:UsuarioLoggService){}

  ///
  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this._usuarioLogService.obtenerPerfil(this.token).
      then(()=> this.user = JSON.stringify(this._usuarioLogService.user())).
      then(()=>console.log(this.user));
  }

  onClick(): void{
    console.log("update...");
    this._usuarioLogService.updateSignal();
    console.log(JSON.stringify(this._usuarioLogService.user()));
  }

}
