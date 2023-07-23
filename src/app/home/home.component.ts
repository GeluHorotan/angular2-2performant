import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentTime: string = '';
  isLoggedIn: boolean = false;
  accountItem: { title: string; link: string } = { title: '', link: '' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateTime();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.authStatusChanged.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.updateAccountItem();
    });
  }

  updateTime(): void {
    this.currentTime = new Date().toLocaleString();
    interval(1000).subscribe(() => {
      this.currentTime = new Date().toLocaleString();
    });
  }

  updateAccountItem(): void {
    if (this.isLoggedIn) {
      this.accountItem = { title: 'Account', link: '/account' };
    } else {
      this.accountItem = { title: 'Login', link: '/login' };
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
