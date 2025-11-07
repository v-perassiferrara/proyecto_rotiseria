import { Component, inject, Input, OnInit } from '@angular/core';
import { BackButton } from '../../../components/back-button/back-button';
import { Titlebar } from '../../../components/titlebar/titlebar';
import {UsuariosService} from '../../../services/usuarios';
import { Auth } from '../../../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-personales',
  imports: [Titlebar, BackButton, ReactiveFormsModule],
  templateUrl: './datos-personales.html',
  styleUrl: './datos-personales.css'
})
export class DatosPersonales implements OnInit{

  authService = inject(Auth);
  usuarioSvc = inject(UsuariosService)
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  usuario : any = null
  usuarioForm!: FormGroup;

  
  constructor() {
    // Inicializa el formulario con valores vacíos para evitar errores en el template
    // mientras se cargan los datos.
    this.usuarioForm = this.formBuilder.group({
      nombre:     ['', Validators.required],
      apellido:   ['', Validators.required],
      email:      ['', [Validators.required, Validators.email]],
      telefono:   ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit() {
    const userId = this.authService.getId();
    if (userId) {
      // 1. Llama al servicio para obtener el Observable
      this.usuarioSvc.getUsuarioPorId(userId).subscribe({
        next: (datosUsuario) => {
          // 2. CUANDO LLEGAN LOS DATOS, los asignas y actualizas el formulario
          this.usuario = datosUsuario;
          
          // 'patchValue' es ideal para rellenar el formulario con los datos recibidos
          this.usuarioForm.patchValue({
            nombre:     this.usuario.nombre,
            apellido:   this.usuario.apellido,
            //contrasena: this.usuario.contrasena,
            email:      this.usuario.email,
            telefono:   this.usuario.telefono
          });
        },
        error: (err) => {
          console.error("Error al obtener los datos del usuario", err);
          alert("No se pudieron cargar los datos del perfil.");
        }
      });
    }
  }


  guardarCambios() {
    if (this.usuarioForm.valid) {
      const usuario_nuevo = this.usuarioForm.value;
      this.usuarioSvc.putUsuarioPorId(this.usuario.id, usuario_nuevo).subscribe({
        next: (response) => {
          console.log('Usuario actualizado:', response);
          alert('Cambios guardados exitosamente');
          this.router.navigateByUrl("/usuario")
        },
        error: (error) => {
          console.error('Error updating user:', error);
          alert('Error al guardar cambios');
        }
      });
    } else {
      alert('Formulario invalido');
    }
  }
}