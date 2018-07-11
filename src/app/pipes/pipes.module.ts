import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  imports: [
    
  ],
  exports:[
    ImagenPipe
  ],
  declarations: [ImagenPipe]
})
//este modulo yo lo importo en la aplicacion
export class PipesModule { }
