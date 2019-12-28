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

export enum EndGameStatus {
  INACTIVE = 'INACTIVE',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export interface IGameState {
  maskedWordProgression: string[] | null;
  secretWord: string | null;
  wordList: Array<string>;
  gameOver: EndGameStatus;
  charInput: string | null;
  totalGuesses: number;
  wrongGuesses: number;
  correctGuesses: number;
  maxGuesses: number;
}

export interface IAppState {
  game: IGameState;
}

export const initialState: IGameState = {
  maskedWordProgression: null,
  secretWord: null,
  charInput: null,
  wordList: [],
  gameOver: EndGameStatus.INACTIVE,
  wrongGuesses: 0,
  correctGuesses: 0,
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
  on(GameActions.setGuess, (state, { charInput }) => ({
    ...state,
    charInput,
  })),
  on(GameActions.makeGuess, (state, { guess }) => {
    return {
      ...state,
      totalGuesses: state.totalGuesses + 1,
    };
  }),
  on(GameActions.gameOver, (state, { gameOver }) => ({ ...state, gameOver })),
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

export const getRandomWord = createSelector(getGameFeatureState, state => {
  return state.game.secretWord;
});

export const getMaskedWord = createSelector(getGameFeatureState, state => {
  return state.game.maskedWordProgression;
});

export const getGuessChar = createSelector(getGameFeatureState, state => {
  return state.game.charInput;
});

export const getMaxGuesses = createSelector(getGameFeatureState, state => {
  return state.game.maxGuesses;
});

export const getWrongGuesses = createSelector(getGameFeatureState, state => {
  return state.game.wrongGuesses;
});
