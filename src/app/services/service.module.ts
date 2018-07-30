import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService,SidebarService,SharedService,UsuarioService,SubirArchivoService,HospitalService, MedicoService } from "./services.index";
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../componentes-reutilizables/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
