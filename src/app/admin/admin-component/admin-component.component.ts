import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Route } from 'src/app/interfaces/route.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.scss']
})
export class AdminComponentComponent implements OnInit {
  public routesForm: FormGroup;
  public couponForm: FormGroup;
  htmlContent = '';

  public routes: Route[] = [];
  public coupons: any[] = [{ id: 1, entityId: '1111111', entityName: 'Name', value: '10' }];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote'
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1'
      }
    ]
  };
  constructor(http: HttpClient, private dataSvc: DataService) {
    this.routesForm = new FormGroup({
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });

    this.couponForm = new FormGroup({
      entityId: new FormControl(null),
      entityName: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.dataSvc
      .getPoll()
      // clone the data object, using its known Config shape
      .subscribe((data) => {
        console.log(data);
        this.routes = data.data.routes;
        this.coupons = data.data.discounts;
      });
  }

  addRoute() {
    this.routes.push({ start: '', end: '', price: '' });
  }

  deleteRoute(i: number): void {
    this.routes.splice(i, 1);
  }
  verifyEntity(entityId: string) {
    return 'true';
  }

  saveAll() {
    console.log('save');
  }
}
