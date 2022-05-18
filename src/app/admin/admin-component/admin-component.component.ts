import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.scss']
})
export class AdminComponentComponent implements OnInit {
  public routesForm: FormGroup;
  htmlContent = '';

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
  constructor(http: HttpClient) {
    this.routesForm = new FormGroup({
      price: new FormControl(null),
      cargoSize: new FormControl(null, Validators.required),
      collateral: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {}
  addRoute() {
    this.routes.push({});
  }
  saveRoute(): void {}

  deleteRoute(i: number): void {
    this.routes.splice(i, 1);
  }
  saveHtml() {}
  saveAll() {
    console.log('save');
  }
}
