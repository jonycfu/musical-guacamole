import { endGame } from './../actions/game.actions';
import { Store } from '@ngrx/store';
import { WordApiService } from './../../core/services/word-api.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { GameActionTypes } from '../actions/game.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { calcFinalScore } from 'src/app/score/actions/score.actions';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private api: WordApiService,
    private store: Store<any>,
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
        tap(({ gameOverStatus, startTime, endTime }) => {
          if (gameOverStatus !== 'INACTIVE') {
            this.store.dispatch(endGame({ gameOverStatus }));
          }
        })
      ),
    { dispatch: false }
  );

  endGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActionTypes.EndGame),
        withLatestFrom(this.store),
        tap(
          ([
            { gameOverStatus },
            {
              game: {
                game: { startTime, totalGuesses, secretWord },
              },
            },
          ]) => {
            if (gameOverStatus === 'FAILURE') {
              this.router.navigate(['/game/defeat']);
            } else if (gameOverStatus === 'SUCCESS') {
              console.log('calcFinalScore', {
                startTime,
              });

              this.store.dispatch(
                calcFinalScore({ startTime, totalGuesses, secretWord })
              );
              this.router.navigate(['/game/victory']);
            }
          }
        )
      ),
    { dispatch: false }
  );
}
