import { createAction, props } from "@ngrx/store";
import { Feed } from "../models/feed.model";

export const loadFeedsList = createAction('[Feeds] Load Feed List');

export const loadFeedsListSuccess = createAction(
    '[Feed] Load Feed List Success',
    props<{ entity: Feed[] }>(),
);

export const loadFeedsListFailed = createAction(
    '[Feeds] Load Feed List Failed'
);

export const clearFeedsState = createAction(
    '[Feeds] Clear Feed State'
);

export const createNewFeed = createAction(
    '[Feed] Create New Feed',
    props<{ entity: Feed }>(),
);

export const createNewFeedSuccess = createAction(
    '[Feed] Create New Feed Success',
    props<{ entity: Feed }>(),
);

export const createNewFeedFailed = createAction(
    '[Feed] Create New Feed Failed'
);

export const clearFeedState = createAction(
    '[Feed] Clear Feed State'
);