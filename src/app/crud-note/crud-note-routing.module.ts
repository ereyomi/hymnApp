import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudNotePage } from './crud-note.page';

const routes: Routes = [
  {
    path: '',
    component: CrudNotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudNotePageRoutingModule {}
