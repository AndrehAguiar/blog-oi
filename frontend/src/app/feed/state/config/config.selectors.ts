import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFeatureState } from "../feedmap.reducer";

export const selectStateConfig = createFeatureSelector<IFeatureState>('feedModule');

export const selectFormConfig = createSelector(
    selectStateConfig,
    (configState: IFeatureState) => configState.config.showForm
);

export const selectSearchConfig = createSelector(
    selectStateConfig,
    (configState: IFeatureState) => configState.config.disableSearch
);

export const selectListByName = createSelector(
    selectStateConfig,
    (configState: IFeatureState) => configState.config.listIsByName
)
