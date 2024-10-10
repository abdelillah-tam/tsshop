import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth/auth.service";
import { loggedInAction, LOGIN_ACTION } from "./actions";
import { catchError, exhaustMap, map } from "rxjs";

@Injectable()
export class UserEffects {

    login$;

    constructor(private actions: Actions, private authService: AuthService) {
        this.login$ = createEffect(() => actions.pipe(
            ofType(LOGIN_ACTION),
            exhaustMap((value: { email: string; password: string }) => {
                console.log(value);
                return this.authService.login(value.email, value.password)
                    .pipe(
                        // @ts-ignore
                        map(data => loggedInAction({email: data.email, objectId: data.objectId, userToken: data["user-token"], userType: data.type
                        }))
                    )
            })
        ))
    }
}
