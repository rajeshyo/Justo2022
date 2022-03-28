import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewaddressPageRoutingModule } from './newaddress-routing.module';

import { NewaddressPage } from './newaddress.page';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,MatCardModule,MatIconModule,MatButtonModule,
    FormsModule,MatFormFieldModule,ReactiveFormsModule,
    IonicModule,MatInputModule,MatSelectModule,
    NewaddressPageRoutingModule
  ],
  declarations: [NewaddressPage]
})
export class NewaddressPageModule {}
