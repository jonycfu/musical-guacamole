import { WordApiService } from './../../core/services/word-api.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GameActionTypes } from '../actions/game.actions';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions, private api: WordApiService) {}

  getWordList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActionTypes.LoadWordApis),
      mergeMap(() =>
        this.api.getSecretWordList().pipe(
          map((data: any) => ({
            type: GameActionTypes.LoadWordApisSuccess,
            ...data,
          })),
          catchError(err => ({
            type: GameActionTypes.LoadWordApisFailure,
            ...err,
          }))
        )
      )
    )
  );

  /*
    1. Checks if secretWord contains guess char
    2a. If exists, update correctGuess
    2a. If exists, update maskedWordProgression
    2b. If not exist, update wrongGuesses
    3a. update totalGuesses
    3b. Check if gameOver is true
  */
  processGuess$ = createEffect(() =>
    this.actions$.pipe(ofType(GameActionTypes.MakeGuess), mergeMap)
  );
}
