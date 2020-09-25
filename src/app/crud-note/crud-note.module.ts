import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudNotePageRoutingModule } from './crud-note-routing.module';

import { CrudNotePage } from './crud-note.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudNotePageRoutingModule,
  ],
  declarations: [CrudNotePage]
})
export class CrudNotePageModule {}
