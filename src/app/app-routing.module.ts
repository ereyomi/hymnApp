import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DisplayHymnRouteResolver } from './services/displayhymn-route-resolver';

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
