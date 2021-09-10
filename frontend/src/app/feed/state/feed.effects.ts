import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Feed } from "../models/feed.model";
import { FeedService } from "../services/feed.service";
import * as fromFeedActions from "./feed.actions";
import { IFeedsState } from "./feed.reducer";


@Injectable()
export class FeedEffects {

    loadListFeeds$ = createEffect(() => this.actions$
        .pipe(ofType(fromFeedActions.loadFeedsList),
            mergeMap(() => this.feedService.getFeeds()),
            catchError((err: any, caught$) => {
                this.store.dispatch(fromFeedActions.loadFeedsListFailed());
                return caught$;
            }),
            map((entity: Feed[]) => fromFeedActions.loadFeedsListSuccess({ entity })),
        ),
    );

    createNewFeed$ = createEffect(() => this.actions$
        .pipe(ofType(fromFeedActions.createNewFeed),
            mergeMap(( entity : any ) => this.feedService.createFeed(entity)),
            catchError((err, caught$) => {
                this.store.dispatch(fromFeedActions.createNewFeedFailed());
                return caught$;
            }),
            map((entity: any) => fromFeedActions.createNewFeedSuccess({ entity })),
        )
    );

    constructor(private actions$: Actions,
        private store: Store<IFeedsState>,
        private feedService: FeedService) {

    }
}