import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadBibleStudyPageRoutingModule } from './read-bible-study-routing.module';

import { ReadBibleStudyPage } from './read-bible-study.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadBibleStudyPageRoutingModule
  ],
  declarations: [ReadBibleStudyPage]
})
export class ReadBibleStudyPageModule {}
