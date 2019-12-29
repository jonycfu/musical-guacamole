import * as fromScore from './reducers/score.reducer';
import { loadScores } from './actions/score.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  scoreList$ = this.store.select(fromScore.getHighScores);
  constructor(private store: Store<fromScore.IScoreState>) {}

  ngOnInit() {
    this.store.dispatch(loadScores());
  }
}
