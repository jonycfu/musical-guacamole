import { createAction, props } from '@ngrx/store';
import { EndGameStatus } from '../reducers/game.reducer';
import { HttpErrorResponse } from '@angular/common/http';

export enum GameActionTypes {
  LoadWordApisSuccess = '[WordApi] Load Word Api Service Success',
  LoadWordApisFailure = '[WordApi] Load Word Api Service Failure',
  LoadWordApis = '[WordApi] Load Word Api Service',

  GetSecretWord = '[Game] Get Secret Word',

  SetGuess = '[Game] Set Guess', //Sets the buffer for guess before submissions
  MakeGuess = '[Game] Make Guess',

  RestartGame = '[Game] Restart Game',
  EndGame = '[Game] End Game',
}

//Gameplay related
export const setGuess = createAction(
  GameActionTypes.SetGuess,
  props<{ charInput: string }>()
);

export const makeGuess = createAction(
  GameActionTypes.MakeGuess,
  props<{
    charInput: string;
    maskedWordProgression: string[];
    wrongGuesses: number;
    gameOverStatus: EndGameStatus;
  }>()
);

export const restartGame = createAction(GameActionTypes.RestartGame);

//TODO: add `score` props for consumption
export const endGame = createAction(
  GameActionTypes.EndGame,
  props<{ gameOverStatus: EndGameStatus }>()
);

// Word Api related
export const loadWords = createAction(GameActionTypes.LoadWordApis);

export const loadWordsSuccess = createAction(
  GameActionTypes.LoadWordApisSuccess,
  props<{ payload: any }>()
);

export const loadWordsFailure = createAction(
  GameActionTypes.LoadWordApisFailure,
  props<{ error: HttpErrorResponse; message: string }>()
);
