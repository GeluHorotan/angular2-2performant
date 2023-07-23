import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/users/sign_in';

  private userState = {
    user: null,
    rememberMe: false,
  };

  authStatusChanged: any;

  constructor(private http: HttpClient) {
    this.loadUserState();
  }

  private saveUserState(): void {
    const storage = this.userState.rememberMe ? localStorage : sessionStorage;
    storage.setItem('userState', JSON.stringify(this.userState));
  }

  private loadUserState(): void {
    const savedUserState =
      JSON.parse(localStorage.getItem('userState')!) ||
      JSON.parse(sessionStorage.getItem('userState')!);
    if (savedUserState) {
      this.userState = savedUserState;
    }
  }

  private clearUserState(): void {
    localStorage.removeItem('userState');
    sessionStorage.removeItem('userState');
    this.userState = {
      user: null,
      rememberMe: false,
    };
  }

  getUser(): any {
    return this.userState.user;
  }

  setUser(userData: any, shouldRemember: boolean): void {
    this.userState.user = userData;
    this.userState.rememberMe = shouldRemember;
    this.saveUserState();
  }

  isLoggedIn(): boolean {
    return this.userState.user !== null;
  }

  logout(): void {
    this.userState.user = null;
    this.clearUserState();
  }

  login(email: string, password: string): Observable<any> {
    const user = {
      email: email,
      password: password,
    };
    console.log(this.apiUrl, 'apiURl');
    return this.http.post<any>(this.apiUrl, { user });
  }
}
