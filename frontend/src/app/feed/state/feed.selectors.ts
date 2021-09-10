import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFeatureState, IFeedsState, IFeedState } from "./feed.reducer";

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

export const selectFeedEntity = createSelector(
    selectFeedState,
    (feedState: IFeatureState) => feedState.feed.entity,
);

export const selectFeedSaving = createSelector(
    selectFeedState,
    (feedState: IFeatureState) => feedState.feed.saving,
)

export const selectFeedError = createSelector(
    selectFeedState,
    (feedState: IFeatureState) => feedState.feed.error,
)



