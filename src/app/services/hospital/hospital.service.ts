import { Injectable } from '@angular/core';
import { Hospital } from '../../modelos/hospital.model';
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from '../../configuracion_parametros/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital:Hospital;
  

  constructor( public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService:UsuarioService) { } 

  cargarHospitales(desde:number=0){
    let url= URL_SERVICIOS+'/hospital?desde='+desde;
    return this.http.get(url);
  }

  obtenerHospital(	id:	string	){
    let url= URL_SERVICIOS+'/hospital/'+id;
    return this.http.get(url);
  }

  borrarHospital(	id:	string	){
    let url= URL_SERVICIOS+'/hospital/'+id;
    url+= '?token='+this._usuarioService.token;

    return this.http.delete(url)
               .map( resp => {
                 swal('Hospital Borrado','El Hospital ha sido borrado correctamente...')
                 return true;
               })
  }

  crearHospital(	nombre:	string	){
    nombre=nombre.toUpperCase();
    let hospital={
      nombre:nombre
    }
    let url=URL_SERVICIOS+'/hospital?token='+this._usuarioService.token;
    return this.http.post(url,hospital)
               .map((resp:any)=>{
                 swal('Hospital Creado', nombre,'success');
                 return resp.hospital
               });
  }

  buscarHospital(	termino:	string	){
    let url= URL_SERVICIOS+'/busqueda/coleccion/hospitales/'+termino;
    return this.http.get(url)
               .map((resp:any)=> resp.hospitales);
  }

  actualizarHospital(	hospital:	Hospital	){
    hospital.nombre=hospital.nombre.toUpperCase();
    let url=URL_SERVICIOS+'/hospital/'+hospital._id;
    url+='?token='+this._usuarioService.token;
    return this.http.put(url, hospital)
               .map((resp:any)=>{
                swal('Hospital Actualizado: '+hospital.nombre,"Listo");
                return true;
               });
  }
}
