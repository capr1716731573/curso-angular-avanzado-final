import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
  this.contarTres().then()
  .catch( error => console.log('Error de Promise', error));

  }

  ngOnInit() {
  }

  //FUNCION QUE RETORNA UNA PROMESA
  contarTres(): Promise<boolean>{
    return new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador +=1;
        console.log(contador);

        if( contador == 3 ){
          resolve(true);
          //reject(' simplemente error);
          clearInterval(intervalo);
        }
        
       } ,1000);
    });
  }

}
