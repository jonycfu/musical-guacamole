import { initialState } from './reducers/game.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { GameGuard } from './game.guard';
import { provideMockStore } from '@ngrx/store/testing';

describe('GameGuard', () => {
  beforeEach(() => {
    const initialState = {
      gameScore: 0,
    };
    TestBed.configureTestingModule({
      providers: [GameGuard, provideMockStore({ initialState })],
      imports: [RouterTestingModule],
    });
  });

  it('should ...', inject([GameGuard], (guard: GameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
