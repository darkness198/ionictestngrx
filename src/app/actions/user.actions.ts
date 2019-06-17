import { createAction, props } from "@ngrx/store";
import { User } from "../interfaces/user";


export const getUsers = createAction(
  "[User Service] Get users",
  props<{ sinceId: number }>()
);


export const finishedLoading = createAction(
  "[User Service] Finished Loading",
  props<{ users: User[], success: boolean, lastId: string }>()
);

export const getUserByName = createAction(
  "[User Service] Get user by name",
  props<{ username: string }>()
);

export const getUserSuccess = createAction(
  "[User Service] Successfully got user",
  props<{ user: User }>()
);

export const getRepos = createAction(
  "[User Service] Get repos for user with Id",
  props<{ login: string }>()
);

export const attachRepos = createAction(
  "[User Service] Attach repos for user with id",
  props<{ id: string, numRepos: number }>()
);

export const resetLoginSearch = createAction(
  "[User Service] Reset search name"
);
