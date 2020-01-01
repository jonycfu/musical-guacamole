import { HANGMAN } from 'src/assets/hangman';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CanvasComponent } from './canvas.component';
import {
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
} from '@angular/core';
import { initialState } from '../../reducers/game.reducer';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent],
      providers: [provideMockStore({ initialState: { game: initialState } })],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hangman and gallows draw data ready on init', done => {
    const headDrawData = HANGMAN.head;
    const gallowsDrawData = HANGMAN.gallows[0];
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.hangmanArray).toContain(headDrawData);
      expect(component.gallowsArray).toContain(gallowsDrawData);
      done();
    });
  });

  it('should draw hangman based on changes to wrong guesses made', done => {
    const spy = spyOn(component, 'drawHangmanParts');

    component.ngOnChanges({ wrongGuesses: new SimpleChange(null, 0, true) });
    component.ngOnChanges({ wrongGuesses: new SimpleChange(1, 2, false) });
    component.ngOnChanges({ wrongGuesses: new SimpleChange(2, 3, false) });
    component.ngOnChanges({ wrongGuesses: new SimpleChange(3, 4, false) });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(3);
    done();
  });
});
