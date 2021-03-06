import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadBibleStudyPage } from './read-bible-study.page';

const routes: Routes = [
  {
    path: '',
    component: ReadBibleStudyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadBibleStudyPageRoutingModule {}
