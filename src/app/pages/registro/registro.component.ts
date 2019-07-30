import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;


  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

    // this.usuario.email = 'alexisnarvaez97@hotmail.com';
   }

   Guardar( form: NgForm ){


    if( form.invalid ) { return; }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.Auth.nuevoUsuario(this.usuario)
        .subscribe( resp =>{
          console.log(resp);
          Swal.close();
          this.router.navigateByUrl("/home");
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        type: 'info',
        title: 'Error al registrar',
        text: err.error.error.message
      });
    })



   }


}
