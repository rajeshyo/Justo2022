import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GownPage } from './gown.page';

const routes: Routes = [
  {
    path: '',
    component: GownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GownPageRoutingModule {}
