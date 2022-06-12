import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //code: string = '';

  constructor(private router: Router) {}

  navigateHome(route?: string) {
    this.router.navigate([route ? route : '/']);
  }
}
