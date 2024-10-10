import { createAction, props } from "@ngrx/store"

export const LOGIN_ACTION = '[Login Component] login';
export const LOGGED_IN_ACTION = '[Effect] logged in successfully';

export const loginAction = createAction(LOGIN_ACTION, props<{ email: string, password: string }>());

export const loggedInAction = createAction(
    LOGGED_IN_ACTION,
    props<{ email: string; objectId: string; userToken: string; userType: string }>()
);