import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario:Usuario;
  imagenSubir:File;
  imagenTemp:string;
  
  constructor( public _usuarioService: UsuarioService) { 
    this.usuario=this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario:Usuario){
    this.usuario.nombre=usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email=usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
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

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
  }

}
