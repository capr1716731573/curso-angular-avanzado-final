import { Component, OnInit } from '@angular/core';
import { Medico } from '../../modelos/medico.model';
import { MedicoService } from '../../services/services.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  listaMedicos:Medico[]=[];
  desde:number=0;
  totalRegistros:number=0;
  cargando:boolean=true;

  constructor( public _medicoService: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicoService.cargarMedicos(this.desde)
        .subscribe( (resp:any) => {
          this.listaMedicos=resp.medicos;
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
    this.cargarMedicos();
  }

  buscarMedico(termino:string){
    this.listaMedicos=[];
    if(termino.length <= 0){
      this.cargarMedicos();
      return;
    }
    this.cargando=true;
    this._medicoService.buscarMedico(termino)
        .subscribe( (medicos:Medico[]) => {
          this.listaMedicos=medicos;
          this.cargando=false;
        })
  }

  borrarMedico(medico:Medico){
    swal({
      title: "Esta seguro ?",
      text: "Esta a punto de borrar a "+medico.nombre,
      icon: "warning",
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
    .then((borrar)=>{
      this._medicoService.borrarMedico(medico._id)
          .subscribe(borrado => {
            console.log(borrado);
            this.desde=0;
            this.cargando=true;
            this.cargarMedicos();
          })
    });

   
  }

}
