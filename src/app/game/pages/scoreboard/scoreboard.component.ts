import { Observable, Subscription } from 'rxjs';
import { IScore, getError } from './../../reducers/game.reducer';
import { loadScores } from './../../actions/game.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IGameState, getHighScores } from '../../reducers/game.reducer';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit, OnDestroy {
  errorMessage$: Observable<any> = this.store.select(getError);
  scoreList: Array<IScore>;
  storeSub: Subscription;
  constructor(private store: Store<IGameState>) {}

  ngOnInit() {
    this.store.dispatch(loadScores());
    this.storeSub = this.store.select(getHighScores).subscribe(scoreList => {
      this.scoreList = scoreList.slice().sort((a, b) => b.score - a.score);
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
