import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../configuracion_parametros/config';
import { Usuario } from '../../modelos/usuario.model';
import { Medico } from '../../modelos/medico.model';
import { Hospital } from '../../modelos/hospital.model';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  listaUsuarios:Usuario[]=[];
  listaMedicos:Medico[]=[];
  listaHospitales:Hospital[]=[];

  constructor( public activatedRoute:ActivatedRoute,
               public http:HttpClient) { 
    this.activatedRoute.params
        .subscribe( params => {
          let termino_busqueda=params['termino'];
          this.buscar(termino_busqueda);

        })
  }

  ngOnInit() {
  }

  buscar(termino:string){
    let url=URL_SERVICIOS+'/busqueda/todo/'+termino;
    this.http.get(url).subscribe((resp:any)=>{
      console.log(resp);
      this.listaHospitales=resp.hospitales;
      this.listaUsuarios=resp.usuarios;
      this.listaMedicos=resp.medicos;
    });
  }

}
