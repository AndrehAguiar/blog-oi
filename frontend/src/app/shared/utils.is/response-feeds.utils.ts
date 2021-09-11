import { Feed } from "src/app/feed/models/feed.model";

export function responseToFeeds(response:any):Feed {
    return {
        id: response.id,
        name: response.name,
        message: response.message
    }
}