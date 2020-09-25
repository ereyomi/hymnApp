import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayHymnPage } from './display-hymn.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayHymnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayHymnPageRoutingModule {}
