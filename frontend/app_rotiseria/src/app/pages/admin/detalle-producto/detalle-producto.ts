import { Component, inject } from '@angular/core';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { BackButton } from '../../../components/back-button/back-button';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../../services/auth';
import { AbmProducto } from "../../../components/productos/abm/abm";
import { ProductosService } from '../../../services/productos';

@Component({
  selector: 'app-detalle-producto',
  imports: [Titlebar, BackButton, AbmProducto],
  templateUrl: './detalle-producto.html',
  styleUrl: './detalle-producto.css'
})
export class DetalleProducto {
  authService = inject(Auth);
  productosSvc = inject(ProductosService);
  producto: any = null;

  route = inject(ActivatedRoute)

  ngOnInit() {
    const id = this.route.snapshot.params['id'] || '';
    this.productosSvc.getProducto(id).subscribe((producto) => {
      this.producto = producto;
    });
  }
}
