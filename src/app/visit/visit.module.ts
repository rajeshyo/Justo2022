import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitPageRoutingModule } from './visit-routing.module';

import { VisitPage } from './visit.page';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  imports: [
    CommonModule,MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,MatButtonModule,
    VisitPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VisitPage]
})
export class VisitPageModule {}
