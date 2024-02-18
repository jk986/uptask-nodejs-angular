import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';
import { AlertaComponent } from '../../shared/alerta/alerta.component';
import { setAlerta } from '../../helpers/setState';
@Component({
  selector: 'app-nuevo-pass',
  standalone: true,
  imports: [AlertaComponent,FormsModule,RouterModule],
  templateUrl: './nuevo-pass.component.html',
  styleUrl: './nuevo-pass.component.css'
})
export default class NuevoPassComponent implements OnInit{
  ///
  public token!:string|null;
  public alerta:any;
  public showForm:boolean;
  public pass:string;
  public showLink!:boolean;
  ///
  constructor(
    private _activatedRoute:ActivatedRoute,
    private _userService:UsuarioService){
      this.showForm = false;
      this.alerta = {};
      this.pass = "";
    }
  ///
  ngOnInit(): void {
    // Validar Token 
    this.token = this._activatedRoute.snapshot.paramMap.get('token');
    let resp = this._userService.comprobarToken(this.token);
    resp.then((data)=>{
      this.alerta = data;
      this.showForm = this.alerta.error;
      console.log(this.alerta);
    });
  };

  onSubmit(){
    if(this.pass.length<6){
      this.alerta = setAlerta("El password debe tener mínimo 6 caracteres",true);
      return;
    };
    let resp = this._userService.cambiarPassword(this.token,this.pass);
    resp.then((data)=>{
      this.alerta = data;
      if(!this.alerta.error) this.showLink = true;
    });
  }


}
