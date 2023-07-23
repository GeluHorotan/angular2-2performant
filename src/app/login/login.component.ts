import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };
  rememberMe = false;
  errors: { title: string }[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService
      .login(this.user.email, this.user.password, this.rememberMe)
      .subscribe({
        next: (response) => {
          console.log('Login successful!', response.user);
          this.router.navigate(['/account']);
        },
        error: (err) => {
          this.errors = err.error.errors;
          console.log(this.errors);
        },
      });
  }
}
