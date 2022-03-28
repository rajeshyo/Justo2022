import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCancelPageRoutingModule } from './order-cancel-routing.module';

import { OrderCancelPage } from './order-cancel.page';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,MatButtonModule,
    OrderCancelPageRoutingModule
  ],
  declarations: [OrderCancelPage]
})
export class OrderCancelPageModule {}
