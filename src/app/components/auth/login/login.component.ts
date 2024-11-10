import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Corregido a "styleUrls"
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      user: ['', [Validators.required]],  // Se agrega validación de email
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca todos los campos para mostrar errores
      return;
    }
    
    const credentials = {
      user_name: this.form.value.user,
      user_password: this.form.value.password
    };
    this.authService.login(credentials);
  }
}
