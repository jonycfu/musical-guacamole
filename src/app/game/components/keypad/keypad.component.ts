import { GameActionTypes, setGuess } from './../../actions/game.actions';
import * as fromGame from './../../reducers/game.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { ALPHABETS, NUMERALS } from 'src/assets/hangman';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss'],
})
export class KeypadComponent implements OnInit {
  @Input() enableNumbers: boolean = true;
  @Input() enableAlphabet: boolean = true;

  keyInputListTop: string[] = NUMERALS;
  keyInputListBottom: string[] = ALPHABETS;

  constructor(private store: Store<fromGame.IGameState>) {}

  ngOnInit() {}

  setGuessAs(charInput: string) {
    this.store.dispatch(setGuess({ charInput }));
  }
}
