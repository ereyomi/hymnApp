import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AibunPageRoutingModule } from './aibun-routing.module';

import { AibunPage } from './aibun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AibunPageRoutingModule
  ],
  declarations: [AibunPage],
  exports: [AibunPage]
})
export class AibunPageModule {}
