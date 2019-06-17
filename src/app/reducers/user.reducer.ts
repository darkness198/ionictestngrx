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
  lastUserSeen: 0,
  currentUser: {
    id: '',
    login: '',
    userAvatar: '',
    fullName: '',
    bio: '',
    company: '',
    location: '',
    webXBlog: '', 
    public_repos: ''
  }
};


const userReducer = createReducer(
  initialState,
  on(fromUser.getUsers, state => ({...state, data: [...state.data], isLoading: true})),
  on(fromUser.finishedLoading, (state, { users, lastId }) => ({...state, lastUserSeen: parseInt(lastId), data: [...state.data, ...users], isLoading: false})),
  on(fromUser.getUserByName, state => ({...state, isLoading: true})),
  on(fromUser.getUserSuccess, (state, { user }) => {
    user.login = user.login === 'null' ? ''  : user.login; 
    return ({...state, currentUser: user, isLoading: false})
  }),
  on(fromUser.getRepos, (state) => ({...state})),
  on(fromUser.attachRepos, (state, { id, numRepos }) => {
    state.data[id] ? state.data[String(parseInt(id) - 1)].public_repos = numRepos: null;
    return ({...state})
  }),
  on(fromUser.resetLoginSearch, (state) => ({...state, currentUser: {
    id: '',
    login: '',
    userAvatar: '',
    fullName: '',
    bio: '',
    company: '',
    location: '',
    webXBlog: '', 
    public_repos: ''
  }})),
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}


export const getUsers = (state: UserState) => state.data;
export const getUserById = (state: UserState, props: { id: string }) =>
  state.data.find(user => user.id === props.id);
export const getLastId = (state: UserState) => state.lastUserSeen;
export const getCurrentUser = (state: UserState) => state.currentUser;
