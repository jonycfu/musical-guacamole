import { WordApiService } from './../../core/services/word-api.service';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { GameEffects } from './game.effects';

describe('GameEffects', () => {
  let actions$: Observable<any>;
  let effects: GameEffects;
  let wordApiService: WordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameEffects,
        {
          provide: WordApiService,
          useValue: { getSecretWord: () => {} },
        },
        provideMockActions(() => actions$),
      ],
    });

    wordApiService = TestBed.get(WordApiService);
    effects = TestBed.get<GameEffects>(GameEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fetch a secret word with getSecretWord', async(() => {
    actions$ = of({ type: '[Game Page] Get Secret Word' });
    spyOn(wordApiService, 'getSecretWord').and.returnValue(of(['3dhubs']));

    effects.getWordList$.subscribe(action => {
      expect(action).toEqual({
        type: '[Game page] Get Secret Word Success',
        word: '3dhubs',
      });
    });
  }));
});
