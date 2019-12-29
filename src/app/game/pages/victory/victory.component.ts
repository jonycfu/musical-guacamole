import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromGame from './../../reducers/game.reducer';
import { saveFinalScore } from 'src/app/score/actions/score.actions';

@Component({
  selector: 'app-victory',
  templateUrl: './victory.component.html',
  styleUrls: ['./victory.component.scss'],
})
export class VictoryComponent implements OnInit {
  scoreForm = new FormGroup({
    codename: new FormControl(''),
  });
  gameScore: number = null;
  constructor(private store: Store<fromGame.IGameState>) {}

  ngOnInit() {
    this.store.select(fromGame.getFinalScore).subscribe(gameScore => {
      this.gameScore = gameScore;
    });
  }
  onSubmit() {
    this.store.dispatch(saveFinalScore({ ...this.scoreForm.value }));
  }
}
