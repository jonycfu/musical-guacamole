import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  IGameState,
  getGameOverStatus,
  EndGameStatus,
} from './reducers/game.reducer';
import { map, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameGuard implements CanActivateChild {
  constructor(private store: Store<IGameState>, private router: Router) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.getEndGameStatus();
  }
  getEndGameStatus(): Observable<boolean> {
    return this.store.pipe(
      select(getGameOverStatus),
      map(status => {
        if (status === 'SUCCESS') {
          return true;
        } else if (status === 'FAILURE') {
          return true;
        } else {
          this.router.navigateByUrl('/start-menu');
          return false;
        }
      }),
      take(1)
    );
  }
}
