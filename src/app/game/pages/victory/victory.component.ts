import { saveScores } from './../../actions/game.actions';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import * as fromGame from './../../reducers/game.reducer';

@Component({
  selector: 'app-victory',
  templateUrl: './victory.component.html',
  styleUrls: ['./victory.component.scss'],
})
export class VictoryComponent implements OnInit, OnDestroy {
  scoreForm = new FormGroup({
    name: new FormControl(''),
  });
  gameScore: number = null;
  storeSub: Subscription;
  constructor(private store: Store<fromGame.IGameState>) {}

  ngOnInit() {
    this.storeSub = this.store
      .select(fromGame.getFinalScore)
      .subscribe(gameScore => {
        this.gameScore = gameScore;
      });
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
  onSubmit() {
    this.store.dispatch(
      saveScores({
        ...this.scoreForm.value,
        score: this.gameScore,
        datetime: new Date(),
      })
    );
  }
}
