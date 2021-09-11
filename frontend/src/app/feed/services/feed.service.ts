import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Feed } from '../models/feed.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private BASE_URL = 'http://localhost:3000/feeds';

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getFeeds(): Observable<Feed[]> {
    return this.doGet<Feed[]>();
  }

  getFeedsByName(name: string): Observable<Feed[]> {
    const params = new HttpParams({
      fromObject: {

      }
    })
    return this.doGet<Feed[]>();
  }

  createFeed(feed: Feed): Observable<any> {
    return this.http.post(this.BASE_URL, feed);
  }

  private doGet<T>(params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}`, { params })
  }
}
