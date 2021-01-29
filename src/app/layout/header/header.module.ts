import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header.component';
import { IntroModule } from '../intro/intro.module';



@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, IntroModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
