import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../modelos/hospital.model';
import { MedicoService, HospitalService } from '../../services/services.index';
import { Medico } from '../../modelos/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../componentes-reutilizables/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  listaHospitales:Hospital[]=[];
  medico:Medico=new Medico('','','','','');
  hospital:Hospital=new Hospital('');

  constructor( public _medicoService:MedicoService,
               public _hospitalService:HospitalService,
               public router:Router,
               public activatedRoute:ActivatedRoute,
               public _modalUploadImageService:ModalUploadService
               ) { 
                 this.activatedRoute.params.subscribe(params =>{
                   let id=params['id'];//es el mismo nombre que las pagesRoutes
                   if(id !== 'nuevo'){
                     this.cargarMedico(id);
                   }
                 })
               }

  ngOnInit() {
    //CARGO LOS HOSPITALES
    this._hospitalService.cargarHospitales()
        .subscribe( (respuesta:any) => this.listaHospitales=respuesta.hospitales);
    //actualiza cambios de imagen despues de utilziar el modal
    this._modalUploadImageService.notificacion
    .subscribe( resp => this.medico.img=resp.medico.img);
  }

  guardarMedico(formularioMedico:NgForm){
    console.log("Es valido: "+formularioMedico.valid);
    console.log("Cual es el valor: "+formularioMedico.value);

    if(formularioMedico.invalid){ return; }

    this._medicoService.crearMedico(this.medico)
        .subscribe( medico => {
          this.medico._id=medico._id;
          //una ves que creo o guardo me voy a editar medico
          this.router.navigate(['/medico',medico._id]);
        });
  }

  cambioHospital(id:string){
    this._hospitalService.obtenerHospital(id)
        .subscribe( (resp:any) => {
          this.hospital=resp.hospital;
        });
  }

  cargarMedico(id:string){
    this._medicoService.cargarMedico(id)
        .subscribe(medico=>{
          this.medico=medico;
          this.medico.hospital=medico.hospital._id;
          this.cambioHospital(this.medico.hospital);
        });
  }

  cambiarFoto(){
    this._modalUploadImageService.mostrarModal('medicos',this.medico._id);
    
  }

}
