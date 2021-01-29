import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MydatePipe } from './mydate.pipe';
import { TruncatePipe } from './truncate.pipe';



@NgModule({
  declarations: [
    MydatePipe,
    TruncatePipe
  ],
  exports: [
    MydatePipe,
    TruncatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class HymnspipeModule { }
