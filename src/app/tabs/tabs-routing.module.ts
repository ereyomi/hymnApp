import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { IndexedDbResolver } from '../services/indexeddb-route-resolver.service';
import { FavoritePageResolver } from '../services/favPage-route-resolver';
import { HymnsDataResolver } from '../services/hymnsdata-route-resolver';

const routes: Routes = [
  { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('src/app/home/home.module').then(m => m.HomePageModule),
        resolve: { hymns: HymnsDataResolver }
      },
      {
        path: 'search',
        loadChildren: () => import('src/app/search/search.module').then(m => m.SearchPageModule),
        resolve: { hymns: HymnsDataResolver }
      },
      {
        path: 'note',
        loadChildren: () =>
          import('../note/note.module').then(m => m.NotePageModule),
        resolve: { notes: IndexedDbResolver }
      },
      {
        path: 'favorite',
        loadChildren: () => import('src/app/favorite/favorite.module').then(m => m.FavoritePageModule),
        resolve: { data: FavoritePageResolver }
      },
      {
        path: 'bibleStudy',
        loadChildren: () => import('src/app/bible-study/bible-study.module').then(m => m.BibleStudyPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('src/app/account/account.module').then(m => m.AccountPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
