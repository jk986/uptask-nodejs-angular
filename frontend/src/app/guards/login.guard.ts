import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioLoggService } from '@services/usuario-logg.service';


export const loginGuard: CanActivateFn = () => {
  ///
  const usuarioService = inject(UsuarioLoggService);
  let user:any = null;
  
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  // valida que exista un token
  if(!token){
    router.navigate(["/auth/login"]);
    return false;
  };
  return true;
};