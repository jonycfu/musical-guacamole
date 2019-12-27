import { createAction, props } from '@ngrx/store';

export enum GameActionTypes {
  LoadWordApisSuccess = '[WordApi] Load Word Api Service Success',
  LoadWordApisFailure = '[WordApi] Load Word Api Service Failure',
  LoadWordApis = '[WordApi] Load Word Api Service',
  GetRandomWord = '[Game] Get Random Word',
  SetGuessLimit = '[Game] Set Guess Limit',
  MakeGuess = '[Game] Make Guess',
  ResetGuesses = '[Game] Reset Guesses',
  GameOver = '[Game] Over',
}

//Single-unit of action related to the 'game' category
export const makeGuess = createAction(GameActionTypes.MakeGuess);

export const gameOver = createAction(GameActionTypes.GameOver);

export const resetGuesses = createAction(GameActionTypes.ResetGuesses);

export const loadWords = createAction(GameActionTypes.LoadWordApis);

export const loadWordsSuccess = createAction(
  GameActionTypes.LoadWordApisSuccess,
  props<{ payload: string[] }>()
);
