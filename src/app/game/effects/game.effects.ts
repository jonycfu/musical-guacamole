import { IAppState } from './../reducers/game.reducer';
import { Store } from '@ngrx/store';
import { WordApiService } from './../../core/services/word-api.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GameActionTypes, loadWordsFailure } from '../actions/game.actions';
import { of } from 'rxjs';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private api: WordApiService,
    private store: Store<IAppState>
  ) {}

  getWordList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActionTypes.LoadWordApis),
      mergeMap(() =>
        this.api.getSecretWordList().pipe(
          map((data: any) => ({
            type: GameActionTypes.LoadWordApisSuccess,
            ...data,
          })),
          catchError(error => {
            return of({
              type: GameActionTypes.LoadWordApisFailure,
              error,
              message: `Unable to get a new word list from api. 
                Have you checked if the server/endpoint is down?`,
            });
          })
        )
      )
    )
  );
}
