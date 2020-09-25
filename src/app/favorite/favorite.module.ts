import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';
import { FavoritePage } from './favorite.page';
import { IntroModule } from '../layout/intro/intro.module';
import { HeaderModule } from '../layout/header/header.module';
import { ListHymnsModule } from '../layout/list-hymns/list-hymns.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePageRoutingModule,
    IntroModule,
    HeaderModule,
    ListHymnsModule,
  ],
  exports: [FavoritePage],
  declarations: [FavoritePage]
})
export class FavoritePageModule {}
