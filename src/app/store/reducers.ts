import { createReducer, on } from "@ngrx/store"
import { LOGGED_IN_ACTION, loggedInAction } from "./actions"

export const initialUserState = {
    email: '',
    objectId: '',
    userToken: '',
    type: ''
}

export const userReducer = createReducer(initialUserState,
    on(loggedInAction, (state, data) => {
        return {
            ...state,
            email: data.email,
            objectId: data.objectId,
            userToken: data.userToken,
            type: data.userType
        }
    })
)