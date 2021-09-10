import { Action, createReducer, on } from "@ngrx/store";
import { Feed } from "../../models/feed.model";
import * as fromFeedsActions from "./feeds.actions";

export interface IFeedsState {
    entity: Array<Feed>;
    loading: boolean;
    error: boolean;
}

export const feedsInitialState: IFeedsState = {
    entity: new Array<Feed>(),
    loading: false,
    error: false,
}

export const feedsReducer = createReducer(
    feedsInitialState,
    on(fromFeedsActions.clearFeedsState, () => feedsInitialState),
    on(fromFeedsActions.loadFeedsList, state => ({
        ...state,
        loading: true,
        error: false,
    })),
    on(fromFeedsActions.loadFeedsListSuccess, (state, {
        entity }) => ({
            ...state,
            entity,
            loading: false,
        })),
    on(fromFeedsActions.loadFeedsListFailed, state => ({
        ...state,
        loading: false,
        error: true,
    })),

);

export const fnFeedsReducer = (state: IFeedsState, action: Action): IFeedsState => {
    return feedsReducer(state, action);
}