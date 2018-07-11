import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../configuracion_parametros/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo:File, tipo:string, id:string){

    //creamos la promesa, que adentro utilizara AJAX
    return new Promise((resolve,reject)=>{
      //Aqui utilizamos Vanilla JS puro
      let formData=new FormData();
      let xhr= new XMLHttpRequest();

      formData.append('imagen_postman',archivo,archivo.name);
      //aqui ejecuto AJAX
      xhr.onreadystatechange=function (){
        if( xhr.readyState === 4){
          if( xhr.status == 200){
            console.log('Imagen Subida');
            resolve(JSON.parse(xhr.response));
          }else{
            console.log('Imagen Subida');
            reject(JSON.parse(xhr.response));
          }
        }
      };

      let url=URL_SERVICIOS+'/upload/'+tipo+'/'+id;

      xhr.open('PUT', url,true);
      xhr.send( formData);


    })

 

  }
}
