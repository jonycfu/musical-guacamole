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
  CalcFinalScore = '[Game] Calc Final Score',

  LoadScores = '[Game] Load Scores',
  LoadScoresSuccess = '[Game] Load Scores Success',
  LoadScoresFailure = '[Game] Load Scores Failure',

  SaveScores = '[Game] Save Scores',
  SaveScoresSuccess = '[Game] Save Scores Success',
  SaveScoresFailure = '[Game] Save Scores Failure',
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

export const calcFinalScore = createAction(
  GameActionTypes.CalcFinalScore,
  props<{ totalGuesses: number; secretWord: string }>()
);

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

export const loadScores = createAction(GameActionTypes.LoadScores);
export const loadScoresSuccess = createAction(
  GameActionTypes.LoadScoresSuccess,
  props<{ payload: any }>()
);
export const loadScoresFailure = createAction(
  GameActionTypes.LoadScoresFailure,
  props<{ error: HttpErrorResponse; message: string }>()
);

export const saveScores = createAction(
  GameActionTypes.SaveScores,
  props<{ name: string; score: number; datetime: Date }>()
);
