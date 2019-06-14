import 'rxjs';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, mergeMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { UserApiService } from '../user-api.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap(action =>
        this._userApiService.getUsers(action.sinceId).pipe(
          map(users => UserActions.finishedLoading({ users: users, success: true })),
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
  // getUsers$: Observable<Action> = this.actions$
  //     // Send the request when FETCH_RANDOM_DOG is dispatched
  //     .ofType("[User Service] Get users")
  //     // Send the request to the API
  //     .switchMap(() => {
  //         return this._dogApiService.findRandomDog()
  //             // Request succeeed, we dispatch fetchRandomDogSuccess action with the retrieved imgUrl
  //             .map(imgUrl => new fetchRandomDogSuccess(imgUrl))
  //             // Something went wrong with the request
  //             .catch(err => Observable.of(new fetchRandomDogError(err)))
  //     })
  constructor(
    private actions$: Actions,
    private _userApiService: UserApiService
  ) {}
}
