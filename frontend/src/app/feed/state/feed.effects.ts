import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FeedService } from "../services/feed.service";
import * as fromFeedActions from "./feed.actions";
import { IFeedState } from "./feed.reducer";


@Injectable()
export class FeedEffects {

    loadListFeeds$ = createEffect(() => this.actions$
        .pipe(ofType(fromFeedActions.loadFeedList),
            mergeMap(() => this.feedService.getFeeds()),
            catchError((err:any, caught$) => {
                this.store.dispatch(fromFeedActions.loadFeedListFailed());
                return caught$;
            }),
            map((entity: any) => fromFeedActions.loadFeedListSuccess({ entity })),
        ),
    );

    constructor(private actions$: Actions,
        private store: Store<IFeedState>,
        private feedService: FeedService) {

    }
}