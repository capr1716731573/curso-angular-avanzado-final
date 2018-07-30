import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../configuracion_parametros/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../modelos/medico.model';



@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http:HttpClient,
              public _usuarioService:UsuarioService) { }

  totalRegistros:number=0;

  cargarMedicos(desde:number=0){
    let url=URL_SERVICIOS+'/medico?desde='+desde;
    return this.http.get(url)
        .map( (resp:any) => {
          this.totalRegistros=resp.total_registros;
          return resp;
        });
  }

  buscarMedico(termino:	string	){
    let url= URL_SERVICIOS+'/busqueda/coleccion/medicos/'+termino;
    return this.http.get(url)
               .map((resp:any)=> resp.medicos);
  }

  borrarMedico(	id:	string	){
    let url= URL_SERVICIOS+'/medico/'+id;
    url+= '?token='+this._usuarioService.token;

    return this.http.delete(url)
               .map( resp => {
                 swal('Medico Borrado','El Medico ha sido borrado correctamente...')
                 return true;
               })
  }

  crearMedico(	medico:Medico	){
    let url=URL_SERVICIOS+'/medico';
    //VALIDO SI EXISTE medico._id entonces estoy actualizando
    //caso contrario estoy creando un nuevo registro
    
    //actualizando registro
    if(medico._id){
      url+='/'+medico._id;
      url+='?token='+this._usuarioService.token;

      return this.http.put(url,medico)
                 .map((resp:any)=>{
                  swal('Medico Actualizado', medico.nombre,'success');
                  return resp.medico
                 });
    }
    //creando nuevo registro
    else{
      url+='?token='+this._usuarioService.token;
      return this.http.post(url,medico)
      .map((resp:any)=>{
        swal('Medico Creado', medico.nombre,'success');
        return resp.medico
      });

    }

      }

  cargarMedico(id:string){
    let url=URL_SERVICIOS+'/medico/'+id;
    return this.http.get(url)
               .map((resp:any)=>resp.medico);
  }
}
