import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  loadWords,
  restartGame,
  makeGuess,
} from './../../actions/game.actions';
import * as fromGame from './../../reducers/game.reducer';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  totalGuesses$: Observable<number> = this.store.select(
    fromGame.getTotalGuesses
  );
  charInput$: Observable<string> = this.store.select(fromGame.getGuessChar);
  charGuessedList$: Observable<string[]> = this.store.select(
    fromGame.getCharGuessedList
  );
  gameOverStatus$: Observable<fromGame.EndGameStatus> = this.store.select(
    fromGame.getGameOverStatus
  );
  charInput: string;
  secretWord: string;
  maxGuesses: number;
  wrongGuesses: number;
  maskedWordProgression: string[];

  constructor(private store: Store<fromGame.IGameState>) {}

  ngOnInit() {
    this.store.dispatch(loadWords());
    //Use subscribe for method access to guess prop
    //TODO: Unsubscribe
    this.store
      .pipe(select(fromGame.getGameFeatureState))
      .subscribe(
        ({
          game: {
            secretWord,
            charInput,
            maxGuesses,
            wrongGuesses,
            maskedWordProgression,
          },
        }) => {
          this.secretWord = secretWord;
          this.charInput = charInput;
          this.wrongGuesses = wrongGuesses;
          this.maxGuesses = maxGuesses;
          this.maskedWordProgression = maskedWordProgression;
        }
      );
  }
  makeGuess() {
    const guessResults = this.getCheckedGuessResults();
    const guessProps = { charInput: this.charInput, ...guessResults };

    this.store.dispatch(makeGuess(guessProps));
  }
  /*
    Check if guess exists in the word.
    By determining if guessed letter is found in secretWord
    TODO: Consider moving this into an @Effects, since alot of side-effects

    1. determines guessResult
    2a. If exists, reveal on maskedWordProgression
    2b. If not exist, increment wrongGuesses
    3. Check if gameOver is FAILURE/SUCCESS
  */
  getCheckedGuessResults() {
    const secretWord = this.secretWord.toLowerCase();
    const guessLetter = this.charInput.toLowerCase();
    const isGuessInSecretWord = secretWord.includes(guessLetter);

    const guessResult = isGuessInSecretWord
      ? fromGame.GuessResult.CORRECT
      : fromGame.GuessResult.WRONG;

    const nextMaskedWordProgression = isGuessInSecretWord
      ? this.maskedWordProgression.map((charItem, idx) =>
          secretWord[idx] === guessLetter ? guessLetter : charItem
        )
      : this.maskedWordProgression;

    const nextWrongGuesses =
      this.wrongGuesses + (guessResult === fromGame.GuessResult.WRONG ? 1 : 0);

    const nextGameOverStatus =
      nextWrongGuesses >= this.maxGuesses
        ? fromGame.EndGameStatus.FAILURE
        : !nextMaskedWordProgression.includes('_')
        ? fromGame.EndGameStatus.SUCCESS
        : fromGame.EndGameStatus.INACTIVE;

    return {
      maskedWordProgression: nextMaskedWordProgression,
      wrongGuesses: nextWrongGuesses,
      gameOverStatus: nextGameOverStatus,
    };
  }
  restartGame() {
    //TODO: Confirm Dialog, needed!
    this.store.dispatch(restartGame());
  }
}
