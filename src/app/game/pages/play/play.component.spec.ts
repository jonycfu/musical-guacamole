import { ActivatedRouteStub } from './../../../../testing/activated-route-stub';
import { initialState, IGameState } from './../../reducers/game.reducer';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Store, MemoizedSelector } from '@ngrx/store';

// describe('PlayComponent', () => {
//   let component: PlayComponent;
//   let fixture: ComponentFixture<PlayComponent>;
//   let store: MockStore<IGameState>;
//   let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub({
//     restart: true,
//   });
//   let secretWordSelector: MemoizedSelector<IGameState, string>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [PlayComponent],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//       providers: [
//         provideMockStore({ initialState: { game: initialState } }),
//         {
//           provide: ActivatedRoute,
//           useValue: activatedRoute,
//         },
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(PlayComponent);
//     component = fixture.componentInstance;
//     store = TestBed.get(Store);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
