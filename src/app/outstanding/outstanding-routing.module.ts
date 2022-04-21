import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutstandingPage } from './outstanding.page';

const routes: Routes = [
  {
    path: '',
    component: OutstandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutstandingPageRoutingModule {}
