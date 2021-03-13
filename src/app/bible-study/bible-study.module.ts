import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BibleStudyPageRoutingModule } from './bible-study-routing.module';

import { BibleStudyPage } from './bible-study.page';
import { HeaderModule } from '../layout/header/header.module';
import { IntroModule } from '../layout/intro/intro.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BibleStudyPageRoutingModule,
    IntroModule
  ],
  declarations: [BibleStudyPage],
  exports: [BibleStudyPage],
})
export class BibleStudyPageModule { }
