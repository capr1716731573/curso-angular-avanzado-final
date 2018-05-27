import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

//COMPONENTES
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PaginasComponent } from './paginas.component';

//MODULOS
import { SharedModule } from '../shared/shared.module';
import { ComponentesReutilizablesModule } from "../componentes-reutilizables/componentes-reutilizables.module";

//RUTAS
import { PAGES_ROUTES } from './paginas.routes';
import { CuentaConfiguracionesComponent } from './cuenta-configuraciones/cuenta-configuraciones.component';

@NgModule({
    declarations:[
        PaginasComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        CuentaConfiguracionesComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        ComponentesReutilizablesModule,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }