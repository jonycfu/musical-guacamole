import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';

import { GameGuard } from './game.guard';
import { provideMockStore } from '@ngrx/store/testing';

describe('GameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameGuard, provideMockStore({})],
      imports: [RouterTestingModule],
    });
  });

  it('should ...', inject([GameGuard], (guard: GameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
