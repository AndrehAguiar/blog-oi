import { Action, createReducer, on } from "@ngrx/store";
import { Feed } from "../models/feed.model";
import * as fromFeedActions from "./feed.actions";


export interface IFeedState {
    entity: Array<Feed>;
    loading: boolean;
    error: boolean;
}

export const feedInitialState: IFeedState = {
    entity: new Array<Feed>(),
    loading: false,
    error: false,
}

const reducer = createReducer(
    feedInitialState,
    on(fromFeedActions.clearFeedState, () => feedInitialState),
    on(fromFeedActions.loadFeedList, state => ({
        ...state,
        loading: true,
        error: false,
    })),
    on(fromFeedActions.loadFeedListSuccess, (state, {
        entity }) => ({
            ...state,
            entity,
            loading: false,
        })),
    on(fromFeedActions.loadFeedListFailed, state => ({
        ...state,
        loading: false,
        error: true,
    })),
);

export function feedReducer(state: IFeedState, action: Action): IFeedState {
    return reducer(state, action);
}