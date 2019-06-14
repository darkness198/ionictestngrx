import { createAction, props } from "@ngrx/store";
import { User } from "../interfaces/user";

// export enum ActionTypes {
//   GetUsers = "[User Service] Get users",
// }

export const getUsers = createAction(
  "[User Service] Get users",
  props<{ sinceId: number }>()
);


export const finishedLoading = createAction(
  "[User Service] Finished Loading",
  props<{ users: User[], success: boolean }>()
);

export const getUserByName = createAction(
  "[User Service] Get user by name",
  props<{ username: string }>()
);

export const getUserSuccess = createAction(
  "[User Service] Successfully got user",
  props<{ user: User }>()
);

// export class GetUsers implements Action {
//   readonly type = ActionTypes.GetUsers;

//   constructor(public payload: { sinceId: number }) {}
// }


// export type ActionsUnion = GetUsers