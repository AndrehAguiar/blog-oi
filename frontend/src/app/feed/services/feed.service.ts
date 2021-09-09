import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http'
import { Feed } from '../models/feed.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private BASE_URL = 'http://localhost:3000/feeds';

  constructor(private http: HttpClient) { 
    this.http = http;
  }

  getFeeds(){
    return this.http.get(this.BASE_URL)
  }
  
  createFeed(feed: Feed){
    return this.http.post(this.BASE_URL, feed);
  }
}
