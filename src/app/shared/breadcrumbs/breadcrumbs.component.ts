import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter,map } from 'rxjs/operators';
import { Title, MetaDefinition, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  tituloPagina:string='Blank Page';

  constructor( private router: Router,
               private tituloPestania: Title,
               private meta: Meta
             ) {
    
    this.getDataRoute()
    .subscribe( data => {
      console.log(data);
      this.tituloPagina= data.titulo;
      this.tituloPestania.setTitle(data.titulo);

      //CREO EL METATAG DE LA PAGINA CON EL TITULO ACORDE A LA PAGINA DONDE ESTE NAVEGANDO
      const metatag: MetaDefinition={
      name:'description',
      content:this.tituloPagina
    };
    this.meta.updateTag(metatag);

    });

    
   }

  ngOnInit() {
  }

  //Funcion para obtener el titulo
  getDataRoute(){
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento:ActivationEnd) => evento.snapshot.data)
    )
  }

}
