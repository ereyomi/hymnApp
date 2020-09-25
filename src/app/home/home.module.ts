import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ListHymnsModule } from '../layout/list-hymns/list-hymns.module';
import { IntroModule } from '../layout/intro/intro.module';
import { HeaderModule } from '../layout/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListHymnsModule,
    IntroModule,
    HeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
  ]
})
export class HomePageModule {}
