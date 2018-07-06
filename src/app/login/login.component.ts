import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../modelos/usuario.model';
import { GOGGLE_ID } from '../configuracion_parametros/config';


//DECLARAR UNA FUNCION DE UNARCHIVO JQUERY EN OTR ARCHIVO
declare function init_plugins();

//LIBRERIA DE JAVASCRIPT PARA UTILZIAR LAS LIBRERIAS DE GOOGLE
declare const gapi:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame:boolean=false;
  email:string;
  auth2:any;//variable para utilziar la libreria de google

  constructor( public router: Router,
               public usuarioService:UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    //verificao que si el email existe en el localstorage lo almacene ahi
    this.email=localStorage.getItem('email') || '';
    if(this.email.length > 1 ){
      this.recuerdame=true;
    }
  }

  //Funcion que declara el inicio de sesion de google mediante el plugin
  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: GOGGLE_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      console.log(token);

      this.usuarioService.loginGoogle( token )
              .subscribe( () => window.location.href = '#/dashboard'  );

    });

  }

  ingresar(formularioLogin: NgForm){
    //codigo para direccionar rutas asi como el routerlink en el html
    //this.router.navigate([ '/dashboard' ]);
    //console.log(formularioLogin.valid);
    //console.log(formularioLogin.value);

    if(formularioLogin.invalid){ return; }

    let usuarioLogin=new Usuario(null, formularioLogin.value.email, formularioLogin.value.password);

    this.usuarioService.login(usuarioLogin, formularioLogin.value.recuerdame)
                .subscribe( correcto => this.router.navigate(['/dashboard']) );
  }

}
