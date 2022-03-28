import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordMobilePage } from './reset-password-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordMobilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordMobilePageRoutingModule {}
