import { VictoryComponent } from './pages/victory/victory.component';
import { DefeatComponent } from './pages/defeat/defeat.component';
import { PlayComponent } from './pages/play/play.component';
import { GameGuard } from './game.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      { path: 'play', component: PlayComponent },
      { path: 'defeat', canActivate: [GameGuard], component: DefeatComponent },
      {
        path: 'victory',
        canActivate: [GameGuard],
        component: VictoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
