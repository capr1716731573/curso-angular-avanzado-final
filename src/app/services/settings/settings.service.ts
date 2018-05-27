import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: ajustes={
    temaURl:'assets/css/colors/default.css',
    tema:'default'
  }

  constructor( @Inject(DOCUMENT) private _document ) {
    //cargamos ajustes del local storage o por defecto
    //para que funcione en toda la app, tengo que declarar en el app.component.ts
    this.cargarAjustes();
   }

  //guardar ajustes en el localstorage
  guardarAjustes(){
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
  }

  //cargar austes
  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes=JSON.parse(localStorage.getItem('ajustes'));
      console.log('Cargando Ajustes del localstorage');
      this.aplicarTema(this.ajustes.tema);
    }else{
      console.log('Usando Valores de Ajustes por defecto');
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema( tema: string ){
    let url_temas=`assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema_global_desde_index').setAttribute('href', url_temas);

    //seteamos en el servicio las variables del tema
    this.ajustes.tema=tema;
    this.ajustes.temaURl;url_temas;

    //guardamos el tema en el localstorage
    this.guardarAjustes();
   
  }

}

interface ajustes{
  temaURl: string;
  tema:string;
}
