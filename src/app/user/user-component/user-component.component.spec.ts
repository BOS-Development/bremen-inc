import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserComponentComponent } from './user-component.component';

describe('UserComponentComponent', () => {
  let component: UserComponentComponent;
  let fixture: ComponentFixture<UserComponentComponent>;

  let MockRespose = {
    "data": {
      "user": {
        "id": "831943198",
        "scopes": 1,
        "name": "shutupandshave",
        "corporation": {
          "id": "263585335",
          "name": "Black Omega Security"
        },
        "alliance": {
          "id": "99005338",
          "name": "Pandemic Horde"
        },
        "code": "eE6oSt7",
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkpXVC1TaWduYXR1cmUtS2V5IiwidHlwIjoiSldUIn0.eyJqdGkiOiI4OTM4OTI3Mi0zN2Q0LTRlZmMtYmU4MC01ZjBiOTczOTZlNzkiLCJraWQiOiJKV1QtU2lnbmF0dXJlLUtleSIsInN1YiI6IkNIQVJBQ1RFUjpFVkU6ODMxOTQzMTk4IiwiYXpwIjoiZTA3NDFlMjk2ZWEyNDg0MTk4NjhiMzBlYTE1MWU2OTQiLCJ0ZW5hbnQiOiJ0cmFucXVpbGl0eSIsInRpZXIiOiJsaXZlIiwicmVnaW9uIjoid29ybGQiLCJhdWQiOiJFVkUgT25saW5lIiwibmFtZSI6InNodXR1cGFuZHNoYXZlIiwib3duZXIiOiI5TWozeDk5MEFDZmlRWkM1dFJIdXZvTGpwajA9IiwiZXhwIjoxNjUzNzM3MTU5LCJpYXQiOjE2NTM3MzU5NTksImlzcyI6ImxvZ2luLmV2ZW9ubGluZS5jb20ifQ.gsO3BzF-berxvrN7VXiLoNBjzLyBNEK-CBoloNffB89JeHB9KcZmyZyRtTDFkaxnF42N1dOnQIVdbgpxGUuRcvpJLWO2VZhoMVsdm3sj_Uebib_1rYwCsWUhAi-tiZmPBa0c6Cqdrla5pFdcG9yja-nwfIdt1OQCeS3zHzbUa2oPuZFzbEbJBjB8p7YNIJ2RUdSDXxJkfgU1eO5Le4FCanxgASOyfl0uSm5ljEXpoweaxmm5efws-FGns5TkJh14lDCHcIEvOusuJe5dVk70HO5sjZrg6rncQZa_Dqq4ix7fqFPzK3Ambl-4_VQqVmckOZWWM360hMWFWxxSaFHVZA",
        "refreshToken": "EtkcgrXXpEO/dTAxcVsZ2g==",
        "modified": "2022-07-10T21:57:01.639077350Z"
      },
      "routes": [
        {
          "id": "d3cca028-c7c7-496d-92f2-9abab47b37ee",
          "start": "MJ-5F9",
          "end": "XVV-21",
          "price": "101",
          "modified": "2022-05-18T17:35:34.178741710Z"
        },
        {
          "id": "0cc28f71-563b-45f6-942c-f913676f72ab",
          "deleted": true,
          "start": "222",
          "end": "333",
          "price": "455",
          "modified": "2022-06-18T21:12:57.625922535Z"
        },
        {
          "id": "a3983843-1aee-45d9-908f-5312a127b192",
          "start": "MJ-5F9",
          "end": "XVV-21",
          "price": "100",
          "modified": "2022-05-17T20:56:26.605357616Z"
        },
        {
          "id": "c79ac3d7-a95e-46af-9f2c-9d708cebd8fa",
          "start": "MJ-5F9",
          "end": "XVV-21",
          "price": "101",
          "modified": "2022-05-18T23:08:24.214603656Z"
        },
        {
          "id": "f8c6af28-98de-44bd-9ea9-3c6df5467f3b",
          "deleted": true,
          "start": "111",
          "end": "222",
          "price": "333",
          "modified": "2022-06-18T21:05:36.722269113Z"
        }
      ],
      "discounts": [
        {
          "type": "Alliance",
          "id": "d6cca028-c7c7-496d-92f2-9abab47b37ee",
          "entityId": "99005338",
          "entityName": "Pandemic Horde",
          "value": "0.1",
          "modified": "2022-05-28T11:13:02.110560247Z"
        },
        {
          "type": "Character",
          "id": "d4cca028-c7c7-496d-92f2-9abab47b37ee",
          "entityId": "831943198",
          "entityName": "shutupandshave",
          "value": "0.3",
          "modified": "2022-05-28T11:13:02.110560247Z"
        },
        {
          "type": "Corporation",
          "id": "d5cca028-c7c7-496d-92f2-9abab47b37ee",
          "entityId": "263585335",
          "entityName": "Black Omega Security",
          "value": "0.2",
          "modified": "2022-05-28T11:13:02.110560247Z"
        }
      ],
      "bestDiscount": {
        "type": "Character",
        "id": "d4cca028-c7c7-496d-92f2-9abab47b37ee",
        "entityId": "831943198",
        "entityName": "shutupandshave",
        "value": "0.3",
        "modified": "2022-05-28T11:13:02.110560247Z"
      }
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [UserComponentComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
