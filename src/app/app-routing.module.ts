import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessPageComponent } from './success-page/success-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { InitiatePageComponent } from './initiate-page/initiate-page.component';

const routes: Routes = [
  {path : 'success-page', component : SuccessPageComponent},
  {path : 'error-page', component : ErrorPageComponent },
  {path : '', component : InitiatePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
