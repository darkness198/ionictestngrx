import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromUsers from '../reducers/user.reducer';

export interface AppState {
  users: fromUsers.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: fromUsers.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const getUserState = (state: AppState) => state.users;

export const getUsers = createSelector(
  getUserState,
  fromUsers.getUsers
);

export const getUserById = createSelector(
  getUserState,
  fromUsers.getUserById
);

export const getLastId = createSelector(
  getUserState,
  fromUsers.getLastId
);


export const getCurrentUser = createSelector(
  getUserState,
  fromUsers.getCurrentUser
);


// export const getNoteById = createSelector(
//   getNoteState,
//   fromNote.getNoteById
// );