import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from "ng2-charts";
//Cuando son unos Child Module 
import { CommonModule } from "@angular/common"

//COMPONENTES
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';

//PIPES
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
    declarations:[
       IncrementadorComponent,
       GraficoDonaComponent,
       ModalUploadComponent
    ],
    exports:[
        IncrementadorComponent,
        GraficoDonaComponent,
        ModalUploadComponent
    ],
    imports:[
        PipesModule,
        CommonModule,
        FormsModule,
        ChartsModule
    ]
})

export class ComponentesReutilizablesModule { }