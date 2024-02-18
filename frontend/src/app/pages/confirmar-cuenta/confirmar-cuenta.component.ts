import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '@services/usuario.service';
import { AlertaComponent } from '../../shared/alerta/alerta.component';
@Component({
  selector: 'app-confirmar-cuenta',
  standalone: true,
  imports: [AlertaComponent,RouterModule],
  templateUrl: './confirmar-cuenta.component.html',
  styleUrl: './confirmar-cuenta.component.css'
})
export default class ConfirmarCuentaComponent implements OnInit{
  ///
  public params:any;
  public alerta:any;
  ///
  constructor(
    private _activatedRoute:ActivatedRoute,
    private _userService:UsuarioService
    ){
      this.alerta={msg:"",error:true}
    }

  ///
  ngOnInit(): void {
    this.params = this._activatedRoute.snapshot.paramMap.get('id');
    let resp = this._userService.confirmarCuenta(this.params);
    resp.then((data)=>{
      this.alerta = data;
    })
  }


}
