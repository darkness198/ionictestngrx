import * as fromUser from "../actions/user.actions";
import { User } from "../interfaces/user";
import { Action, createReducer, on } from '@ngrx/store';

export interface UserState {
  isLoading: boolean,
  data: User[],
  lastUserSeen: number,
  currentUser: User
}

export const initialState: UserState = {
  isLoading: false,
  data: [],
  lastUserSeen: 1,
  currentUser: {
    id: '',
    userAvatar: '',
    fullName: '',
    bio: '',
    company: '',
    location: '',
    webXBlog: ''
  }
};


const NUM_RESULTS = 44;


const userReducer = createReducer(
  initialState,
  on(fromUser.getUsers, state => ({...state, data: [...state.data], isLoading: true})),
  on(fromUser.finishedLoading, (state, { users }) => ({...state, lastUserSeen: state.lastUserSeen + NUM_RESULTS, data: [...state.data, ...users], isLoading: false})),
  on(fromUser.getUserByName, state => ({...state, data: [...state.data], isLoading: true})),
  on(fromUser.getUserSuccess, (state, { user }) => ({...state, currentUser: user, isLoading: false})),
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}


export const getUsers = (state: UserState) => state.data;
export const getUserById = (state: UserState, props: { id: string }) =>
  state.data.find(user => user.id === props.id);
export const getLastId = (state: UserState) => state.lastUserSeen;
export const getCurrentUser = (state: UserState) => state.currentUser;
