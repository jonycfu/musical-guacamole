import { endGame } from './../actions/game.actions';
import { Store } from '@ngrx/store';
import { WordApiService } from './../../core/services/word-api.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { GameActionTypes } from '../actions/game.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { calcFinalScore } from 'src/app/game/actions/game.actions';

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
              message:
                'Unable to get a new word list from api. Have you checked if the server/endpoint is down?',
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
                game: { totalGuesses, secretWord },
              },
            },
          ]) => {
            if (gameOverStatus === 'FAILURE') {
              return this.router.navigate(['/game/defeat']);
            } else if (gameOverStatus === 'SUCCESS') {
              this.store.dispatch(calcFinalScore({ totalGuesses, secretWord }));
              return this.router.navigate(['/game/victory']);
            }
          }
        )
      ),
    { dispatch: false }
  );
  getScoresList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActionTypes.LoadScores),
      mergeMap(() =>
        this.api.getHighScoresList().pipe(
          map((data: any) => ({
            type: GameActionTypes.LoadScoresSuccess,
            ...data,
          })),
          catchError(error => {
            return of({
              type: GameActionTypes.LoadScoresFailure,
              error,
              message: `Unable to get a new score list from api. Have you checked if the server/endpoint is down?`,
            });
          })
        )
      )
    )
  );

  saveScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActionTypes.SaveScores),
      mergeMap(({ name, score, datetime }) => {
        return this.api.updateScoreEntries({ name, score, datetime }).pipe(
          map((data: any) => ({
            type: GameActionTypes.SaveScoresSuccess,
            ...data,
          })),
          tap(() => this.router.navigate(['/game/scoreboard'])),
          catchError(error => {
            return of({
              type: GameActionTypes.SaveScoresFailure,
              error,
              message: `Unable to save a new score to api. Have you checked if the server/endpoint is down?`,
            });
          })
        );
      })
    )
  );
}
