import { GameGuard } from './game.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    canActivateChild: [GameGuard],
    children: [
      {
        path: 'end',
        children: [{ path: 'game-over' }, { path: 'victory' }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
