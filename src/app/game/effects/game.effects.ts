import { endGame } from './../actions/game.actions';
import { IAppState } from './../reducers/game.reducer';
import { Store } from '@ngrx/store';
import { WordApiService } from './../../core/services/word-api.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { GameActionTypes, loadWordsFailure } from '../actions/game.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private api: WordApiService,
    private store: Store<IAppState>,
    private router: Router
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

  makeGuess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActionTypes.MakeGuess),
        tap(({ gameOverStatus }) => {
          if (gameOverStatus !== 'INACTIVE') {
            this.store.dispatch(endGame({ gameOverStatus }));
          }
        })
      ),
    { dispatch: false }
  );

  endGameDefeat$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActionTypes.EndGame),
        tap(({ gameOverStatus }) => {
          if (gameOverStatus === 'FAILURE') {
            this.router.navigate(['/game/defeat']);
          } else if (gameOverStatus === 'SUCCESS') {
            this.router.navigate(['/game/victory']);
          }
        })
      ),
    { dispatch: false }
  );
}
