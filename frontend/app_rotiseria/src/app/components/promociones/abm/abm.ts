import { Component, inject, Input, OnChanges } from '@angular/core';
import { PromocionesService } from '../../../services/promociones';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-abm-promocion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './abm.html',
  styleUrl: './abm.css'
})
export class AbmPromocion {

  router = inject(Router);
  promocionesService = inject(PromocionesService)
  formBuilder = inject(FormBuilder);

  @Input() promocion: any = null;
  promocionForm!: FormGroup;


  ngOnInit() {
    this.promocionForm = this.formBuilder.group({
      nombre:   [this.promocion?.nombre   || '', Validators.required],
      descripcion: [this.promocion?.descripcion || '', Validators.required],
      fecha_fin: [this.promocion?.fecha_fin.toLocaleDateString('en-GB') || '11-11-2025', Validators.required],
    });
  }

  guardarCambios() {

    if (this.promocionForm.valid) {
      const formValue = this.promocionForm.value;
      
      // Formatear la fecha de YYYY-MM-DD a DD-MM-YYYY
      const [year, month, day] = formValue.fecha_fin.split('-');
      const formattedDate = `${day}-${month}-${year}`;

      const promocion_nueva = {
        ...formValue,
        fecha_fin: formattedDate
      };

      console.log("Enviando promoción:", promocion_nueva);

      this.promocionesService.postPromocion(promocion_nueva).subscribe({
        next: (response) => {
          console.log('Promoción creada:', response);
          alert('Promoción creada exitosamente');
          this.router.navigateByUrl("/admin/promociones");
        },
        error: (error) => {
          console.error('Error creating promotion:', error);
          alert('Error al crear la promoción');
        }
      });
    } else {
      alert('Formulario inválido');
    }
  }
}