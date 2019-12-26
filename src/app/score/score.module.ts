import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { ScoreComponent } from './score.component';
import { StoreModule } from '@ngrx/store';
import * as fromScore from './reducers';


@NgModule({
  declarations: [ScoreComponent],
  imports: [
    CommonModule,
    ScoreRoutingModule,
    StoreModule.forFeature(fromScore.scoreFeatureKey, fromScore.reducers, { metaReducers: fromScore.metaReducers })
  ]
})
export class ScoreModule { }
