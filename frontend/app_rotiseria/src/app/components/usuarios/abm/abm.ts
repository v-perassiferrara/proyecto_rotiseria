import { Component, inject, Input, OnChanges } from '@angular/core';
import { Auth } from '../../../services/auth';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../../services/usuarios';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-abm',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './abm.html',
  styleUrl: './abm.css'
})
export class Abm implements OnChanges{

  authService = inject(Auth);
  usuarioSvc = inject(Usuarios)
  formBuilder = inject(FormBuilder);

  @Input() usuario: any = null;
  usuarioForm!: FormGroup;

  
  ngOnChanges() {
    this.usuarioForm = this.formBuilder.group({
      nombre:   [this.usuario?.nombre   || '', Validators.required],
      apellido: [this.usuario?.apellido || '', Validators.required],
      email:    [this.usuario?.email    || '', [Validators.required, Validators.email]],
      rol:      [this.usuario?.rol      || '', Validators.required],
      estado:   [this.usuario?.estado   || '', Validators.required]
    });
  }


  guardarCambios() {
    if (this.usuarioForm.valid) {
      const usuario_nuevo = this.usuarioForm.value;
      this.usuarioSvc.putUsuarioPorId(this.usuario.id, usuario_nuevo).subscribe({
        next: (response) => {
          console.log('Usuario actualizado:', response);
          alert('Cambios guardados exitosamente');
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
