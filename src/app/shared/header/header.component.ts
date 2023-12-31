import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  angularVersion = '';
  isLoggedIn: boolean = false;
  navItems = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Careers', link: '/careers' },
  ];

  accountItem: { title: string; link: string } = { title: '', link: '' };
  showSidebar = false;
  private authStatusSubscription: Subscription | null = null; // Initialize with null

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.angularVersion = VERSION.full;

    if (this.authService.authStatusChanged) {
      // If authStatusChanged exists, subscribe to it
      this.authStatusSubscription =
        this.authService.authStatusChanged.subscribe((loggedIn: boolean) => {
          this.isLoggedIn = loggedIn;
          this.updateHeader();
        });
    }

    this.updateHeader();
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
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
