import { getFinalScore } from './../../reducers/game.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryComponent } from './victory.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState, IGameState } from '../../reducers/game.reducer';
import { MemoizedSelector, Store } from '@ngrx/store';

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
});
