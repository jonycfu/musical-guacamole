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
  maskedWordProgression: string[] | null;
  secretWord: string | null;
  wordList: Array<string>;
  gameOver: EndGameStatus;
  charInput: string | null;
  charGuessedList: Array<string>;
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
  charGuessedList: [],
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

//TODO: Refactor in favor of NgPipes
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
    /*
      Check if guess exists in the word.
      By determining if guessed letter is found in secretWord
      Revealing of recurring letters will be handled via NgPipe

      1. provided the guessResult from dispatcher context
      2a. If exists, update correctGuess
      2b. If not exist, update wrongGuesses
      3a. update totalGuesses
      3b. Check if gameOver is true
    */
    const secretWord = state.secretWord.toLowerCase();
    const guessLetter = guess.toLowerCase();

    const result = secretWord.includes(guessLetter)
      ? GuessResult.CORRECT
      : GuessResult.WRONG;

    return {
      ...state,
      guessResult: result,
      charGuessedList: [...state.charGuessedList, guess],
      correctGuesses:
        state.correctGuesses + (result === GuessResult.CORRECT ? 1 : 0),
      wrongGuesses: state.wrongGuesses + (result === GuessResult.WRONG ? 1 : 0),
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

export const getCharGuessedList = createSelector(getGameFeatureState, state => {
  return state.game.charGuessedList;
});

export const getMaxGuesses = createSelector(getGameFeatureState, state => {
  return state.game.maxGuesses;
});

export const getWrongGuesses = createSelector(getGameFeatureState, state => {
  return state.game.wrongGuesses;
});

//Composite selector
export const getPropsForGuessResult = createSelector(
  getRandomWord,
  getGuessChar,
  getCharGuessedList,
  (randomWord, guessChar, charGuessedList) => ({
    randomWord,
    guessChar,
    charGuessedList,
  })
);
