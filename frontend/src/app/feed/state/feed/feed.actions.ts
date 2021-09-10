import { createAction, props } from "@ngrx/store";
import { Feed } from "../../models/feed.model";

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