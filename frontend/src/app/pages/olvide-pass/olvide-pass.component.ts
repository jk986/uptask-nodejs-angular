import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { setAlerta } from '../../helpers/setState';
import { AlertaComponent } from '../../shared/alerta/alerta.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-olvide-pass',
  standalone: true,
  imports: [AlertaComponent,FormsModule,RouterModule],
  templateUrl: './olvide-pass.component.html',
  styleUrl: './olvide-pass.component.css'
})
export default class OlvidePassComponent {
  ///
  public userEmail:any;
  public alerta:any;
  ///
  constructor(private _usuarioService:UsuarioService){

  };
  ///
  onSubmit(){
    console.log(this.userEmail);
    if(this.userEmail===""){
      this.alerta = setAlerta("El email es olbigatorio",true);
      return;
    }
    let resp = this._usuarioService.olvidePass(this.userEmail);
    resp.then((data)=>{
      this.alerta = data;
    })
  }
}
