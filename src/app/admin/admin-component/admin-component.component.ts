import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Route } from 'src/app/interfaces/route.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.scss']
})
export class AdminComponentComponent implements OnInit {
  public routesForm: UntypedFormGroup = new UntypedFormGroup({});
  public couponForm: UntypedFormGroup = new UntypedFormGroup({});
  // htmlContent = '';

  public routes: Route[] = [];
  public coupons: any[] = [];

  // config: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '15rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  //   translate: 'no',
  //   defaultParagraphSeparator: 'p',
  //   defaultFontName: 'Arial',
  //   toolbarHiddenButtons: [['bold']],
  //   customClasses: [
  //     {
  //       name: 'quote',
  //       class: 'quote'
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText'
  //     },
  //     {
  //       name: 'titleText',
  //       class: 'titleText',
  //       tag: 'h1'
  //     }
  //   ]
  // };
  constructor(private dataSvc: DataService, private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.dataSvc.getPoll().subscribe((data) => {
      this.routes = data.data.routes;
      console.log(this.routes);
      this.createRoutesForm(this.routes);

      this.coupons = data.data.discounts;
      this.createCouponForm(this.coupons);

      // this.htmlContent = data.data.htmlContent;
    });
  }

  addRoute() {
    this.routes.push({ start: '', end: '', price: '', id: this.newGuid(), isNew: true });
    this.createRoutesForm(this.routes);
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
        route.id,
        new UntypedFormGroup({
          start: new UntypedFormControl(route.start, [Validators.required]),
          end: new UntypedFormControl(route.end, [Validators.required]),
          price: new UntypedFormControl(route.price, [Validators.required]),
          isNew: new UntypedFormControl(route.isNew)
        })
      );
    }
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  createCouponForm(coupons: any) {
    for (const coupon of coupons) {
      this.couponForm.addControl(
        coupon.id,
        new UntypedFormGroup({
          entityId: new UntypedFormControl(coupon.entityId, [Validators.required]),
          value: new UntypedFormControl(coupon.value, [Validators.required]),
          id: new UntypedFormControl(coupon.id, [Validators.required])
        })
      );
    }
  }

  saveAll() {
    // console.log('save');
    // console.log('routesForm', this.routesForm.value);
    // console.log('couponForm', this.couponForm.value);
    let routesData: any = [];

    Object.entries(this.routesForm.value).forEach((route: any) => {
      let currentRoute = {
        id: route[0],
        ...route[1]
      };
      routesData.push(currentRoute);
      if (route[1].isNew)
        this.dataSvc.postRoute(currentRoute).subscribe((data) => {
          console.log('fuck off');
        });
    });
    // console.log(routesData);
    // console.log('htmlContent', this.htmlContent);
  }
}
