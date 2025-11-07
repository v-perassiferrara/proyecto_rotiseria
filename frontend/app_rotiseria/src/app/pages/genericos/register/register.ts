import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm: FormGroup;

  constructor(
    private authService: Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      telephone: ['', Validators.required],
      dni: ['', Validators.required]
    });
  }

  irRegister() {
    this.authService.register({
      nombre: this.registerForm.value.name,
      apellido: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      contrasena: this.registerForm.value.password,
      dni: this.registerForm.value.dni,
      telefono: this.registerForm.value.telephone
    }).subscribe({

      next: (res: LoginResponse) => {
        alert("Registro exitoso")
        localStorage.setItem("token", res.access_token);
        if(this.authService.getRole() == 'admin'){
          this.router.navigate(['/admin/home']);
        } 
        else {
          this.router.navigate(['/home'])
        };
      },
      error: (err) => {
        alert("Datos inválidos")
        console.log("Error registro: ", err);
        localStorage.removeItem("token");
      }
    })
  }

  submit(){
    if(this.registerForm.valid){
      this.irRegister();
    } else {
      alert("Formulario inválido")
    }
  }
}
