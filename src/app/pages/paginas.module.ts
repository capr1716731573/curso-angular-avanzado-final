import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

//COMPONENTES
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PaginasComponent } from './paginas.component';
import { PromesasComponent } from './promesas/promesas.component';

//MODULOS
import { SharedModule } from '../shared/shared.module';
import { ComponentesReutilizablesModule } from "../componentes-reutilizables/componentes-reutilizables.module";
import { PipesModule } from '../pipes/pipes.module';

//RUTAS
import { PAGES_ROUTES } from './paginas.routes';
import { CuentaConfiguracionesComponent } from './cuenta-configuraciones/cuenta-configuraciones.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




@NgModule({
    declarations:[
        PaginasComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        CuentaConfiguracionesComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        HospitalComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        ComponentesReutilizablesModule,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})

export class PagesModule { }