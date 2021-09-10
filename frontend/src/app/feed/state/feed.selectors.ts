import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFeedState } from "./feed.reducer";

export const selectFeedState = createFeatureSelector<IFeedState>('feed');

export const selectFeedEntity = createSelector(
    selectFeedState,
    (feedsState: IFeedState) =>  feedsState.entity,
);

export const selectFeedLoading = createSelector(
    selectFeedState,
    (feedsState: IFeedState) => feedsState.loading,
);

export const selectFeedError = createSelector(
    selectFeedState,
    (feedsState: IFeedState) => feedsState.loading,
);
