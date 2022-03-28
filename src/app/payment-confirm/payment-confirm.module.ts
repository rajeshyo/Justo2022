import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentConfirmPageRoutingModule } from './payment-confirm-routing.module';

import { PaymentConfirmPage } from './payment-confirm.page';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,MatButtonModule,
    PaymentConfirmPageRoutingModule
  ],
  declarations: [PaymentConfirmPage]
})
export class PaymentConfirmPageModule {}
