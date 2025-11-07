import { Component, inject, Input, OnChanges } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { PedidosService } from '../../../services/pedidos';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacionesService } from '../../../services/notificaciones';


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
  notificacionesSvc = inject(NotificacionesService)
  formBuilder = inject(FormBuilder);

  @Input() pedido: any = null;
  pedidoForm!: FormGroup;


  ngOnChanges() {
    this.pedidoForm = this.formBuilder.group({
      estado: [this.pedido?.estado || '', Validators.required]
    });
  }


  guardarCambios() {
    this.pedidoSvc.getPedidoCompleto(this.pedido.id).subscribe((pedido) => {
      this.pedido = pedido;
    });
    if (this.pedidoForm.valid) {
      const estado = this.pedidoForm.value;
      this.pedidoSvc.putPedido(this.pedido, estado).subscribe({
        next: (response) => {
          this.notificacionesSvc.postNotificacion(response.id_usuario, response.id, response.estado).subscribe({
            next: (notifResponse) => {
              alert('Cambios guardados y notificación enviada exitosamente');
              this.router.navigateByUrl("/admin/pedidos");
            },
            error: (notifError) => {
              console.error('Error creating notification:', notifError);
              alert('Cambios guardados, pero falló el envío de la notificación.');
            }
          });
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
