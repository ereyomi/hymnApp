import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BibleStudyPageRoutingModule } from './bible-study-routing.module';

import { BibleStudyPage } from './bible-study.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BibleStudyPageRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  declarations: [BibleStudyPage]
})
export class BibleStudyPageModule {}
