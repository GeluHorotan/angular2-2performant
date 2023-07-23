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

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService
      .login(this.user.email, this.user.password, this.rememberMe)
      .subscribe({
        next: (response) => {
          console.log('Login successful!', response.user);
        },
        error: (error) => {
          console.error('Login failed!', error);
        },
      });
  }
}
