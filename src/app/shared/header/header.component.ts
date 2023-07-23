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
    { title: 'Careers', link: '/careers' },
  ];

  accountItem: { title: string; link: string } = { title: '', link: '' };
  showSidebar = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.authStatusChanged.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      this.updateHeader();
    });

    this.isLoggedIn = this.authService.isLoggedIn();
    this.updateHeader();
  }

  updateHeader() {
    this.accountItem = this.isLoggedIn
      ? { title: 'Account', link: '/account' }
      : { title: 'Login', link: '/login' };
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
