import { GameActionTypes } from './actions/game.actions';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IGameState, IAppState, getRandomWord } from './reducers/game.reducer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  randomWord$: Observable<string> = this.store.select(getRandomWord);
  wordList: string[];
  constructor(private store: Store<{}>) {}

  ngOnInit() {
    this.store.dispatch({ type: GameActionTypes.LoadWordApis });
  }
}
