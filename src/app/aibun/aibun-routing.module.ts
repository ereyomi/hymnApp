import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AibunPage } from './aibun.page';

const routes: Routes = [
  {
    path: '',
    component: AibunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AibunPageRoutingModule {}
