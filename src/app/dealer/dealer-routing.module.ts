import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealerPage } from './dealer.page';

const routes: Routes = [
  {
    path: '',
    component: DealerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerPageRoutingModule {}
