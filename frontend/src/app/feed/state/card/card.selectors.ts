import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFeatureState } from "../feedmap.reducer";

export const selectCardState = createFeatureSelector<IFeatureState>('feedModule');

export const selectCardFeedsEntity = createSelector(
    selectCardState,
    (cardState: IFeatureState) => cardState.card.entity,
);

export const selectCardFeedsLoading = createSelector(
    selectCardState,
    (cardState: IFeatureState) => cardState.card.loading,
);

export const selectCardFeedsError = createSelector(
    selectCardState,
    (cardState: IFeatureState) => cardState.card.error,
);