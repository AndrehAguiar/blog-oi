import { Action, createReducer, on } from "@ngrx/store";
import { Feed } from "../../models/feed.model";
import * as fromFeedActions from "./feed.actions";

export interface IFeedState {
    entity: Feed;
    saving: boolean;
    error: boolean;
}

export const feedInitialState: IFeedState = {
    entity: new Feed(),
    saving: false,
    error: false,
}

export const feedReducer = createReducer(
    feedInitialState,
    on(fromFeedActions.clearFeedState, () => feedInitialState),
    on(fromFeedActions.createNewFeed, state => ({
        ...state,
        saving: true,
        error: false,
    })),
    on(fromFeedActions.createNewFeedSuccess, (state, {
        entity }) => ({
            ...state,
            entity,
            saving: false,
        })),
    on(fromFeedActions.createNewFeedFailed, state => ({
        ...state,
        saving: false,
        error: true,
    })),
);

export const fnFeedReducer = (state: IFeedState, action: Action): IFeedState => {
    return feedReducer(state, action);
}