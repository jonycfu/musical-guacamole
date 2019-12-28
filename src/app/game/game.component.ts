import { GameActionTypes, loadWords } from './actions/game.actions';
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

  constructor(private store: Store<fromGame.IGameState>) {}

  ngOnInit() {
    this.store.dispatch(loadWords());
  }
}
