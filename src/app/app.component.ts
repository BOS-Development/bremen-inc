import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataObject = {
    routes: [
      {
        id: '',
        start: '',
        end: '',
        price: ''
      }
    ]
  };
  constructor(private router: Router) {}

  navigateHome(route?: string) {
    this.router.navigate([route ? route : '/']);
  }
}
