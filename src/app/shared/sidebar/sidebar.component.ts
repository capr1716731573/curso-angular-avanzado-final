import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from "./../../services/services.index";
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  usuario:Usuario;
  constructor(public _sidebarService: SidebarService,
              public _usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuario=this._usuarioService.usuario;
    this._sidebarService.cargarMenu();
  }

}
