import { Component, inject } from '@angular/core';
import { BackButton } from '../../../components/back-button/back-button';
import { Titlebar } from '../../../components/titlebar/titlebar';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../../services/auth';
import { AbmCategoria } from "../../../components/categorias/abm/abm";
import { CategoriasService } from '../../../services/categorias';

@Component({
  selector: 'app-detalle-categoria',
  imports: [BackButton, Titlebar, AbmCategoria],
  templateUrl: './detalle-categoria.html',
  styleUrl: './detalle-categoria.css'
})
export class DetalleCategoria {
  authService = inject(Auth);
  categoriasSvc = inject(CategoriasService);
  categoria: any = null;

  route = inject(ActivatedRoute)

  ngOnInit() {
    const id = this.route.snapshot.params['id'] || '';
    this.categoriasSvc.getCategoria(id).subscribe((categoria) => {
      this.categoria = categoria;
    });
  }
}
