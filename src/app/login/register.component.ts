import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  sonIguales( campo1: string, campo2: string) {
    return (group: FormGroup) => {

      let cp1 = group.controls[campo1].value;
      let cp2 = group.controls[campo2].value;

      if ( cp1 === cp2 ) {
        return null;
      }

      return{
        sonIguales: true
      };

    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl(  null, Validators.required ),
      condiciones: new FormControl( false )
    }, {validators: this.sonIguales('password', 'password2')});

    // Rellenar formulario con datos fake
    this.forma.setValue({
      nombre: 'Edgar Cruz',
      correo: 'test1@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });

  }

  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('Importante!', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    let usuario = new Usuario (
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );

    // Llamar servicio
    this._usuarioService.crearUsuario(usuario)
    .subscribe( resp => {
      console.log(resp);
      this.router.navigate(['/login']);
    });
  }

}
