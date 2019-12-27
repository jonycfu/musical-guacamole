import { GameActionTypes } from './actions/game.actions';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getWordList } from './reducers/game.reducer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  wordList$: Observable<string[]> = this.store.select(getWordList);
  randomWord: string | null;
  wordList: string[];
  constructor(
    private store: Store<{ wordList: Array<string>; secretWord: string }>
  ) {}

  ngOnInit() {
    //Outgoing Effects dispatch for HTTP Request via service
    this.store.dispatch({ type: GameActionTypes.LoadWordApis });
    // this.store.pipe(select(getWordList)).subscribe(wordList => {
    //   console.log(wordList);

    //   // this.wordList = wordList;
    // });
  }
}
