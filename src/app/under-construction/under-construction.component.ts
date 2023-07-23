import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.css'],
})
export class UnderConstructionComponent implements OnInit, OnDestroy {
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
