import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadComponent } from './keypad.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store, MemoizedSelector } from '@ngrx/store';

import {
  initialState,
  IGameState,
  getCharGuessedList,
} from '../../reducers/game.reducer';

describe('KeypadComponent', () => {
  let component: KeypadComponent;
  let fixture: ComponentFixture<KeypadComponent>;
  let store: MockStore<IGameState>;
  let charGuessedListSelector: MemoizedSelector<IGameState, string[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KeypadComponent],
      providers: [provideMockStore({ initialState: { game: initialState } })],
    }).compileComponents();

    fixture = TestBed.createComponent(KeypadComponent);
    store = TestBed.get(Store);
    charGuessedListSelector = store.overrideSelector(getCharGuessedList, []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
