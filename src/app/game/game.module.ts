import { CanvasComponent } from './components/canvas/canvas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { StoreModule } from '@ngrx/store';
import * as fromGame from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './effects/game.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [GameComponent, CanvasComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GameRoutingModule,
    StoreModule.forFeature(fromGame.gameFeatureKey, fromGame.reducers, {
      metaReducers: fromGame.metaReducers,
    }),
    EffectsModule.forFeature([GameEffects]),
  ],
})
export class GameModule {}
