import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShirtdetailPage } from './shirtdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ShirtdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShirtdetailPageRoutingModule {}
