import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'start-menu',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'start-menu',
  },
  {
    path: '**',
    redirectTo: 'start-menu',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
