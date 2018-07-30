import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../modelos/hospital.model';
import { HospitalService } from '../../services/services.index';
import { ModalUploadService } from '../../componentes-reutilizables/modal-upload/modal-upload.service';

//esta variable ya no me da error para que me impida la compoilacion
declare var swal: any;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  //variables 
  listaHospitales:Hospital[]=[];
  desde:number=0;
  totalRegistros:number=0;
  cargando:boolean=true;

  constructor( public _hospitalService:HospitalService,
               public _modalUploadImageService:ModalUploadService ) { }

  ngOnInit() {
    this.cargaHospitales();
    //actualiza cambios de imagen despues de utilziar el modal
    this._modalUploadImageService.notificacion
        .subscribe( resp => this.cargaHospitales());
  } 

  cargaHospitales(){
    this._hospitalService.cargarHospitales(this.desde)
    .subscribe( (resp:any) => {
      //console.log(resp.hospitales);
      this.listaHospitales=resp.hospitales;
      this.totalRegistros=resp.total_registros;
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
    this.cargaHospitales();
  }

  //cambia la imagen del hospital
  mostrarModal(id:string){
    this._modalUploadImageService.mostrarModal('hospitales',id);
  }

  buscarHospital(termino:string){
    this.listaHospitales=[];
    if(termino.length <= 0){
      this.cargaHospitales();
      return;
    }
    this.cargando=true;
    this._hospitalService.buscarHospital(termino)
        .subscribe( (hospitales:Hospital[]) => {
          this.listaHospitales=hospitales;
          this.cargando=false;
        })
  }

  borrarHospital(hospital:Hospital){
    swal({
      title: "Esta seguro ?",
      text: "Esta a punto de borrar a "+hospital.nombre,
      icon: "warning",
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
    .then((borrar)=>{
      this._hospitalService.borrarHospital(hospital._id)
          .subscribe(borrado => {
            console.log(borrado);
            this.desde=0;
            this.cargando=true;
            this.cargaHospitales();
          })
    });

   
  }

  crearHospital(){
      swal({
        title:'Crear Hospital',
        text:'Ingrese el nombre del Hospital',
        content:'input',
        icon:'info',
        buttons:['Cancelar', 'Aceptar'],
        dangerMode:true
      })
      .then( (valor: string) =>{
        if( !valor || valor.length === 0){
          return;
        }

        this._hospitalService.crearHospital(valor)
            .subscribe( () => this.cargaHospitales());
      });
  }

  actualizarHospital(hospital:Hospital){
    swal({
      title:'Actualizar Hospital',
      text:'Ingrese el nuevo nombre para el '+hospital.nombre,
      content:'input',
      icon:'info',
      buttons:['Cancelar', 'Aceptar'],
      dangerMode:true
    })
    .then( (valor: string) =>{
      if( !valor || valor.length === 0){
        return;
      }
      hospital.nombre=valor;

      this._hospitalService.actualizarHospital(hospital)
          .subscribe( () => this.cargaHospitales());
    });
}
}
