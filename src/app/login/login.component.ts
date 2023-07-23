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

  login() {
    this.authService.login(this.user.email, this.user.password).subscribe(
      (response) => {
        console.log('Login successful!', response);
        this.authService.setUser(response.data.user, this.rememberMe);
        this.router.navigate(['/account']);
      },
      (error) => {
        console.log('Login failed!', error);
      }
    );
  }
}
