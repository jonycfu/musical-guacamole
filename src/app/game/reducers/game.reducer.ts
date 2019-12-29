import { HttpErrorResponse } from '@angular/common/http';
import {
  Action,
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as GameActions from './../actions/game.actions';

/* interfaces, statics */
export const gameFeatureKey = 'game';

export enum GuessResult {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG',
}
export enum EndGameStatus {
  INACTIVE = 'INACTIVE',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface IGameState {
  error: { message: string; data: HttpErrorResponse } | null;
  maskedWordProgression: string[] | null;
  secretWord: string | null;
  wordList: Array<string>;
  gameOverStatus: EndGameStatus;
  charInput: string | null;
  charGuessedList: Array<string>;
  totalGuesses: number;
  wrongGuesses: number;
  maxGuesses: number;
}

export interface IAppState {
  game: IGameState;
}

export const initialState: IGameState = {
  error: null,
  maskedWordProgression: null,
  secretWord: null,
  charInput: null,
  charGuessedList: [],
  wordList: [],
  gameOverStatus: EndGameStatus.INACTIVE,
  wrongGuesses: 0,
  totalGuesses: 0,
  maxGuesses: 5,
};

/* Reducer helpers */
const pickRandomFrom = (list: Array<any> = [], length: number = list.length) =>
  list[Math.floor(Math.random() * length)];

const getMaskedFormOf = (word: string): string[] =>
  word.replace(/./g, '_').split('');

/* Reducer */
const gameReducer = createReducer(
  initialState,
  on(GameActions.loadWordsSuccess, (state, { payload }) => {
    const secretWord = pickRandomFrom(payload, payload.length);
    const maskedWord = getMaskedFormOf(secretWord);

    return {
      ...state,
      wordList: payload,
      secretWord,
      maskedWordProgression: maskedWord,
    };
  }),
  on(GameActions.loadWordsFailure, (state, { error, message }) => {
    return {
      ...state,
      error: { data: error, message },
    };
  }),
  on(GameActions.setGuess, (state, { charInput }) => ({
    ...state,
    charInput,
  })),
  on(
    GameActions.makeGuess,
    (
      state,
      { charInput, maskedWordProgression, wrongGuesses, gameOverStatus }
    ) => {
      return {
        ...state,
        wrongGuesses,
        maskedWordProgression,
        gameOverStatus,
        charGuessedList: [...state.charGuessedList, charInput],
      };
    }
  ),
  on(GameActions.restartGame, state => {
    //Uses local wordList to avoid extra HTTP call
    const secretWord = pickRandomFrom(state.wordList, state.wordList.length);
    const maskedWord = getMaskedFormOf(secretWord);
    return {
      ...initialState,
      secretWord,
      maskedWordProgression: maskedWord,
    };
  })
);

//Syntax updated from switch-case syntax (<= 7.x)
export function reducer(state, action: Action): IGameState {
  return gameReducer(state, action);
}

/* Selectors */
export const getGameFeatureState = createFeatureSelector<IAppState>('game');

export const getSecretWord = createSelector(getGameFeatureState, state => {
  return state.game.secretWord;
});

export const getMaskedWord = createSelector(getGameFeatureState, state => {
  return state.game.maskedWordProgression;
});

export const getGuessChar = createSelector(getGameFeatureState, state => {
  return state.game.charInput;
});

export const getCharGuessedList = createSelector(getGameFeatureState, state => {
  return state.game.charGuessedList;
});

export const getMaxGuesses = createSelector(getGameFeatureState, state => {
  return state.game.maxGuesses;
});

export const getWrongGuesses = createSelector(getGameFeatureState, state => {
  return state.game.wrongGuesses;
});

export const getGameOverStatus = createSelector(getGameFeatureState, state => {
  return state.game.gameOverStatus;
});
