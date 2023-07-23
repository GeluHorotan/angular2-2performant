import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const isLoginPage = state.url === '/login';

    if (isLoggedIn && isLoginPage) {
      this.router.navigate(['/account']);
      return false;
    }

    if (!isLoggedIn && !isLoginPage) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
