import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  code: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private dataSvc: DataService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      if (this.code)
        this.dataSvc.signIn(this.code).subscribe((data) => {
          if (data && data.data) localStorage.setItem('accessToken', data.data);
        });
    });
  }
  navigateHome(route?: string) {
    this.router.navigate([route ? route : '/']);
  }
}
