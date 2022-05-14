import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
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
  public freightForm: FormGroup;
  public price: number = 0;
  public routes: any = [
    {
      id: '1',
      start: 'Jita/Perimeter',
      end: 'MJ-5F9',
      price: '425'
    },
    {
      id: '2',
      start: 'Jita/Perimeter',
      end: 'R1O-GN',
      price: '425'
    }
  ];
  private formSubsciption: Subscription | undefined;
  private minimumPrice = 5000000;

  @ViewChild('priceSpan') priceSpan!: ElementRef<HTMLSpanElement>;

  constructor() {
    this.freightForm = new FormGroup({
      price: new FormControl(null),
      cargoSize: new FormControl(null, Validators.required),
      collateral: new FormControl(null, Validators.required)
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
      let potentialPrice = formData.cargoSize * formData.collateral;
      this.price = potentialPrice < this.minimumPrice ? this.minimumPrice : potentialPrice;
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
}
