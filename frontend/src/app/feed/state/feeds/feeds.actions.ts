import { createAction, props } from "@ngrx/store";
import { Feed } from "../../models/feed.model";


export const loadFeedsList = createAction('[Feeds] Load Feed List');

export const loadFeedsListSuccess = createAction(
    '[Feeds] Load Feed List Success',
    props<{ entity: Array<Feed> }>(),
);

export const loadFeedsListFailed = createAction(
    '[Feeds] Load Feed List Failed'
);

export const clearFeedsState = createAction(
    '[Feeds] Clear Feed State'
);