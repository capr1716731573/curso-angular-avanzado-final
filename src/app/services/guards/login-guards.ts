//Los Guards son servicios que me permiten validar quien entra o no a una ruta 
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuards implements CanActivate {
  constructor( public _usuarioService: UsuarioService,
               public router: Router){

  }

  canActivate()  {
    if(this._usuarioService.estaLogueado()){
      console.log('PASO EL GUARD');
      return true;
    }else{
      console.log('NO PASO EL GUARD');
      this.router.navigate(['/login']);
      return false;
    }

    
  }
}
