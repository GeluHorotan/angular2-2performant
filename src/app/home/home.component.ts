import { Component, OnInit } from '@angular/core';
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
  addExtraClass: boolean = true;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateTime();
    this.authService.authStatusChanged.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.updateAccountItem();
    });

    this.updateAccountItem();
  }

  updateTime(): void {
    this.currentTime = new Date().toLocaleString();
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
