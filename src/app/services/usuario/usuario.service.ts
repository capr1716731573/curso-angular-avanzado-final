import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from '../../configuracion_parametros/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu:any[]=[];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarValoresStorage();
    console.log("Servicio Listo para utilizar~~");
   }

   //FUNCION PARA RENOVAR TOKEN
   renuevaToken(){
     let url= URL_SERVICIOS+'/login/renovartoken';
     url += '?token='+this.token;

     return this.http.get(url)
                .map((resp:any)=>{
                  this.token=resp.token;
                  localStorage.setItem('token',this.token);
                  console.log('TOKEN RENOVADO');
                  return true;
                })
                .catch( err =>{
                  this.router.navigate(['/login']);
                  swal('No se puedo renovar token','No fue posible renovar token','error');
                  return Observable.throw(err);
                });
   }

   estaLogueado(){
     console.log(this.token);
     return( this.token.length > 5) ? true: false;
   }

   cargarValoresStorage(){
     if( localStorage.getItem('token')){
       this.token=localStorage.getItem('token');
       this.usuario=JSON.parse(localStorage.getItem('usuario'));
       this.menu=JSON.parse(localStorage.getItem('menu'));
       
     }else{
      this.token='';
      this.usuario=null;
      this.menu=[];
     }
   }

   /************************* */
   /*** LOGIN **********/
   login( usuario: Usuario, recordar:boolean=false ){

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else {
      localStorage.removeItem('email');
    }
    console.log(JSON.stringify(usuario));

    let url=URL_SERVICIOS+'/login/';
    return this.http.post(url, usuario)
                  .map( (resp:any) =>{
                    //Guardamos en el localstorage la informacion del API
                    this.guardarStorage(resp.id,resp.token,resp.usuario,resp.menu);
                    
                    return true;//confirma que se logueo y guardo los cambios en el localstorage
                  })
                  .catch( err =>{
                    console.log(err.error.mensaje);
                    swal('Error en el Login',err.error.mensaje,'error');
                    return Observable.throw(err);
                  });

   } 

   /************************* */
   /*** LOGIN GOOGLE **********/
   loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token_google:token } )//token_google se llama en el postman
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario,resp.menu );
                  return true;
                });


  }

  /************************* */
   /*** LOGIN GOOGLE **********/
   logout(){
    this.usuario=null;
    this.token='';
    this.menu=[];
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
   }



  guardarStorage( id: string, token: string, usuario: Usuario, menu:any ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );
    

    this.usuario = usuario;
    this.token = token;
    this.menu=menu;
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
    })
    .catch( err =>{
      swal('Error en el Login',err.error.errors.message,'error');
      return Observable.throw(err);
    });

   }

   /************************* */
   /*** ACTUALIZAR USUARIO **********/
   actualizarUsuario(usuario:Usuario){
    let url=URL_SERVICIOS+'/usuario/'+usuario._id;
    url+='?token='+this.token;
    return this.http.put(url,usuario)
    .map( (resp:any)=>{
      //Solo si es el mismo usuario deja realizar esta accion
      if(usuario._id===this.usuario._id){
        this.guardarStorage(resp.usuario._id,this.token,resp.usuario,this.menu);
      }      
      swal('Usuario Actualizado',usuario.nombre,"success");
      return true;
    })
    .catch( err =>{
      swal('Error en el Login',err.error.errors.message,'error');
      return Observable.throw(err);
    });
   }

   cambiarImagen(file:File, id:string){
    //Llamo al servicio SubirArchivo
    this._subirArchivoService.subirArchivo(file,'usuarios',id)
        .then( (resp:any) => {
          this.usuario.img=resp.usuario.img;
          swal('Imagen Actualizado',this.usuario.nombre,"success");
          this.guardarStorage(id,this.token,this.usuario,this.menu);
        })
        .catch( (resp:any) => {
          console.log('Error',resp.usuario);
          swal('Error al subir imagen',resp.mensaje,"error");
        })
   }

   /************************* */
   /*** CARGAR USUARIOS DE LA BASE DE DATOS **********/
   cargarUsuarios( desde:number=0){
    let url= URL_SERVICIOS+'/usuario?desde='+desde;
    return this.http.get(url);
   }

     /************************* */
   /*** CARGAR USUARIOS DE LA BASE DE DATOS **********/
   bsucarUsuarios( termino:string){
    let url= URL_SERVICIOS+'/busqueda/coleccion/usuarios/'+termino;
    //solo vamos a retornar un nodo de la respuesta, el nodo de usuarios
    return this.http.get(url)
               .map((resp:any)=>resp.usuarios);
   }

   borrarUsuario(id:string){
     let url=URL_SERVICIOS+'/usuario/'+id;
     url+='?token='+this.token;

     return this.http.delete(url)
                .map(resp => {
                  swal('Usuario Borrado','El usuario a sido eliminado correctamente');
                  return true;
                })
   }


}
