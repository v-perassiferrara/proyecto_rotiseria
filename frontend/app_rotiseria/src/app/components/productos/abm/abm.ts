import { Component, inject, Input, OnChanges } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { ProductosService } from '../../../services/productos';
import { CategoriasService } from '../../../services/categorias';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-abm-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './abm.html',
  styleUrl: './abm.css'
})
export class AbmProducto implements OnChanges{

  router = inject(Router);
  authService = inject(Auth);
  productoSvc = inject(ProductosService)
  categoriasSvc = inject(CategoriasService)
  formBuilder = inject(FormBuilder);

  @Input() producto: any = null;
  productoForm!: FormGroup;
  categorias: any[] = [];

  ngOnInit() {
    this.categoriasSvc.getCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data.categorias || [];
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  ngOnChanges() {
    this.productoForm = this.formBuilder.group({
      nombre: [this.producto?.nombre || '', Validators.required],
      precio: [this.producto?.precio || 0, [Validators.required, Validators.min(0)]],
      fk_id_categoria: [this.producto?.categoria || 0, Validators.required],
      imagenUrl: [this.producto?.imagenUrl || ''],
      visible: [this.producto?.visible ?? true]
    });
  }


  guardarCambios() {
    if ((this.producto.id == null || this.producto.id == '') && this.productoForm.valid) {
      

      this.productoSvc.postProductos(this.productoForm.value).subscribe({
        next: (response) => {
          console.log('Producto creado:', response);
          alert('Producto creado exitosamente');
          this.router.navigateByUrl("/admin/productos")
        },
        error: (error) => {
          console.error('Error creating producto:', error);
          alert('Error al crear producto');
        }
      });
    } else if (this.producto.id != null && this.producto.id != '' && this.productoForm.valid) {
      const producto_nuevo = this.productoForm.value;
      this.productoSvc.putProducto(this.producto.id, producto_nuevo).subscribe({
        next: (response) => {
          console.log('Producto actualizado:', response);
          alert('Cambios guardados exitosamente');
          this.router.navigateByUrl("/admin/productos")
        },
        error: (error) => {
          console.error('Error updating producto:', error);
          alert('Error al guardar cambios');
        }
      });
    } else {
      alert('Formulario invalido');
    }
  }
}
