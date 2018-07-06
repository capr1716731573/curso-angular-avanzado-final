import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from '../../configuracion_parametros/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarValoresStorage();
    console.log("Servicio Listo para utilizar~~");
   }

   estaLogueado(){
     return( this.token.length > 5)?true: false;
   }

   cargarValoresStorage(){
     if( localStorage.getItem('token')){
       this.token=localStorage.getItem('token');
       this.usuario=JSON.parse(localStorage.getItem('usuario'));
     }else{
      this.token='';
      this.usuario=null;
     }
   }

   /************************* */
   /*** LOGIN **********/
   login( usuario: Usuario, recordar:boolean ){

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }

    let url=URL_SERVICIOS+'/login';
    return this.http.post(url, usuario)
                  .map( (resp:any) =>{
                    //Guardamos en el localstorage la informacion del API
                    localStorage.setItem('id',resp.id);
                    localStorage.setItem('token',resp.token);
                    localStorage.setItem('usuario',JSON.stringify(resp.usuario));
                    return true;//confirma que se logueo y guardo los cambios en el localstorage
                  });

   } 

   /************************* */
   /*** LOGIN GOOGLE **********/
   loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token_google:token } )//token_google se llama en el postman
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario );
                  return true;
                });


  }

  /************************* */
   /*** LOGIN GOOGLE **********/
   logout(){
    this.usuario=null;
    this.token='';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
   }



  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

   /************************* */
   /*** CREAR USUARIO **********/
   crearUsuario( usuario:Usuario ){
    let url=URL_SERVICIOS+'/usuario';

    return this.http.post(url, usuario)
    //implemento la opcion map para manejar las respuestas
    //con map proceso la respuesta antes de enviarla al component
    .map( (resp:any)=>{
      swal('Usuario Creado',usuario.email,"success");
      return resp.usuario;
    });

   }
}