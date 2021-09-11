import { createAction, props } from "@ngrx/store";
import { Feed } from "../../models/feed.model";

export const loadFeedsByName = createAction(
    '[CARD] Load Feeds By Name',
    props<{ name: string }>(),
);

export const loadFeedsByNameSuccess = createAction(
    '[CARD] Load Feeds By Name',
    props<{ entity: Feed[] }>(),
);

export const loadFeedsByNameFailed = createAction(
    '[CARD] Load Feeds By Name Failed'
);

export const clearCardState = createAction('[CARD] Clear Card State');