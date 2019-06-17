import 'rxjs';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, mergeMap, catchError, exhaustMap, tap, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { UserApiService } from '../user-api.service';
import * as UserActions from '../actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromUserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap(action =>
        this._userApiService.getUsers(action.sinceId).pipe(
          map(users => {
            const lastId = users[users.length - 1].id;
            return UserActions.finishedLoading({ users: users, success: true, lastId: lastId })
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });

  getRepos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getRepos),
      mergeMap(action =>
        this._userApiService.getUserByName(action.login).pipe(
          map(user => {
            console.log('in repo effect')
            return UserActions.attachRepos({ id: user.id, numRepos: user.public_repos })
          }),
          catchError(() => EMPTY)
        )
      )
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUserByName),
      mergeMap(action =>
        this._userApiService.getUserByName(action.username).pipe(
          map(user => UserActions.getUserSuccess({ user: user })),
          catchError(() => EMPTY)
        )
      )
    );
  });
  
  constructor(
    private actions$: Actions,
    private _userApiService: UserApiService,
    private _store: Store<AppState>
  ) {}
}
