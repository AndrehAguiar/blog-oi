import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Feed } from "../../models/feed.model";
import { FeedService } from "../../services/feed.service";
import * as fromCardActions from "./card.actions"

@Injectable()
export class CardEffects {
    loadFeedsByName$ = createEffect(() => this.actions$
        .pipe(ofType(fromCardActions.loadFeedsByName),
            mergeMap(({ name }: { name: string }) => this.feedService.getFeedsByName(name)),
            catchError((err, caught$) => {
                this.store.dispatch(fromCardActions.loadFeedsByNameFailed());
                return caught$;
            }),
            map((entity: Feed[]) => fromCardActions.loadFeedsByNameSuccess({ entity })),
        )
    )

    constructor(private actions$: Actions,
        private store: Store,
        private feedService: FeedService) {

    }

}
