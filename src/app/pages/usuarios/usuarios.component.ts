import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../services/services.index';
import { ModalUploadService } from '../../componentes-reutilizables/modal-upload/modal-upload.service';

//esta variable ya no me da error para que me impida la compoilacion
//declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  listaUsuarios:Usuario[]=[];
  desde:number=0;
  totalRegistros:number=0;
  cargando:boolean=true;

  constructor(
    public _usuarioService:UsuarioService,
    public _modalUploadImageService: ModalUploadService
  ) { 

  }

  ngOnInit() {
    //carga los usuarios en la tabla
    this.cargarUsuarios();
    this._modalUploadImageService.notificacion
        .subscribe( resp => this.cargarUsuarios());
  }

  mostrarModal(id:string){
    this._modalUploadImageService.mostrarModal('usuarios',id);
  }

  cargarUsuarios(){
    
    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe( (resp:any) => {
          console.log(resp.usuarios);
          this.totalRegistros=resp.total_registros;
          this.listaUsuarios=resp.usuarios;
          this.cargando=false;
        });
  }

  //cada vez que se ejecuta esta funcion carga al web services
  cambiarDesde(valor:number){
    let desde= this.desde+valor;
    
    if(desde >= this.totalRegistros){
      return;
    }

    if(desde < 0){
      return;
    }

    this.desde+=valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino:string){
    this.listaUsuarios=[];
    if(termino.length <=0 ){
      this.cargarUsuarios();
      return;
    }
    this.cargando=true;
    this._usuarioService.bsucarUsuarios(termino)
        .subscribe((usuarios:Usuario[])=>{
          this.listaUsuarios=usuarios;
          this.cargando=false;
        })
  }

  borrarUsuario(usuario:Usuario){
    if(usuario._id === this._usuarioService.usuario._id){
      swal('No se puede borrar usuario','No se puede borrar a si mismo','error');
      return;
    }
    swal({
      title: "Esta seguro ?",
      text: "Esta a punto de borrar a "+usuario.nombre,
      icon: "warning",
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe(borrado => {
              console.log(borrado);
              this.desde=0;
              this.cargarUsuarios();
            })
      } 
    });
  }

  guardarUsuario( usuario:Usuario ){
    this._usuarioService.actualizarUsuario(usuario)
        .subscribe();
  }

}
