import { AdminComponentComponent } from './admin/admin-component/admin-component.component';
import { UserComponentComponent } from './user/user-component/user-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', component: AdminComponentComponent },
  { path: '**', component: UserComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
