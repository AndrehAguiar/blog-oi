import { Action, createReducer, on } from "@ngrx/store";
import * as fromCardActions from "./card.actions";

export interface ICardState {
    entity: any;
    loading: boolean;
    error: boolean;
}

export const cardInitialState: ICardState = {
    entity: undefined,
    loading: false,
    error: false,
}

export const cardReducer = createReducer(
    cardInitialState,
    on(fromCardActions.clearCardState, () => cardInitialState),
    on(fromCardActions.loadFeedsByName, state => ({
        ...state,
        loading: true,
        error: false,
    })),
    on(fromCardActions.loadFeedsByNameSuccess, (state, { entity }) => ({
        ...state,
        entity,
        loading: false,
    })),
    on(fromCardActions.loadFeedsByNameFailed, state => ({
        ...state,
        loading: false,
        error: true,
    }))
);

export function fnCardReducer(state: ICardState, action: Action): ICardState {
    return cardReducer(state, action);

}