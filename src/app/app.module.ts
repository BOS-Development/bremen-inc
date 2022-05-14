import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponentComponent } from './admin/admin-component/admin-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponentComponent } from './user/user-component/user-component.component';

@NgModule({
  declarations: [AppComponent, AdminComponentComponent, UserComponentComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
