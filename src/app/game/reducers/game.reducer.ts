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
  secretWord: string | null;
  wordList: Array<string>;
  gameOver: boolean;
  guesses: number;
  maxGuesses: number;
}

export interface IAppState {
  game: IGameState;
}

export const initialState: IGameState = {
  secretWord: null,
  wordList: [],
  gameOver: false,
  guesses: 0,
  maxGuesses: 5,
};

//Define state changes (via actions)
const gameReducer = createReducer(
  initialState,
  on(GameActions.makeGuess, state => ({
    ...state,
    guesses: state.guesses + 1,
  })),
  on(GameActions.gameOver, state => ({ ...state, gameOver: true })),
  on(GameActions.loadWords, state => ({ ...state })),
  on(GameActions.loadWordsSuccess, (state, { payload }) => {
    return {
      ...state,
      wordList: payload,
      secretWord: payload[Math.floor(Math.random() * payload.length)],
    };
  }),
  on(GameActions.resetGuesses, state => initialState)
);

//Updated from: switch-case syntax (<= 7.x)
export function reducer(state, action: Action): IGameState {
  return gameReducer(state, action);
}

/* Selectors */
const getGameFeatureState = createFeatureSelector<IAppState>('game');

export const getRandomWord = createSelector(getGameFeatureState, state => {
  return state.game.secretWord;
});
