import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BibleStudyPageRoutingModule } from './bible-study-routing.module';

import { BibleStudyPage } from './bible-study.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BibleStudyPageRoutingModule
  ],
  declarations: [BibleStudyPage]
})
export class BibleStudyPageModule {}
