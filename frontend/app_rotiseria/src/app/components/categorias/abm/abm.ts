import { Component, inject, Input, OnChanges } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { CategoriasService } from '../../../services/categorias';
import { ProductosService } from '../../../services/productos';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-abm-categoria',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './abm.html',
  styleUrl: './abm.css'
})
export class AbmCategoria implements OnChanges{

  router = inject(Router);
  authService = inject(Auth);
  categoriaSvc = inject(CategoriasService)
  formBuilder = inject(FormBuilder);
  productoSvc = inject(ProductosService);

  @Input() categoria: any = null;
  categoriaForm!: FormGroup;

  ngOnChanges() {
    this.categoriaForm = this.formBuilder.group({
      nombre: [this.categoria?.nombre || '', Validators.required],
      imagenUrl: [this.categoria?.imagenUrl || ''],
      visible: [this.categoria?.visible ?? true]
    });
  }


  guardarCambios() {
    if (this.categoriaForm.valid) {
      const categoria_nueva = this.categoriaForm.value;
      if (this.categoria.visible === false) {
        this.productoSvc.putProductosVisibilityByCategoria(this.categoria.id, false).subscribe({
          next: (response) => {
            console.log('Productos actualizados a no visibles:', response);
          },
          error: (error) => {
            console.error('Error updating productos visibility:', error);
          }
        });

        }
      this.categoriaSvc.putCategoria(this.categoria.id, categoria_nueva).subscribe({
        next: (response) => {
          alert('Cambios guardados exitosamente');
          this.router.navigateByUrl("/admin/home")
        },
        error: (error) => {
          console.error('Error updating categoria:', error);
          alert('Error al guardar cambios');
        }
      });
    } else {
      alert('Formulario invalido');
    }
  }
}
