import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule, MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,MatButtonModule,
    AccountPageRoutingModule,LazyLoadImageModule
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
