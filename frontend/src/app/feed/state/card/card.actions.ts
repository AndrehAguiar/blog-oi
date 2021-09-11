import { createAction, props } from "@ngrx/store";
import { Feed } from "../../models/feed.model";


export const loadCurrentFeedList = createAction(
    '[CARD] Load Current Feed List',
    props<{ query: string }>(),
)

export const loadFeedsByName = createAction(
    '[CARD] Load Feeds By Name',
    props<{ name: string }>(),
);

export const loadFeedsByNameSuccess = createAction(
    '[CARD] Load Feeds By Name Success',
    props<{ entity: Array<Feed> }>(),
);

export const loadFeedsByNameFailed = createAction(
    '[CARD] Load Feeds By Name Failed',
    props<{ entity: any }>(),
);

export const clearCardState = createAction('[CARD] Clear Card State');