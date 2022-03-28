import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';

import { IonicModule } from '@ionic/angular';

import { GownPageRoutingModule } from './gown-routing.module';

import { GownPage } from './gown.page';
import { MatIconModule } from '@angular/material/icon';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,MatIconModule,
    IonicModule,MatCardModule,
    GownPageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [GownPage]
})
export class GownPageModule {}
