import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayHymnPageRoutingModule } from './display-hymn-routing.module';

import { DisplayHymnPage } from './display-hymn.page';
import { IntroModule } from '../layout/intro/intro.module';
import { HeaderModule } from '../layout/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroModule,
    HeaderModule,
    DisplayHymnPageRoutingModule
  ],
  declarations: [DisplayHymnPage]
})
export class DisplayHymnPageModule {}
