import { createAction, props } from "@ngrx/store";

export const loadFeedList = createAction('[Feed] Load Feed List');

export const loadFeedListSuccess = createAction(
    '[Feed] Load Feed List Success',
    props<{ entity: any }>(),
);

export const loadFeedListFailed = createAction('[Feed] Load Feed List Failed');

export const clearFeedState = createAction('[Feed] Clear Feed State');