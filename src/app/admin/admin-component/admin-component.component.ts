import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Coupon } from 'src/app/interfaces/coupon.interface';
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
  public verifyForm: UntypedFormGroup = new UntypedFormGroup({
    coupon: new UntypedFormControl('', [Validators.required])
  });

  public routes: Route[] = [];
  public coupons: Coupon[] = [];

  public verifyCouponData: any;
  private touchedRoutes: string[] = [];
  private touchedCoupons: string[] = [];

  // leaving this here in case we ever need the HTML editor

  // htmlContent = '';
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
  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.dataSvc.getPoll().subscribe((data) => {
      this.routes = data.data.routes || [{ start: '', end: '', price: '', id: this.newGuid(), isNew: true }];
      this.createRoutesForm(this.routes);

      if (data.data.discounts) {
        this.coupons = data.data.discounts.filter(coupon => !coupon.deleted)
      } else {
        this.coupons.push({ entityId: '', entityName: '', type: '', value: '', id: this.newGuid(), isNew: true })
      }
      this.createCouponForm(this.coupons);

      // this.htmlContent = data.data.htmlContent;
    });
  }

  private createRoutesForm(routes: Route[]): void {
    this.routesForm.controls = {};
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

  private newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  private createCouponForm(coupons: Coupon[]): void {
    for (const coupon of coupons) {
      this.couponForm.removeControl;
      this.couponForm.addControl(
        coupon.id,
        new UntypedFormGroup({
          entityId: new UntypedFormControl(coupon.entityId, [Validators.required]),
          value: new UntypedFormControl(coupon.value, [Validators.required]),
          type: new UntypedFormControl(coupon.type),
          entityName: new UntypedFormControl(coupon.entityName),
          isNew: new UntypedFormControl(coupon.isNew)
        })
      );
    }
  }

  addRoute(): void {
    this.routes.push({ start: '', end: '', price: '', id: this.newGuid(), isNew: true });
    this.createRoutesForm(this.routes);
  }

  deleteRoute(i: number): void {
    if (!this.routes[i].isNew) {
      this.dataSvc.deleteRoute(this.routes[i].id).subscribe();
    }
    this.routes.splice(i, 1);
    this.createRoutesForm(this.routes);
  }

  verifyEntity(arrayPos: string) {
    this.dataSvc.verifyEntity(this.couponForm.controls[arrayPos].value.entityId).subscribe((data) => {
      const index = this.coupons.findIndex((arr) => arr.id === arrayPos);
      this.coupons[index].entityName = data.data;
      this.coupons[index].type = data.extra;
      this.couponForm.controls[arrayPos].patchValue({ type: data.extra });
      this.couponForm.controls[arrayPos].patchValue({ entityName: data.data });
    });
  }

  verifyCoupon() {
    this.dataSvc.verifyCoupon(this.verifyForm.value.coupon).subscribe((data) => {
      this.verifyCouponData = data.data.user;
    });
  }

  addCoupon(): void {
    this.coupons.push({ entityId: '', entityName: '', type: '', value: '', id: this.newGuid(), isNew: true });
    this.createCouponForm(this.coupons);
  }

  deleteCoupon(i: number): void {
    if (!this.coupons[i].isNew) {
      this.dataSvc.deleteDiscount(this.coupons[i].id, this.coupons[i].entityId).subscribe();
    }
    this.coupons.splice(i, 1);
    this.createCouponForm(this.coupons);
  }

  saveAll(): void {
    Object.entries(this.routesForm.controls).forEach((control: any) => {
      if (control[1].touched) {
        this.touchedRoutes.push(control[0]);
      }
    });

    Object.entries(this.couponForm.controls).forEach((control: any) => {
      if (control[1].touched) {
        this.touchedCoupons.push(control[0]);
      }
    });

    Object.entries(this.routesForm.value).forEach((route: any) => {
      let currentRoute = {
        id: route[0],
        ...route[1]
      };

      if (route[1].isNew || this.touchedRoutes.includes(route[0]))
        this.dataSvc.postRoute(currentRoute).subscribe();
    });

    Object.entries(this.couponForm.value).forEach((coupon: any) => {
      let currentCoupon = {
        id: coupon[0],
        ...coupon[1]
      };

      if (coupon[1].isNew || this.touchedCoupons.includes(coupon[0])) {
        this.dataSvc.postDiscount(currentCoupon).subscribe();
      }
    });
  }
}
