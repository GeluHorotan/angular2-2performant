import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  tap,
  throwError,
  Subject,
  BehaviorSubject,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'userState';

  private apiUrl = '/api/users/sign_in';

  private userState = {
    user: null,
    rememberMe: false,
  };

  private authStatusChangedSubject: Subject<boolean> = new Subject<boolean>();
  authStatusChanged: Observable<boolean> =
    this.authStatusChangedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserState();
  }

  setUser(userData: any, shouldRemember: boolean): void {
    this.userState.user = userData;
    this.userState.rememberMe = shouldRemember;
    this.saveUserState();
  }

  private saveUserState(): void {
    const storage = this.userState.rememberMe ? localStorage : sessionStorage;
    storage.setItem('userState', JSON.stringify(this.userState));
  }

  private loadUserState(): void {
    const savedUserState =
      JSON.parse(localStorage.getItem('userState')!) ||
      JSON.parse(sessionStorage.getItem('userState')!);

    if (savedUserState && savedUserState.user) {
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

  isLoggedIn(): boolean {
    const userState =
      localStorage.getItem(this.AUTH_KEY) ||
      sessionStorage.getItem(this.AUTH_KEY);
    return !!userState;
  }

  logout(): void {
    this.userState.user = null;
    this.clearUserState();
    this.router.navigate(['/login']);
    this.authStatusChangedSubject.next(false);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    const user = {
      email: email,
      password: password,
    };

    return this.http.post<any>(this.apiUrl, { user }).pipe(
      tap((response) => {
        if (response && response.user) {
          this.setUser(response.user, rememberMe);
          this.authStatusChangedSubject.next(true);
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
