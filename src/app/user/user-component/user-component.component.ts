import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AsyncValidatorFn, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Route } from 'src/app/interfaces/route.interface';
import { getPoll } from 'src/app/interfaces/getPoll.interface';
import { FormModel } from 'src/app/interfaces/formModel.interface';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.scss']
})
export class UserComponentComponent implements AfterViewInit {
  public freightForm: UntypedFormGroup;
  public price: number = 0;
  public discountedPrice: number = 0;
  public isLoggedIn: boolean = false;
  public userCoupon: string = '';
  public bestDiscount: number = 0;
  public routes: Route[] = [];
  public numberWithCommasValue: string = ''
  private formSubsciption$!: Subscription;
  private minimumPrice = 5000000; // MAGIC NUMBER
  private code: string = '';

  @ViewChild('priceSpan') priceSpan!: ElementRef<HTMLSpanElement>;
  @ViewChild('corpName') corpName!: ElementRef<HTMLSpanElement>;

  get collateral() { return this.freightForm.get('collateral'); }
  get cargoSize() { return this.freightForm.get('cargoSize'); }

  constructor(private route: ActivatedRoute, private dataSvc: DataService, private router: Router) {
    this.freightForm = new UntypedFormGroup({
      price: new UntypedFormControl(""),
      cargoSize: new UntypedFormControl("", [Validators.required, Validators.max(350000)]),
      collateral: new UntypedFormControl("", [Validators.required, Validators.max(25000000000)])
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      if (this.code && localStorage.getItem('prevCode') !== this.code) {
        this.dataSvc.signIn(this.code).subscribe((data) => {
          localStorage.setItem('prevCode', this.code);
          if (data && data.data) {
            localStorage.setItem('accessToken', data.data);
          }
          this.getPoll();
          this.router.navigate(['/']);
        });
      } else {
        this.getPoll();
      }
    });
  }

  ngAfterViewInit(): void {
    this.formSubsciption$ = this.freightForm.valueChanges.pipe(
      debounceTime(200)
    ).subscribe((formData: FormModel) => {
      this.calculateReward(formData);
    });
  }

  ngOnDestroy(): void {
    this.formSubsciption$.unsubscribe();
  }

  // NOTE: This poll happens either right away or after signing in.
  private getPoll(): void {
    this.dataSvc
      .getPoll().pipe(
        // clone the data object, using its known Config shape
        map((value) => {
          if (value) this.setPageValues(value);
        })
      )
      .subscribe();
  }

  private setPageValues(pageValues: getPoll): void {
    // let myRoutes = { value: { data: {} } };
    // console.log(myRoutes);
    this.routes = pageValues.data.routes;
    if (pageValues.data.user) {
      this.isLoggedIn = true;
      this.userCoupon = pageValues.data.user.code;
      if (pageValues.data.bestDiscount) this.bestDiscount = +pageValues.data.bestDiscount.value;
    }
    console.log(pageValues);
  }

  calculateReward(formData: FormModel): void {
    if (formData.price > 0 && formData.cargoSize > 0 && formData.collateral > 0) {
      let potentialPrice = formData.cargoSize * formData.price + formData.collateral / 100;
      this.price = potentialPrice < this.minimumPrice ? this.minimumPrice : potentialPrice;
      this.discountedPrice = this.price * (1 - this.bestDiscount);
      this.numberWithCommasValue = this.numberWithCommas(formData.collateral);
    } else {
      this.price = 0;
    }
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  copyText(event: MouseEvent): void {
    let text_to_copy = (event.target as HTMLButtonElement).previousSibling?.textContent?.replace(/,/g, '');
    navigator.clipboard
      .writeText(text_to_copy as string)
      .then(function () {
        // console.log(text_to_copy);
      })
      .catch(function () {
        console.log('err', text_to_copy);
      });
  }

  signIn(): void {
    window.location.href =
      `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=${environment.returnURL}&client_id=e0741e296ea248419868b30ea151e694&state=123`;
  }
}
