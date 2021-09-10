import { Action, createReducer, on } from "@ngrx/store";
import { Feed } from "../models/feed.model";
import * as fromFeedActions from "./feed.actions";

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

export interface IFeatureState {
    feeds: IFeedsState,
    feed: IFeedState
}

export interface State{
    feedModule: IFeatureState;
}

const feedsReducer = createReducer(
    feedsInitialState,
    on(fromFeedActions.clearFeedsState, () => feedsInitialState),
    on(fromFeedActions.loadFeedsList, state => ({
        ...state,
        loading: true,
        error: false,
    })),
    on(fromFeedActions.loadFeedsListSuccess, (state, {
        entity }) => ({
            ...state,
            entity,
            loading: false,
        })),
    on(fromFeedActions.loadFeedsListFailed, state => ({
        ...state,
        loading: false,
        error: true,
    })),

);

const feedReducer = createReducer(
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

export const fnFeedsReducer = (state: IFeedsState, action: Action): IFeedsState => {
    return feedsReducer(state, action);
}

export const fnFeedReducer = (state: IFeedState, action: Action): IFeedState => {
    return feedReducer(state, action);
}

export const reducerMap = {
    feeds:feedsReducer,
    feed:feedReducer
}