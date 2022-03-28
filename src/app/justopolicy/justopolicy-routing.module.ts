import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustopolicyPage } from './justopolicy.page';

const routes: Routes = [
  {
    path: '',
    component: JustopolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustopolicyPageRoutingModule {}
