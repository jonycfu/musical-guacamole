import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromGame from './game.reducer';

export const gameFeatureKey = 'game';

export interface State {
  [fromGame.gameFeatureKey]: fromGame.IGameState;
}

export const reducers: ActionReducerMap<State> = {
  [fromGame.gameFeatureKey]: fromGame.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
