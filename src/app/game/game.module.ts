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
import { KeypadComponent } from './components/keypad/keypad.component';
import { PlayComponent } from './pages/play/play.component';
import { VictoryComponent } from './pages/victory/victory.component';
import { DefeatComponent } from './pages/defeat/defeat.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GameComponent,
    CanvasComponent,
    KeypadComponent,
    PlayComponent,
    VictoryComponent,
    DefeatComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    GameRoutingModule,
    StoreModule.forFeature(fromGame.gameFeatureKey, fromGame.reducers, {
      metaReducers: fromGame.metaReducers,
    }),
    EffectsModule.forFeature([GameEffects]),
  ],
})
export class GameModule {}
