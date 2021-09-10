import { IConfigState, configReducer } from "./config/config.reducer";
import { feedReducer, IFeedState } from "./feed/feed.reducer";
import { feedsReducer, IFeedsState } from "./feeds/feeds.reducer";


export interface IFeatureState {
    feeds: IFeedsState,
    feed: IFeedState,
    config: IConfigState,
}

export interface State{
    feedModule: IFeatureState;
}

export const reducerMap = {
    feeds:feedsReducer,
    feed:feedReducer,
    config: configReducer
}