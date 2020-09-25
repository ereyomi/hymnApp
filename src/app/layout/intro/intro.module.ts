import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IntroComponent } from './intro.component';



@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [IntroComponent],
  exports: [IntroComponent]
})
export class IntroModule {}
