import { loadWords, restartGame, makeGuess } from './actions/game.actions';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromGame from './reducers/game.reducer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  randomWord$: Observable<string> = this.store.select(fromGame.getRandomWord);
  maskedWord$: Observable<string[]> = this.store.select(fromGame.getMaskedWord);
  charInput$: Observable<string> = this.store.select(fromGame.getGuessChar);
  maxGuesses$: Observable<number> = this.store.select(fromGame.getMaxGuesses);
  wrongGuesses$: Observable<number> = this.store.select(
    fromGame.getWrongGuesses
  );
  guess: string = '_';

  constructor(private store: Store<fromGame.IGameState>) {}

  ngOnInit() {
    this.store.dispatch(loadWords());
    //Use subscribe for method access to guess prop
    //TODO: Unsubscribe
    this.store
      .pipe(select(fromGame.getGuessChar))
      .subscribe(guessedChar => (this.guess = guessedChar));
  }
  makeGuess(guess) {
    this.store.dispatch(makeGuess({ guess }));
  }
  restartGame() {
    //TODO: Confirm Dialog, needed!
    this.store.dispatch(restartGame());
  }
}
