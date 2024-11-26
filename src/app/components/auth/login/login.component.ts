import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const credentials = {
      user_name: this.form.value.user,
      user_password: this.form.value.password
    };

    this.authService.login(credentials).subscribe(
      () => {
        const user = this.authService.currentUser;
        if (user) {
          console.log(user);
          //   alert(`Bienvenido ${user.user_name}! Tu rol es ${user.user_role}`);
          if (user.user_role == "admin") {
            this.router.navigate(['/list-books']);
          } else {
            this.router.navigate(['/list-borrow-books']);
          }

        }
      },
      err => {
        console.error(err);
        alert('Credenciales inválidas');
      }
    );
  }
}
