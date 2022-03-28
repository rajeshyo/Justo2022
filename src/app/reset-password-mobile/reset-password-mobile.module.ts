import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordMobilePageRoutingModule } from './reset-password-mobile-routing.module';

import { ResetPasswordMobilePage } from './reset-password-mobile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ResetPasswordMobilePageRoutingModule
  ],
  declarations: [ResetPasswordMobilePage]
})
export class ResetPasswordMobilePageModule {}
