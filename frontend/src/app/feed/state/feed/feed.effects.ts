import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FeedService } from "../../services/feed.service";
import { IFeedState } from "./feed.reducer";
import * as fromFeedActions from "./feed.actions";


@Injectable()
export class FeedEffects {

    createNewFeed$ = createEffect(() => this.actions$
        .pipe(ofType(fromFeedActions.createNewFeed),
            mergeMap((entity: any) => this.feedService.createFeed(entity)),
            catchError((err, caught$) => {
                this.store.dispatch(fromFeedActions.createNewFeedFailed());
                return caught$;
            }),
            map((entity: any) => fromFeedActions.createNewFeedSuccess({ entity })),
        )
    );

    constructor(private actions$: Actions,
        private store: Store<IFeedState>,
        private feedService: FeedService) {

    }
}