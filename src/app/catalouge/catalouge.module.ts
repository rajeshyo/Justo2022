import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalougePageRoutingModule } from './catalouge-routing.module';

import { CatalougePage } from './catalouge.page';
import { MatIconModule } from '@angular/material/icon';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    LazyLoadImageModule,
    CatalougePageRoutingModule
  ],
  declarations: [CatalougePage]
})
export class CatalougePageModule {}
