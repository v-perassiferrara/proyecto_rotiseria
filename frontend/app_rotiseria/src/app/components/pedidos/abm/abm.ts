import { Component, inject, Input, OnChanges } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { PedidosService } from '../../../services/pedidos';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-abm-pedido',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './abm.html',
  styleUrl: './abm.css'
})
export class AbmPedido implements OnChanges{

  router = inject(Router);
  authService = inject(Auth);
  pedidoSvc = inject(PedidosService)
  formBuilder = inject(FormBuilder);

  @Input() pedido: any = null;
  pedidoForm!: FormGroup;


  ngOnChanges() {
    this.pedidoForm = this.formBuilder.group({
      estado: [this.pedido?.estado || '', Validators.required]
    });
  }


  guardarCambios() {
    if (this.pedidoForm.valid) {
      const pedido_nuevo = this.pedidoForm.value;
      this.pedidoSvc.putPedido(this.pedido.id, pedido_nuevo).subscribe({
        next: (response) => {
          console.log('Pedido actualizado:', response);
          alert('Cambios guardados exitosamente');
          this.router.navigateByUrl("/admin/pedidos")
        },
        error: (error) => {
          console.error('Error updating pedido:', error);
          alert('Error al guardar cambios');
        }
      });
    } else {
      alert('Formulario invalido');
    }
  }
}
