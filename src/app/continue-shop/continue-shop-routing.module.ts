import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContinueShopPage } from './continue-shop.page';

const routes: Routes = [
  {
    path: '',
    component: ContinueShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContinueShopPageRoutingModule {}
