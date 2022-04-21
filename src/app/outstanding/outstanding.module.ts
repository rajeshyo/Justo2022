import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutstandingPageRoutingModule } from './outstanding-routing.module';

import { OutstandingPage } from './outstanding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutstandingPageRoutingModule
  ],
  declarations: [OutstandingPage]
})
export class OutstandingPageModule {}
