import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {
  //
  @Input() alerta:any={};

  //
  constructor(){
    this.alerta = {msg:"",error:true}
  }

  
}
