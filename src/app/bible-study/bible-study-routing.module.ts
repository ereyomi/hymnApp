import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibleStudyPage } from './bible-study.page';

const routes: Routes = [
  {
    path: '',
    component: BibleStudyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibleStudyPageRoutingModule {}
