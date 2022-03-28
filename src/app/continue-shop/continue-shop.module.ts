import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContinueShopPageRoutingModule } from './continue-shop-routing.module';

import { ContinueShopPage } from './continue-shop.page';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,MatButtonModule,
    ContinueShopPageRoutingModule
  ],
  declarations: [ContinueShopPage]
})
export class ContinueShopPageModule {}
