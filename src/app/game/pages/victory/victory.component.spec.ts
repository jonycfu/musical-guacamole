import { saveScores } from './../../actions/game.actions';
import { of } from 'rxjs';
import { getFinalScore } from './../../reducers/game.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryComponent } from './victory.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState, IGameState } from '../../reducers/game.reducer';
import { MemoizedSelector, Store } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';

describe('VictoryComponent', () => {
  let component: VictoryComponent;
  let fixture: ComponentFixture<VictoryComponent>;
  let store: MockStore<IGameState>;
  let gameScoreSelector: MemoizedSelector<IGameState, number>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VictoryComponent],
      providers: [provideMockStore({ initialState: { game: initialState } })],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VictoryComponent);
    store = TestBed.get(Store);
    gameScoreSelector = store.overrideSelector(getFinalScore, 0);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the gameScore upon OnInit', done => {
    const spy = spyOn(store, 'select').and.returnValue(of(getFinalScore));
    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(getFinalScore);
    done();
  });

  it('should dispatch saveScores on submit of score form', done => {
    const datetime = new Date('1995-12-17T03:24:00');
    const expectedScoreData = { name: 'John Doe', score: 9999, datetime };
    component.datetime = datetime;
    component.gameScore = expectedScoreData.score;
    component.scoreForm.value.name = expectedScoreData.name;
    const spy = spyOn(store, 'dispatch');
    component.onSubmit();

    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(saveScores(expectedScoreData));
    done();
  });
});
