import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//DECLARAR UNA FUNCION DE UNARCHIVO JQUERY EN OTR ARCHIVO
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar(){
    //codigo para direccionar rutas asi como el routerlink en el html
    this.router.navigate([ '/dashboard' ]);
  }

}
