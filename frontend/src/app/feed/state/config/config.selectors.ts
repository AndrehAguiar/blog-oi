import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFeatureState } from "../feedmap.reducer";

export const selectStateConfig = createFeatureSelector<IFeatureState>('feedModule');

export const selectFeedConfig = createSelector(
    selectStateConfig,
    (configState: IFeatureState) => configState.config.showForm
);