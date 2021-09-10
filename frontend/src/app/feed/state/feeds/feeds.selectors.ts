import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFeatureState } from "../feedmap.reducer";

export const selectFeedsState = createFeatureSelector<IFeatureState>('feedModule');

export const selectFeedsEntity = createSelector(
    selectFeedsState,
    (feedsState: IFeatureState) =>  feedsState.feeds.entity,
);

export const selectFeedsLoading = createSelector(
    selectFeedsState,
    (feedsState: IFeatureState) => feedsState.feeds.loading,
);

export const selectFeedsError = createSelector(
    selectFeedsState,
    (feedsState: IFeatureState) => feedsState.feeds.error,
);

export const selectFeedState = createFeatureSelector<IFeatureState>('feedModule');