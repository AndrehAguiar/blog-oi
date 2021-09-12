import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IContactState } from "./contact.reducer";

export const selectContactState = createFeatureSelector<IContactState>('contact');

export const selectContactSending = createSelector(
    selectContactState,
    (contactState: IContactState) => contactState.result,
);

export const selectContactSuccess = createSelector(
    selectContactState,
    (contactState: IContactState) => contactState.sending,
);

export const selectContactError = createSelector(
    selectContactState,
    (contactState: IContactState) => contactState.error,
);
