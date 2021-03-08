import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DisplayHymnRouteResolver } from './services/displayhymn-route-resolver';
import { ReadHymnsRouteResolver } from './services/read-biblestudy-route-resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'hymn/:id',
    loadChildren: () => import('./display-hymn/display-hymn.module').then(m => m.DisplayHymnPageModule),
    resolve: { data: DisplayHymnRouteResolver }
  },
  {
    path: 'crudnote',
    loadChildren: () => import('./crud-note/crud-note.module').then(m => m.CrudNotePageModule)
  },
  {
    path: 'crudnote/:id',
    loadChildren: () => import('./crud-note/crud-note.module').then(m => m.CrudNotePageModule)
  },
  {
    path: 'read-bible-study/:id',
    loadChildren: () => import('./read-bible-study/read-bible-study.module').then(m => m.ReadBibleStudyPageModule),
    resolve: { data: ReadHymnsRouteResolver }
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
