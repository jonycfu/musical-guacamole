import {
  Action,
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as GameActions from './../actions/game.actions';

export const gameFeatureKey = 'game';

export interface IGameState {
  maskedWordProgression: string[] | null;
  secretWord: string | null;
  wordList: Array<string>;
  gameOver: boolean;
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
  gameOver: false,
  wrongGuesses: 0,
  correctGuesses: 0,
  totalGuesses: 0,
  maxGuesses: 5,
};

//Define state changes (via actions)
const gameReducer = createReducer(
  initialState,
  on(GameActions.loadWordsSuccess, (state, { payload }) => {
    const secretWord = payload[Math.floor(Math.random() * payload.length)];
    const maskedWord = secretWord.replace(/./g, '_').split('');

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
  on(GameActions.makeGuess, (state, {}) => ({
    ...state,
    guesses: state.totalGuesses + 1,
  })),
  on(GameActions.gameOver, state => ({ ...state, gameOver: true })),
  on(GameActions.resetGuesses, state => initialState)
);

//Updated from: switch-case syntax (<= 7.x)
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
