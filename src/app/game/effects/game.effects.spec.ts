import {
  loadWordsSuccess,
  loadWords,
  loadWordsFailure,
  GameActionTypes,
  makeGuess,
  endGame,
} from './../actions/game.actions';
import { initialState, EndGameStatus } from './../reducers/game.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { WordApiService } from './../../core/services/word-api.service';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject } from 'rxjs';

import { GameEffects } from './game.effects';
import { cold, hot } from 'jasmine-marbles';

// Http testing module and mocking controller
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

// Other imports
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

describe('GameEffects', () => {
  let actions$: Observable<any>;
  let effects: GameEffects;
  let wordApiService: jasmine.SpyObj<WordApiService>;
  let routerService: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameEffects,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy() },
        },
        {
          provide: WordApiService,
          useValue: { getSecretWordList: jasmine.createSpy() },
        },
        provideMockStore({ initialState: { game: initialState } }),
        provideMockActions(() => actions$),
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    });

    routerService = TestBed.get(Router);
    wordApiService = TestBed.get(WordApiService);
    effects = TestBed.get<GameEffects>(GameEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadWordApis', () => {
    it('should fetch a secret word with getSecretWordList', () => {
      const action = loadWords;
      const payload = { payload: ['3dhubs'] };
      const outcome = loadWordsSuccess(payload);

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: payload });
      wordApiService.getSecretWordList.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.getWordList$).toBeObservable(expected);
    });
  });

  // TODO: Consider converting redirects into their own contained actions
  // describe('endGame', () => {
  //   it('should redirect once the game over status is no longer INACTIVE', done => {
  //     const actionProps = { gameOverStatus: EndGameStatus.SUCCESS };
  //     const action = endGame(actionProps);

  //     actions$ = of(action);

  //     effects.endGame$.subscribe(() => {
  //       expect(routerService.navigate).toHaveBeenCalledWith(['/game/victory']);
  //       done();
  //     });
  //   });
  // });
});
