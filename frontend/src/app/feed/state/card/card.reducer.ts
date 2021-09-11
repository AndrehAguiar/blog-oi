import { Action, createReducer, on } from "@ngrx/store";
import { Feed } from "../../models/feed.model";
import { IFeedsState } from "../feeds/feeds.reducer";
import * as fromCardActions from "./card.actions";

export interface ICardState {
    entity: Array<Feed>;
    loading: boolean;
    error: boolean;
}

export const cardInitialState: ICardState = {
    entity: new Array<Feed>(),
    loading: false,
    error: false,
}

export const cardReducer = createReducer(
    cardInitialState,
    on(fromCardActions.clearCardState, () =>
        cardInitialState),
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

export function fnCardReducer(state: ICardState | undefined, action: Action): IFeedsState {
    return cardReducer(state, action);

}