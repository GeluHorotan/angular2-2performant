import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  angularVersion = 'Angular.JS';
  isLoggedIn = false;
  navItems = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Careers', link: '/under-construction' },
  ];

  accountItem: { title: string; link: string } = { title: '', link: '' };
  showSidebar = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.updateAccountItem();

    this.authService.authStatusChanged.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.updateAccountItem();
    });
  }

  updateAccountItem() {
    if (this.isLoggedIn) {
      this.accountItem = { title: 'Account', link: '/account' };
    } else {
      this.accountItem = { title: 'Login', link: '/login' };
    }
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  closeSidebar() {
    if (this.showSidebar) {
      this.toggleSidebar();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
