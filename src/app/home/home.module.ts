import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HomePage } from './home.page';
import { MatIconModule } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, MatIconModule, MatButtonModule,
    IonicModule, MatGridListModule,MatCardModule,
    HomePageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
