import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule, MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,MatButtonModule,
    CartPageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
