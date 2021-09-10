import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Feed } from "../../models/feed.model";
import { FeedService } from "../../services/feed.service";
import { IFeedsState } from "./feeds.reducer";
import * as fromFeedsActions from "./feeds.actions"

@Injectable()
export class FeedsEffects {

    loadListFeeds$ = createEffect(() => this.actions$
        .pipe(ofType(fromFeedsActions.loadFeedsList),
            mergeMap(() => this.feedService.getFeeds()),
            catchError((err: any, caught$) => {
                this.store.dispatch(fromFeedsActions.loadFeedsListFailed());
                return caught$;
            }),
            map((entity: Feed[]) => fromFeedsActions.loadFeedsListSuccess({ entity })),
        ),
    );

    constructor(private actions$: Actions,
        private store: Store<IFeedsState>,
        private feedService: FeedService) {

    }
}