import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

 subscripttionObservable:Subscription;

  constructor() { 
    let obs = new Observable();
    this.subscripttionObservable=this.regresaObservable()
    .subscribe(
      //se ejecuta cuando pongo observer.next(contador);
      resultado => console.log('Subs',resultado),
      //se ejecuta cuando pongo observer.error('Auxilio!!');
      error => console.error(' Error en el obs (dos veces)',error),
      //se ejecuta cuando pongo  observer.complete();
      () => console.log('El observador termino')
    )
  }

  ngOnInit() {
  }

 //metodo que se ejcuta cuando cambio de pagina
 ngOnDestroy() {
  //aqui cuando cambio de pagina me de-subscribo del observable
  this.subscripttionObservable.unsubscribe(); 
 }

  //Funcion que regresa el observable
  regresaObservable(): Observable<any>{
    return new Observable( observer => {
      let contador=0;
      let intervalo=setInterval( () => {
       contador+=1;

       let salida={
        valor:contador
      }
      
      //aqui es donde escucha el observable y ejecuta las accion retry, error segun valor que notifica
      observer.next(salida);

      if(contador === 10){
        //finalizo el intervalo de tiempo
        clearInterval(intervalo);
        //le digo que este observable ya esta completo y que se detenga caso contrario es infinito
        observer.complete();
      }

       /* if( contador === 2 ){
          //valido que cuando sea ==2 me ejecute un error
          //esa funcion de error se define arriba con el subscribe
          console.log('ejecuta Retry');
          observer.error('Auxilio!!');
        } */

      },1000)
    })

    //aqui cuando encuentra el error se ejecuta y no deja que el error avance
    //aqui hace dos intentos
    .retry(2)

    //con map modifico el valor de la salida de la respuesta antes de presentarla
    //MAS CLARO PROCESAMOS LA INFORMACION ANTES DE USARLA O ANTES DE PRESENTARLA
    //por ejemplo no controlamos el tipo de dato por eso en este caso 
    .map( (resp:any) => {
      return resp.valor;
    })

     //siempre retorna un true o false
    //si retorna tru se visuliza o se ejecuta en el subscribe si es false no
    //valor es el valor que retorno anteriormente el map
    //index es el numero de veces que se ejecuta el observable.next
    .filter( (valor,index) => {
      if((valor % 2)===1){
        //es impar
        return true;
      }else{
        // es par
        return false;
      }
    })

  } //fin funcion regresaObservable

}
