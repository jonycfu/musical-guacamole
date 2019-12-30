import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VictoryComponent } from './victory.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../reducers/game.reducer';

describe('VictoryComponent', () => {
  let component: VictoryComponent;
  let fixture: ComponentFixture<VictoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VictoryComponent],
      providers: [provideMockStore({ initialState: { game: initialState } })],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VictoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
