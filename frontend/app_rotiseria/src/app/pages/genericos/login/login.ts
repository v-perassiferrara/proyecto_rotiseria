import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})


export class Login {

  loginForm: FormGroup;

  constructor(
    private authService: Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  irLogin() {
    this.authService.login({
      email: this.loginForm.value.email,
      contrasena: this.loginForm.value.password}).subscribe({

      next: (res: LoginResponse) => {
        alert("Login exitoso")
        console.log("Respuesta login: ",res);
        localStorage.setItem("token", res.access_token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert("Usuario o contraseña incorrectos")
        console.log("Error login: ", err);
        localStorage.removeItem("token");
      }
    })
  }

  submit(){
    console.log("Valores form: ", this.loginForm.value);
    if(this.loginForm.valid){
      this.irLogin();
    } else {
      alert("Formulario inválido")
    }
  }

}