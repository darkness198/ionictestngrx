import * as fromUser from "../actions/user.actions";
import { User } from "../interfaces/user";
import { Action, createReducer, on } from '@ngrx/store';

export interface UserState {
  isLoading: boolean,
  data: User[],
  lastUserSeen: number
}

export const initialState: UserState = {
  isLoading: false,
  data: [],
  lastUserSeen: 1
};


const userReducer = createReducer(
  initialState,
  on(fromUser.getUsers, state => ({...state, data: [...state.data], isLoading: true})),
  on(fromUser.finishedLoading, (state, { users }) => ({...state, data: [...state.data, ...users], isLoading: false}))
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

// export function reducer(
//   state = initialState,
//   action: fromUser.ActionsUnion
// ): UserState {
//   switch (action.type) {
//     case fromUser.ActionTypes.GetUsers: {
//       return {
//         ...state,
//         data: [...state.data]
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// }

export const getUsers = (state: UserState) => state.data;
export const getUserById = (state: UserState, props: { id: string }) =>
  state.data.find(user => user.id === props.id);
export const getLastId = (state: UserState) => state.lastUserSeen;
// export const getUserById = (state: UserState, props: { id: string }) =>
//   state.data.find(user => user.id === props.id);