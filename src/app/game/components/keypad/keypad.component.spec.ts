import { setGuess } from './../../actions/game.actions';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypadComponent } from './keypad.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store, MemoizedSelector } from '@ngrx/store';

import {
  initialState,
  IGameState,
  getCharGuessedList,
} from '../../reducers/game.reducer';
import { By } from '@angular/platform-browser';

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
    charGuessedListSelector = store.overrideSelector(getCharGuessedList, [
      'A',
      'B',
      '1',
    ]);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set new letter guess when a key is selected', done => {
    const spy = spyOn(store, 'dispatch');
    const debugElButton = fixture.debugElement.query(
      By.css('button.keypad-btn:first-child')
    );
    const buttonText = debugElButton.nativeElement.textContent.trim();
    debugElButton.triggerEventHandler('click', buttonText);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(setGuess({ charInput: buttonText }));
    done();
  });
  it('should disable buttons that have already been guessed', done => {
    const debugElButtons = fixture.debugElement.queryAll(
      By.css('button.keypad-btn:disabled')
    );

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.disableKeyMap).toEqual({ A: true, B: true, 1: true });
    expect(debugElButtons.length).toBe(3);
    expect(debugElButtons[0].nativeElement.disabled).toBe(true);
    done();
  });
});
