import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValoracionesService } from '../../../services/valoraciones';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valoracion-abm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './abm.html',
  styleUrls: ['./abm.css']
})
export class ValoracionAbm {
  @Input() producto: any;
  @Output() closeModal = new EventEmitter<void>();

  valoracionForm: FormGroup;
  authService = inject(Auth);
  valoracionesService = inject(ValoracionesService);
  fb = inject(FormBuilder);

  estrellasSeleccionadas = 0;

  constructor() {
    this.valoracionForm = this.fb.group({
      estrellas: [0, [Validators.required, Validators.min(1)]],
      comentario: ['']
    });
  }

  seleccionarEstrellas(estrellas: number) {
    this.estrellasSeleccionadas = estrellas;
    this.valoracionForm.get('estrellas')?.setValue(estrellas);
  }

  submitForm() {
    if (this.valoracionForm.invalid) {
      alert('Por favor, selecciona al menos una estrella.');
      return;
    }

    const idUsuario = this.authService.getId();
    if (!idUsuario) {
      alert('Error: No se pudo identificar al usuario.');
      return;
    }

    const valoracionData = {
      id_usuario: parseInt(idUsuario, 10),
      id_producto: this.producto.id,
      estrellas: this.valoracionForm.value.estrellas,
      comentario: this.valoracionForm.value.comentario
    };

    this.valoracionesService.crearValoracion(valoracionData).subscribe({
      next: () => {
        alert('¡Gracias por tu valoración!');
        this.closeModal.emit();
      },
      error: (err) => {
        console.error('Error al enviar la valoración:', err);
        alert(`Error: ${err.error.message || 'No se pudo enviar la valoración.'}`);
      }
    });
  }
}
