import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalougePage } from './catalouge.page';

const routes: Routes = [
  {
    path: '',
    component: CatalougePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalougePageRoutingModule {}
