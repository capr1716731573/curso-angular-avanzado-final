import { Routes, RouterModule } from "@angular/router";
//Componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { LoginComponent } from "./login/login.component";
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { PaginasComponent } from './pages/paginas.component';
import { RegisterComponent } from "./login/register.component";

const appRoutes: Routes=[
    

   
    { path:'login', component: LoginComponent },
    { path:'register', component: RegisterComponent },
   
    //{ path:'', redirectTo:'/dashboard', pathMatch:'full' },
    { path:'**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash:true });

