import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListHymnsComponent } from './list-hymns.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ListHymnsComponent],
  exports: [ListHymnsComponent]
})
export class ListHymnsModule {}
