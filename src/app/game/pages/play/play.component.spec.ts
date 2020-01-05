import { loadWords } from './../../actions/game.actions';
import { ActivatedRouteStub } from './../../../../testing/activated-route-stub';
import {
  initialState,
  IGameState,
  getSecretWord,
  getGameFeatureState,
  EndGameStatus,
} from './../../reducers/game.reducer';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Store, MemoizedSelector } from '@ngrx/store';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;
  let store: MockStore<IGameState>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub({
    restart: true,
  });
  // let totalGuessesSelector: MemoizedSelector<IGameState, string>;
  let secretWordSelector: MemoizedSelector<IGameState, string>;
  let gameFeatureSelector: MemoizedSelector<IGameState, any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({ initialState: { game: initialState } }),
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    secretWordSelector = store.overrideSelector(getSecretWord, '3dhubs');
    gameFeatureSelector = store.overrideSelector(getGameFeatureState, {
      game: initialState,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the load word list api call OnInit', done => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(loadWords());
    done();
  });

  describe('getCheckedGuessResults', () => {
    it('should return incremented next wrong guesses when incorrect guess is made', () => {
      component.secretWord = '3dhubs';
      component.maskedWordProgression = ['_', '_', '_', '_', '_'];
      component.charInput = 'z';
      component.wrongGuesses = 3;
      const expected = 4;
      const { wrongGuesses } = component.getCheckedGuessResults();
      expect(wrongGuesses).toEqual(expected);
    });

    it('should return the upcoming progression when a correct guess is made', () => {
      component.secretWord = 'hoarder';
      component.maskedWordProgression = ['_', '_', '_', '_', '_', '_', '_'];
      component.charInput = 'r';
      component.wrongGuesses = 0;
      const expected = ['_', '_', '_', 'r', '_', '_', 'r'];
      const { maskedWordProgression } = component.getCheckedGuessResults();
      expect(maskedWordProgression).toEqual(expected);
    });

    it('should return the proper FAILURE status, when guesses reach max limit', () => {
      component.secretWord = 'hoarder';
      component.maskedWordProgression = ['_', '_', '_', '_', '_', '_', '_'];
      component.charInput = 'z';
      component.wrongGuesses = 4;
      component.maxGuesses = 5;
      const expected = EndGameStatus.FAILURE;
      const { gameOverStatus } = component.getCheckedGuessResults();
      expect(gameOverStatus).toEqual(expected);
    });

    it('should return the proper SUCCESS status, when guesses reach max limit', () => {
      component.secretWord = 'hoarder';
      component.maskedWordProgression = ['h', 'o', 'a', 'r', '_', 'e', 'r'];
      component.charInput = 'd';
      component.wrongGuesses = 4;
      component.maxGuesses = 5;
      const expected = EndGameStatus.SUCCESS;
      const { gameOverStatus } = component.getCheckedGuessResults();
      expect(gameOverStatus).toEqual(expected);
    });
  });
});
