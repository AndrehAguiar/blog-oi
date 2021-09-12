import { ICardState, cardReducer } from "./card/card.reducer";
import { IConfigState, configReducer } from "./config/config.reducer";
import { feedReducer, IFeedState } from "./feed/feed.reducer";
import { feedsReducer, IFeedsState } from "./feeds/feeds.reducer";


export interface IFeatureState {
    feeds: IFeedsState,
    feed: IFeedState,
    card: ICardState,
    config: IConfigState,
}

export const reducerMap = {
    feeds:feedsReducer,
    feed:feedReducer,
    card: cardReducer,
    config: configReducer
}