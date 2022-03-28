import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressPageRoutingModule } from './address-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AddressPage } from './address.page';

@NgModule({
  imports: [
    CommonModule,MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,MatButtonModule,
    AddressPageRoutingModule
  ],
  declarations: [AddressPage]
})
export class AddressPageModule {}
