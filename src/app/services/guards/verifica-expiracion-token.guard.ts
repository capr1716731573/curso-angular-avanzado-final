import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaExpiracionTokenGuard implements CanActivate {

  constructor(
    public _usuarioService:UsuarioService,
    public router:Router
  ){}

  canActivate(): Promise<boolean> | boolean {
    let token=this._usuarioService.token;
    let payload=JSON.parse( atob(token.split('.')[1]));

    //verificar si ya espiro el token
    let expirado= this.expirado(payload.exp);

    if(expirado){ 
      this.router.navigate(['/login']);
      return false; 
    }//no permito al usuario navegar en el sistema

    return this.verificaSiEsNecesarioRenovarElToken(payload.exp);
  }

  verificaSiEsNecesarioRenovarElToken(fechaExp:number): Promise<boolean>{
    return new Promise((resolve, reject)=>{
      let tokenExp=new Date(fechaExp*1000);//fecha de expiracion del token
      let ahora = new Date();
      //esta variable es la ue dice que si falta dos horas para que expire el token 
      //mande una solicitud de renovacion
      let intervalo_hora= 2;//QUE ME VERIFIQUE FALTANDO (intervalo_hora) HORAS
      //a la variable ahora le sumo las dos horas o el valor de intervalo_hora
      ahora.setTime(ahora.getTime()+(intervalo_hora*60*60*1000));

      //comparo si en el tiempo de ahora mas el valor de intervalo_hora es mayor a la fecha expiracion
      //envio la funcion renovar token
      if(tokenExp.getTime() > ahora.getTime()){
        resolve(true);
      }else{
        this._usuarioService.renuevaToken()
            .subscribe(()=>{
              resolve(true);
            }, ()=>{
              this.router.navigate(['/login']);
              reject(false);
            })
      }
      


    });
  }

  expirado( fechaExp:number ){
    let ahora= new Date().getTime()/1000;
    //devuelve un true si el token expiro y false sino expiro
    if(fechaExp < ahora ){
      return true;
    }else{
      return false;
    }

  }
}
