import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/services.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir:File;
  imagenTemp:string;
  ocultar:string='';
  constructor( public _subirArchivoService:SubirArchivoService,
               public _modalUploadService:ModalUploadService) { }

  ngOnInit() {
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir,
      this._modalUploadService.tipo,this._modalUploadService.id )
      .then( (resp:any) => {
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();

      })
      .catch( err => {
        console.log('Error en la carga...');
      })

  }

  cerrarModal(){
    this.imagenTemp=null;
    this.imagenSubir=null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImage(archivo:File){
    //Valido si existe el archivo
    if(!archivo){
      this.imagenSubir=null;
      return;
    }

    //Valido que el archivo subido sea de tipo imagen
    if( archivo.type.indexOf('image') < 0){
      swal('Solo subir imagenes', 'El archivo seleccionado no es una imagen','error');
      this.imagenSubir=null;
      return;
    }

    this.imagenSubir=archivo;

    //vamos a cagar la imagen seleccionada temporalmente antes de guardarla
    //osea como una previsualizacion
    let reader= new FileReader();
    let urlImageTemp=reader.readAsDataURL(archivo);
    reader.onloadend=() => this.imagenTemp=reader.result;
  }

}
