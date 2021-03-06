import { HttpErrorResponse } from '@angular/common/http';
import { loadScores } from './../../actions/game.actions';
import {
  initialState,
  getHighScores,
  IScore,
  IGameState,
  getError,
} from './../../reducers/game.reducer';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardComponent } from './scoreboard.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;
  let store: MockStore<IGameState>;
  let scoresListSelector: MemoizedSelector<IGameState, IScore[]>;
  let scoresListErrorSelector: MemoizedSelector<IGameState, any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreboardComponent],
      providers: [provideMockStore({ initialState: { game: initialState } })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    scoresListSelector = store.overrideSelector(getHighScores, []);
    scoresListErrorSelector = store.overrideSelector(getError, {
      message: 'error msg',
      data: new HttpErrorResponse({}),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the load score list api call OnInit', done => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(loadScores());
    done();
  });
});
