import { Component, inject } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../../services/auth';
import { AbmPedido } from "../../../components/pedidos/abm/abm";
import { PedidosService } from '../../../services/pedidos';

@Component({
  selector: 'app-detalle-pedido',
  imports: [Titlebar, BackButton, AbmPedido],
  templateUrl: './detalle-pedido.html',
  styleUrl: './detalle-pedido.css'
})
export class DetallePedido {
  authService = inject(Auth);
  pedidosSvc = inject(PedidosService);
  pedido: any = null;

  route = inject(ActivatedRoute)

  ngOnInit() {
    const id = this.route.snapshot.params['id'] || '';
    this.pedidosSvc.getPedidoCompleto(id).subscribe((pedido) => {
      this.pedido = pedido;
    });
  }
}
