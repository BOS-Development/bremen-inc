import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Route } from 'src/app/interfaces/route.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.scss']
})
export class AdminComponentComponent implements OnInit {
  public routesForm: FormGroup = new FormGroup({});
  public couponForm: FormGroup = new FormGroup({});
  htmlContent = '';

  public routes: Route[] = [];
  public coupons: any[] = [];

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
  constructor(http: HttpClient, private dataSvc: DataService, private fb: FormBuilder) {}

  ngOnInit() {
    this.dataSvc.getPoll().subscribe((data) => {
      this.routes = data.data.routes;
      this.createRoutesForm(this.routes);

      this.coupons = data.data.discounts;
      this.createCouponForm(this.coupons);

      this.htmlContent = data.data.htmlContent;
    });
  }

  addRoute() {
    this.routes.push({ start: '', end: '', price: '', name: '' });
  }

  deleteRoute(i: number): void {
    this.routes.splice(i, 1);
  }

  verifyEntity(entityId: string) {
    return 'true';
  }

  deleteCoupon(couponToRemove: any) {
    this.coupons = this.coupons.filter((coupon) => {
      return coupon.id !== couponToRemove.id;
    });
  }

  createRoutesForm(routes: any) {
    for (const route of routes) {
      this.routesForm.addControl(
        route.name,
        new FormGroup({
          start: new FormControl(route.start, [Validators.required]),
          end: new FormControl(route.end, [Validators.required]),
          price: new FormControl(route.price, [Validators.required]),
          id: new FormControl(route.id)
        })
      );
    }
  }

  createCouponForm(coupons: any) {
    for (const coupon of coupons) {
      this.couponForm.addControl(
        coupon.id,
        new FormGroup({
          entityId: new FormControl(coupon.entityId, [Validators.required]),
          value: new FormControl(coupon.value, [Validators.required]),
          id: new FormControl(coupon.id, [Validators.required])
        })
      );
    }
  }

  saveAll() {
    console.log('save');
    console.log('routesForm', this.routesForm.value);
    console.log('couponForm', this.couponForm.value);
    console.log('htmlContent', this.htmlContent);
  }
}
