import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo:string;
  public id:string;
  public ocultar:string='oculto';

  public notificacion=new EventEmitter<boolean>();

  constructor() { 
    console.log('Modal Upload Listo!!');
  }

  ocultarModal(){
    this.ocultar='oculto';
    this.tipo=null;
    this.id=null;
  }

  mostrarModal(tipo:string, id:string){
    this.ocultar='';
    this.id=id;
    this.tipo=tipo;
  }
}
