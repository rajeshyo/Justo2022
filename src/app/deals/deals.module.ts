import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';

import { IonicModule } from '@ionic/angular';

import { DealsPageRoutingModule } from './deals-routing.module';

import { DealsPage } from './deals.page';
import { MatIconModule } from '@angular/material/icon';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,MatIconModule,
    IonicModule,MatCardModule,
    LazyLoadImageModule,
    DealsPageRoutingModule
  ],
  declarations: [DealsPage]
})
export class DealsPageModule {}
