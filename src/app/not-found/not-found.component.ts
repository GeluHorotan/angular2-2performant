import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  remainingSeconds: number = 10;
  private timer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.countdown();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  countdown(): void {
    if (this.remainingSeconds > 0) {
      this.remainingSeconds--;
    } else {
      this.goHome();
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
