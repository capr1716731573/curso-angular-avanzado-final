import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {
  menu:any=[];
  //arreglo de menu
 /*  menu:any=[
  {
    titulo:'Principal',
    icono:'mdi mdi-gauge',

  submenu:[
    {titulo:'Dashboard',url:'/dashboard'},
    {titulo:'ProgressBar',url:'/progress'},
    {titulo:'Gráficas',url:'/graficas1'},
    {titulo:'Promesas',url:'/promesas'},
    {titulo:'Rsjx',url:'/rsjx'}
  ]

  },
  {
    titulo:'Mantenimiento',
    icono:'mdi mdi-folder-lock-open',
    submenu:[
      { titulo:'Usuarios', url:'/usuarios' },
      { titulo:'Hospitales', url:'/hospitales' },
      { titulo:'Medicos', url:'/medicos' },
    ]
  }

  ]; */
  constructor( public _usuarioService:UsuarioService) {}
  

   cargarMenu(){
    this.menu=this._usuarioService.menu;
   }


}
