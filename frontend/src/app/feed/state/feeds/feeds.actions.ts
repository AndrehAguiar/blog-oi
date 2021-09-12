import { createAction, props } from "@ngrx/store";
import { Feed } from "../../models/feed.model";


export const loadFeedsList = createAction('[Feeds] Load Feed List');

export const loadFeedsListSuccess = createAction(
    '[FEEDS] Load Feed List Success',
    props<{ entity: Array<Feed> }>(),
);

export const loadFeedsListFailed = createAction(
    '[FEEDS] Load Feed List Failed'
);

export const setSlicedFeedsList = createAction(
    '[FEEDS] Slice List Feed',
    props<{ isFiltered: boolean }>(),
);

export const clearFeedsState = createAction(
    '[FEEDS] Clear Feed State'
);