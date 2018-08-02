import { Routes, RouterModule } from "@angular/router";

//COMPONENTES
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PaginasComponent } from "./paginas.component";
import { ProgressComponent } from "./progress/progress.component";
import { CuentaConfiguracionesComponent } from "./cuenta-configuraciones/cuenta-configuraciones.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuards, VerificaExpiracionTokenGuard } from "../services/services.index";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicoComponent } from "./medicos/medico.component";
import { MedicosComponent } from "./medicos/medicos.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";
import { AdminGuard } from '../services/guards/admin.guard';

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
            { path:'dashboard', component: DashboardComponent, data:{ titulo:'Dashboard'}, canActivate:[VerificaExpiracionTokenGuard] },
            { path:'progress', component: ProgressComponent, data:{ titulo:'Progress'} , canActivate:[VerificaExpiracionTokenGuard] },
            { path:'graficas1', component: Graficas1Component, data:{ titulo:'Graficas Donas'} , canActivate:[VerificaExpiracionTokenGuard] },
            { path:'promesas', component: PromesasComponent, data:{ titulo:'Promesas'} , canActivate:[VerificaExpiracionTokenGuard] },
            { path:'rsjx', component: RxjsComponent , data:{ titulo:'RxJs - Observables'}, canActivate:[VerificaExpiracionTokenGuard] },
            { path:'account-settings', component: CuentaConfiguracionesComponent, data:{ titulo:'Ajustes del Tema'}, canActivate:[VerificaExpiracionTokenGuard] },
            { path:'perfil', component: ProfileComponent, data:{ titulo:'Perfil de Usuario'} , canActivate:[VerificaExpiracionTokenGuard] },
            { path:'busqueda/:termino', component: BusquedaComponent, data:{ titulo:'Buscardor Global'} , canActivate:[VerificaExpiracionTokenGuard] },
            //Mantenimientos
            { //aqui en usuario necesita una validacion adicional
                path:'usuarios', 
                component: UsuariosComponent, 
                canActivate:[AdminGuard,VerificaExpiracionTokenGuard],
                data:{ titulo:'Mantenimiento de Usuarios'}              
            },
            { path:'hospitales', component: HospitalComponent, data:{ titulo:'Mantenimiento de Hospitales'} , canActivate:[VerificaExpiracionTokenGuard] },
            { path:'medicos', component: MedicosComponent, data:{ titulo:'Mantenimiento de Medicos'}, canActivate:[VerificaExpiracionTokenGuard] },
            { path:'medico/:id', component: MedicoComponent, data:{ titulo:'Actualizar Medicos'} , canActivate:[VerificaExpiracionTokenGuard] },
            { path:'', redirectTo:'/dashboard', pathMatch:'full' }
        ] }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes); 
