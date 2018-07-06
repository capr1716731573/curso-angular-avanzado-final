import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//Importar sweetalert
import swal from 'sweetalert';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formularioRegister:FormGroup;
  

  constructor( public usuarioService:UsuarioService,
               public router:Router) { }

  ngOnInit() {
    init_plugins();

    //creo formulario desde typescritpt USO DE REACTIVE FORMS
    this.formularioRegister=new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.contrasenasIguales('password','password2')}); //validators es una validacion para validar TODO el formulario

    //doy valores para realizar pruebas
    this.formularioRegister.setValue({
      nombre: 'Test ',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  //Validar que las conatrasenas sean iguales
  //esta funcion
  contrasenasIguales (campo1:string, campo2:string){
    return (group: FormGroup)=>{
      let password1= group.controls[campo1].value;
      let password2= group.controls[campo2].value;

      if(password1 === password2){
        return null;
      }

      return{
        contrasenasIguales:true
      };
    };
  }

  //funcion para registrar usuario
  registrarUsuario(){

    if(!this.formularioRegister.valid){
      return;
    }

    if(!this.formularioRegister.value.condiciones){
      swal('Importante','Debe aceptar las condiciones','warning');
      console.log('Debe aceptar las condiciones');
      return;
    }
    //console.log('Formulario Valido: ', this.formularioRegister.valid);
    //console.log(this.formularioRegister.value);

    //instancia los datos de los campos de texto en el objeto JSON
    let usuario= new Usuario(
      this.formularioRegister.value.nombre,
      this.formularioRegister.value.correo,
      this.formularioRegister.value.password
    );

    this.usuarioService.crearUsuario(usuario)
                  .subscribe( resp =>{
                    //console.log(resp);
                    this.router.navigate(['/login']);
                  });

  }

}
