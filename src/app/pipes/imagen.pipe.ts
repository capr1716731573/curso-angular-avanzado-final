import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../configuracion_parametros/config';

@Pipe({
  name: 'imagen_pipe'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string= 'usuario'): any {
    let url= URL_SERVICIOS+'/img';

    if (!img){
      return url + '/usuarios/xxx';
    }
    //para verificar cuando los usuarios son logueados con la cuenta de google
    if( img.indexOf('https') >= 0){
      return img;
    }

    switch(tipo){
      case 'usuario':
        url+='/usuarios/'+img;
      break;

      case 'hospital':
        url+='/hospitales/'+img;
      break;

      case 'medico':
        url+='/medicos/'+img;
      break;

      default:
        console.log('Tipo de Imagen no existe, usuario');
    }

     return url;
  }

}
