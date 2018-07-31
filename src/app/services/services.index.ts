//aqui ya manejo todos los servicios desde un solo archivo
export { UsuarioService } from './usuario/usuario.service';
export { SettingsService } from "./settings/settings.service";
export { SharedService } from './shared/shared.service';
export { SidebarService } from './shared/sidebar.service';
export { LoginGuards } from './guards/login-guards';
export { AdminGuard } from './guards/admin.guard';
export { SubirArchivoService } from './subir-archivo/subir-archivo.service';
export { HospitalService } from './hospital/hospital.service';
export { MedicoService } from './medico/medico.service';

