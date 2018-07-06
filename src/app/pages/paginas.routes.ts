import { Routes, RouterModule } from "@angular/router";

//COMPONENTES
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PaginasComponent } from "./paginas.component";
import { ProgressComponent } from "./progress/progress.component";
import { CuentaConfiguracionesComponent } from "./cuenta-configuraciones/cuenta-configuraciones.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuards } from "../services/services.index";

const pagesRoutes: Routes=[
    //RUTA DE PAGINAS O DE PAGINA PRINCIPAL QUE TIENE TODO HEADER , SIDEBAR , MAIN PAGE
    //ES DECIR PRIMER ROUTER OUTLET
    //ESTE CAMBIO SE HACE DEBIDO A QUE EL LOGIN Y REGISTER SE REDIRECCIONAN A OTRA PAGINA 
    //TOTALMENTE DISTINTA, QUE NO UTILIZA NINGUN COMPONENTE DE 
    { 
        path:'', 
        component: PaginasComponent,
        //este servicio se activar cuando se intente navegar a cualquiera de las paginas children
        
        canActivate:[LoginGuards],
        children:[
            { path:'dashboard', component: DashboardComponent, data:{ titulo:'Dashboard'} },
            { path:'progress', component: ProgressComponent, data:{ titulo:'Progress'} },
            { path:'graficas1', component: Graficas1Component, data:{ titulo:'Graficas Donas'} },
            { path:'promesas', component: PromesasComponent, data:{ titulo:'Promesas'} },
            { path:'rsjx', component: RxjsComponent , data:{ titulo:'RxJs - Observables'}},
            { path:'account-settings', component: CuentaConfiguracionesComponent, data:{ titulo:'Ajustes del Tema'} },
            { path:'', redirectTo:'/dashboard', pathMatch:'full' }
        ] }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes); 

