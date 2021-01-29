import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotePageRoutingModule } from './note-routing.module';

import { NotePage } from './note.page';
import { MydatePipe } from '../pipe/mydate.pipe';
import { TruncatePipe } from '../pipe/truncate.pipe';
import { HymnspipeModule } from '../pipe/hymnspipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotePageRoutingModule,
    HymnspipeModule
  ],
  declarations: [NotePage],
})
export class NotePageModule {}
