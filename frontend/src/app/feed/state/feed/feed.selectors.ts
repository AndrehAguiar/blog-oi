import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFeatureState } from "../feedmap.reducer";

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



