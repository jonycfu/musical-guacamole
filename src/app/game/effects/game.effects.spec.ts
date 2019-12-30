import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { WordApiService } from './../../core/services/word-api.service';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { GameEffects } from './game.effects';

describe('GameEffects', () => {
  let actions$: Observable<any>;
  let effects: GameEffects;
  let wordApiService: WordApiService;
  const initialState = { game: {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameEffects,
        {
          provide: WordApiService,
          useValue: { getSecretWordList: () => {} },
        },
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
      ],
      imports: [RouterTestingModule],
    });

    wordApiService = TestBed.get(WordApiService);
    effects = TestBed.get<GameEffects>(GameEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fetch a secret word with getSecretWordList', async(() => {
    actions$ = of({ type: '[Game Page] Get Secret Word' });
    spyOn(wordApiService, 'getSecretWordList').and.returnValue(of(['3dhubs']));

    effects.getWordList$.subscribe(action => {
      expect(action).toEqual({
        type: '[Game page] Get Secret Word Success',
        word: '3dhubs',
      });
    });
  }));
});
