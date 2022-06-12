import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
interface FormModel {
  price: number;
  cargoSize: number;
  collateral: number;
}

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
  routes: any;
  private formSubsciption: Subscription | undefined;
  private minimumPrice = 5000000;
  private code: string = '';

  @ViewChild('priceSpan') priceSpan!: ElementRef<HTMLSpanElement>;

  constructor(private route: ActivatedRoute, private dataSvc: DataService, private router: Router) {
    this.freightForm = new UntypedFormGroup({
      price: new UntypedFormControl(null),
      cargoSize: new UntypedFormControl(null, Validators.required),
      collateral: new UntypedFormControl(null, Validators.required)
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

  // NOTE: This poll happens either right away or after signing in.
  private getPoll() {
    this.dataSvc
      .getPoll()
      // clone the data object, using its known Config shape
      .subscribe((data) => {
        this.routes = data.data.routes;
        if (data.data.user) {
          this.isLoggedIn = true;
          this.userCoupon = data.data.user.code;
          if (data.data.bestDiscount) this.bestDiscount = +data.data.bestDiscount;
          console.log(data);
        }
      });
  }

  ngAfterViewInit(): void {
    this.formSubsciption = this.freightForm.valueChanges.subscribe((formData) => {
      this.calculateReward(formData);
    });
  }

  ngOnDestroy(): void {
    this.formSubsciption?.unsubscribe();
  }

  calculateReward(formData: FormModel): void {
    if (formData.price > 0 && formData.cargoSize > 0 && formData.collateral > 0) {
      let potentialPrice = formData.cargoSize * formData.price + formData.collateral / 100;
      this.price = potentialPrice < this.minimumPrice ? this.minimumPrice : potentialPrice;
      this.discountedPrice = this.price * (1 - this.bestDiscount);
    } else {
      this.price = 0;
    }
    console.log(formData);
  }

  copyText(): void {
    let text_to_copy = this.priceSpan.nativeElement.textContent?.replace(/,/g, '');
    navigator.clipboard
      .writeText(text_to_copy as string)
      .then(function () {
        console.log(text_to_copy);
      })
      .catch(function () {
        console.log('err', text_to_copy);
      });
  }

  signIn(): void {
    window.location.href =
      'https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=http%3A//localhost%3A4200/&client_id=e0741e296ea248419868b30ea151e694&state=123';
  }
}
