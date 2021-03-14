import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotePageRoutingModule } from './note-routing.module';

import { NotePage } from './note.page';
import { HymnspipeModule } from '../pipe/hymnspipe.module';
import { AibunPageModule } from '../aibun/aibun.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotePageRoutingModule,
    HymnspipeModule,
    AibunPageModule
  ],
  declarations: [NotePage],
})
export class NotePageModule { }
