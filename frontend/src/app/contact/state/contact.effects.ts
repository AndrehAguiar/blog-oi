import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap } from "rxjs/operators";
import { ContactService } from "../services/contact.service";
import * as fromContactActions from "./contact.actions";
import { IContactState } from "./contact.reducer";

@Injectable()
export class ContactEffects {

    sendContact$ = createEffect(() => this.actions$
        .pipe(ofType(fromContactActions.sendContact),
            mergeMap(({ event }: { event: Event }) => this.contactServices.sendContactEmail(event)),
            catchError((err: any, caught$) => {
                this.store.dispatch(fromContactActions.sendContactFailed());
                return caught$;
            }),
            map((result: any) => fromContactActions.sendContactSuccess({ result })),
        ),
    );

    constructor(private actions$: Actions,
        private store: Store<IContactState>,
        private contactServices: ContactService) {

    }
}