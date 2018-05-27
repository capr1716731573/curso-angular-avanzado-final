import { Routes, RouterModule } from "@angular/router";

//COMPONENTES
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PaginasComponent } from "./paginas.component";
import { ProgressComponent } from "./progress/progress.component";
import { CuentaConfiguracionesComponent } from "./cuenta-configuraciones/cuenta-configuraciones.component";

const pagesRoutes: Routes=[
    //RUTA DE PAGINAS O DE PAGINA PRINCIPAL QUE TIENE TODO HEADER , SIDEBAR , MAIN PAGE
    //ES DECIR PRIMER ROUTER OUTLET
    //ESTE CAMBIO SE HACE DEBIDO A QUE EL LOGIN Y REGISTER SE REDIRECCIONAN A OTRA PAGINA 
    //TOTALMENTE DISTINTA, QUE NO UTILIZA NINGUN COMPONENTE DE 
    { 
        path:'', 
        component: PaginasComponent,
        children:[
            { path:'dashboard', component: DashboardComponent },
            { path:'progress', component: ProgressComponent },
            { path:'graficas1', component: Graficas1Component },
            { path:'account-settings', component: CuentaConfiguracionesComponent },
            { path:'', redirectTo:'/dashboard', pathMatch:'full' }
        ] }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes); 

