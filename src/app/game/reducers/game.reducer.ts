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

export interface IScore {
  name: string;
  score: number;
  datetime: Date;
}

export interface IGameState {
  error: { message: string; data: HttpErrorResponse } | null;
  maskedWordProgression: string[] | null;
  secretWord: string | null;
  wordList: Array<string>;
  scoreList: Array<IScore>;
  gameScore: number;
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
  scoreList: [
    { name: 'Jordan Bell', score: 200, datetime: new Date() },
    { name: 'Jack Bell', score: 300, datetime: new Date() },
    { name: 'Jenny Bell', score: 130, datetime: new Date() },
  ],
  gameOverStatus: EndGameStatus.INACTIVE,
  gameScore: 0,
  wrongGuesses: 0,
  totalGuesses: 0,
  maxGuesses: 5,
};

/* Reducer projection helpers */
const pickRandomFrom = (list: Array<any> = [], length: number = list.length) =>
  list[Math.floor(Math.random() * length)];

const getMaskedFormOf = (word: string): string[] =>
  word.replace(/./g, '_').split('');

const getScoreBy = (totalGuesses: number, wordDifficulty: string) => {
  const wordLengthScore = wordDifficulty.length * 75;
  const guessScoreIndex = 10 - totalGuesses;
  return wordLengthScore + guessScoreIndex;
};

/* Reducer */
const gameReducer = createReducer(
  initialState,
  on(GameActions.loadWordsSuccess, (state, { payload }) => {
    const secretWord = pickRandomFrom(payload, payload.length);
    const maskedWord = getMaskedFormOf(secretWord);

    return {
      ...state,
      ...initialState,
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
        charInput: '',
        wrongGuesses,
        maskedWordProgression,
        gameOverStatus,
        charGuessedList: [...state.charGuessedList, charInput],
        totalGuesses: state.totalGuesses + 1,
      };
    }
  ),
  on(GameActions.restartGame, state => {
    // Uses local wordList to avoid extra HTTP call
    const secretWord = pickRandomFrom(state.wordList, state.wordList.length);
    const maskedWord = getMaskedFormOf(secretWord);
    return {
      ...initialState,
      wordList: state.wordList,
      secretWord,
      maskedWordProgression: maskedWord,
    };
  }),
  on(GameActions.calcFinalScore, (state, { totalGuesses, secretWord }) => {
    return {
      ...state,
      gameScore: getScoreBy(totalGuesses, secretWord),
    };
  }),
  on(GameActions.loadScoresSuccess, (state, { payload }) => {
    return {
      ...state,
      scoreList: [...payload, ...state.scoreList],
    };
  }),
  on(GameActions.loadScoresFailure, (state, { error, message }) => {
    return {
      ...state,
      error: { data: error, message },
    };
  }),
  on(GameActions.saveScores, (state, scoreEntry) => {
    return {
      ...state,
      scoreList: [...state.scoreList, scoreEntry],
    };
  })
);

// Syntax updated from switch-case syntax (<= 7.x)
export function reducer(state, action: Action): IGameState {
  return gameReducer(state, action);
}

/* Selectors */
export const getGameFeatureState = createFeatureSelector<IAppState>('game');

export const getSecretWord = createSelector(getGameFeatureState, state => {
  return state.game.secretWord;
});

export const getError = createSelector(getGameFeatureState, state => {
  return state.game.error;
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

export const getTotalGuesses = createSelector(getGameFeatureState, state => {
  return state.game.totalGuesses;
});

export const getGameOverStatus = createSelector(getGameFeatureState, state => {
  return state.game.gameOverStatus;
});

export const getFinalScore = createSelector(getGameFeatureState, state => {
  return state.game.gameScore;
});

export const getHighScores = createSelector(getGameFeatureState, state => {
  return state.game.scoreList;
});
