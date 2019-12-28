import { createAction, props } from '@ngrx/store';

export enum GameActionTypes {
  LoadWordApisSuccess = '[WordApi] Load Word Api Service Success',
  LoadWordApisFailure = '[WordApi] Load Word Api Service Failure',
  LoadWordApis = '[WordApi] Load Word Api Service',
  GetRandomWord = '[Game] Get Random Word',

  SetGuess = '[Game] Set Guess', //Sets the buffer for guess before submissions
  MakeGuess = '[Game] Make Guess',
  CheckGuess = '[Game] Check Guess',
  incrementTotalGuess = '[Game] Increment Total Guess',
  incrementCorrectGuess = '[Game] Increment Correct Guess',
  incrementWrongGuess = '[Game] Increment Wrong Guess',

  RestartGame = '[Game] Restart Game',
  GameOver = '[Game] Over',
}

//Single-unit of action related to the 'game' category
export const setGuess = createAction(
  GameActionTypes.SetGuess,
  props<{ charInput: string }>()
);

export const makeGuess = createAction(
  GameActionTypes.MakeGuess,
  props<{ guess: string }>()
);

export const incrementTotalGuess = createAction(
  GameActionTypes.incrementTotalGuess
);
export const incrementCorrectGuess = createAction(
  GameActionTypes.incrementCorrectGuess
);
export const incrementWrongGuess = createAction(
  GameActionTypes.incrementWrongGuess
);

export const gameOver = createAction(
  GameActionTypes.GameOver,
  props<{ gameOver }>()
);

export const restartGame = createAction(GameActionTypes.RestartGame);

export const loadWords = createAction(GameActionTypes.LoadWordApis);

export const loadWordsSuccess = createAction(
  GameActionTypes.LoadWordApisSuccess,
  props<{ payload: any }>()
);
