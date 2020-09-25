import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotePageRoutingModule } from './note-routing.module';

import { NotePage } from './note.page';

import { TruncatePipe } from '../pipe/truncate.pipe';
import { MydatePipe } from '../pipe/mydate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotePageRoutingModule
  ],
  declarations: [NotePage, TruncatePipe, MydatePipe]
})
export class NotePageModule {}
