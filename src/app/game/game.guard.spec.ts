import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { GameGuard } from './game.guard';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import {
  initialState,
  IGameState,
  getGameOverStatus,
  EndGameStatus,
} from './reducers/game.reducer';
import { MemoizedSelector, Store } from '@ngrx/store';
import { cold } from 'jasmine-marbles';

describe('GameGuard', () => {
  let router: Router;
  let guard: GameGuard;
  let store: MockStore<IGameState>;
  let gameOverStatusSelector: MemoizedSelector<IGameState, string>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameGuard,
        provideMockStore({ initialState: { game: initialState } }),
      ],
      imports: [RouterTestingModule],
    });

    store = TestBed.get(Store);
    guard = TestBed.get(GameGuard);
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
  });

  it('should exist', inject([GameGuard], (gameGuard: GameGuard) => {
    expect(gameGuard).toBeTruthy();
  }));

  it('should return false for INACTIVE game over statuses', () => {
    gameOverStatusSelector = store.overrideSelector(
      getGameOverStatus,
      EndGameStatus.INACTIVE
    );
    const expected = cold('(a|)', { a: false });

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return true for SUCCESS game over statuses', () => {
    gameOverStatusSelector = store.overrideSelector(
      getGameOverStatus,
      EndGameStatus.SUCCESS
    );
    const expected = cold('(a|)', { a: true });

    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should return true for FAILURE game over statuses', () => {
    gameOverStatusSelector = store.overrideSelector(
      getGameOverStatus,
      EndGameStatus.FAILURE
    );
    const expected = cold('(a|)', { a: true });

    expect(guard.canActivate()).toBeObservable(expected);
  });
});
