import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustopolicyPageRoutingModule } from './justopolicy-routing.module';

import { JustopolicyPage } from './justopolicy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JustopolicyPageRoutingModule
  ],
  declarations: [JustopolicyPage]
})
export class JustopolicyPageModule {}
